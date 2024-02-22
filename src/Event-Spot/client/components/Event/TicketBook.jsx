import React, { useEffect, useRef, useState,useMemo } from 'react';
import { Button, Card, Spinner, Modal, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startGetEvents } from '../../react-redux/action/eventAction';
import { startCreateBooking, startPayment ,setClearTicket, startCancelBooking} from "../../react-redux/action/bookingAction";
import { config } from '../Api_Resources/config';
import axios from '../Api_Resources/axios';
import { toast,ToastContainer } from 'react-toastify';

const updateRemainingTickets = (eventId, updatedTickets) => ({
  type: 'UPDATE_REMAINING_TICKETS',
  payload: { eventId, updatedTickets },
});

const TicketBook = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [tickets, setTickets] = useState([]);
  const card = "CARD"
  const [modalVisible, setModalVisible] = useState(false);

  const events = useSelector((state) => state.events);
  const bookedTicket = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const checkObject = Object.keys(bookedTicket).length;

  useEffect(() => {
    dispatch(setClearTicket())

    dispatch(startGetEvents())
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await events.find((ele) => ele._id === eventId);
        if (eventData) {
          setEventDetails(eventData);
          setTickets(Array(eventData.ticketType.length).fill(0));
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
  }, [events])

  useEffect(()=>{
    (async ()=>{
      try{
        const stripeId = localStorage.getItem("stripeId") 
        const response = await axios.delete(`/api/delete-payment/${stripeId}`,config)
        if(response) localStorage.removeItem("stripeId")


      }catch(err){
        console.log(err)
      }
    })()
  },[])


  const handlePayment =()=>{
    console.log("payment")
      dispatch(startPayment(bookedTicket._id,card))   
  }
  const handleCancelPayment = ()=>{
    if(bookedTicket) dispatch(startCancelBooking(bookedTicket._id))
    setModalVisible(false)
  }

  const updateTicketsAndRemaining = (index, updateCount) => {
    setTickets((prevTickets) => {
      const updatedTickets = [...prevTickets];
      updatedTickets[index] += updateCount;

      const updatedEventDetails = {
        ...eventDetails,
        ticketType: eventDetails.ticketType.map((ticket, i) => {
          if (i === index) {
            const remainingTickets = ticket.remainingTickets - updateCount;
            const updatedTicket = { ...ticket, remainingTickets, Quantity: ticket.ticketCount - remainingTickets };


            dispatch(updateRemainingTickets(eventId, [...eventDetails.ticketType.slice(0, i), updatedTicket, ...eventDetails.ticketType.slice(i + 1)]));

            return updatedTicket;
          }
          return ticket;
        }),
      };

      setEventDetails(updatedEventDetails)
      return updatedTickets;
    });
  };

  const incrementTicket = (index) => {
    updateTicketsAndRemaining(index, 1);
  };

  const decrementTicket = (index) => {
    if (tickets[index] > 0) {
      updateTicketsAndRemaining(index, -1);
    }
  };

  const calculateTotalAmount = useMemo(() => {
    console.log("in the cal")
    const totalAmount = tickets.reduce((total, count, index) => {
      const ticket = eventDetails.ticketType[index];
      return total + count * ticket.ticketPrice;
    }, 0);
    return totalAmount;
  },[tickets])

  const handleBookTicket = () => {
    if (!eventDetails) {
      console.error('Event details not available.');
      toast.error("Ticket is unavailable")
    }

    const bookedTickets = tickets
      .map((count, index) => ({ count, ticket: eventDetails.ticketType[index] }))
      .filter((ticket) => ticket.count > 0);

    const updatedEventTickets = eventDetails.ticketType.map((ticket, index) => {
      const bookedTicket = bookedTickets.find((booked) => booked.ticket._id === ticket._id);
      const bookedCount = bookedTicket ? bookedTicket.count : 0;
      const remainingCount = ticket.ticketCount - bookedCount;

      return { ...ticket, remainingTickets: remainingCount, Quantity: ticket.ticketCount - remainingCount,ticketPrice:ticket.ticketPrice   }; //
    });
    const filteredTickets = updatedEventTickets.filter((ticket) => ticket.Quantity > 0);


    dispatch(startCreateBooking(eventId, filteredTickets));
    setModalVisible(true); // Show modal after creating booking
  };

//   return (
//     <div style={{marginTop:"50px"}} >
//       <Container>
//       <h2 style={{textAlign:"center"}}>Ticket Booking</h2>
//       <div style={{display:"flex" ,justifyContent:"space-evenly",flexWrap: 'wrap'}}>
//       {eventDetails &&
//         eventDetails.ticketType.map((ticket, index) => (
//           <div style={{marginTop:"30px"}}>
//           <Card key={index} style={{ width: '18rem', margin: '10px' }}>
//             <Card.Body>
//               <Card.Title>{ticket.ticketName}</Card.Title>
//               <Card.Text>Price: ₹ {ticket.ticketPrice}</Card.Text>
//               <Card.Text>Remaining: {ticket.remainingTickets}</Card.Text>
//               <Card.Text>Quantity: {tickets[index]}</Card.Text>
//               <Button variant="primary" onClick={() => incrementTicket(index)}>
//                 Increment
//               </Button>{' '}
//               <Button variant="danger" onClick={() => decrementTicket(index)}>
//                 Decrement
//               </Button>
//             </Card.Body>
//           </Card>
//           </div>
//         ))}
      
//       </div>
//       <div style={{display:"flex" ,justifyContent:"space-evenly",flexWrap: 'wrap',border:"2px solid black",height:"70px",width:"50%px",marginLeft:"20%",borderRadius:"5px"}}>

//   <h2 style={{marginTop:"10px"}}>Total Amount: {totalPrice}</h2>
//       <Button variant='success' style={{width:"100px",height:"40px",marginTop:"10px"}} onClick={handleBookTicket} >
//     Book
//   </Button>
// </div>
//       <Modal show={modalVisible} >
//         <Modal.Header >
//           <Modal.Title>Seats are Confirmed</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {checkObject >= 0 && (
//             <Card>
//               <Card.Body>
//               <Card.Text><h3>{bookedTicket?.eventId?.Title}</h3></Card.Text>
//               <Card.Text>{bookedTicket?.eventId?.eventStartDateTime}</Card.Text>
//               <ol>
//                 {bookedTicket?.tickets?.map((ele) => (
//                   <li key={ele._id}>
//                    <Card.Text> TicketType : {ele.ticketType} </Card.Text><br />
//                    <Card.Text>Quantity : {ele.quantity}</Card.Text><br />
//                    <Card.Footer> Total Price : {ele.totalAmount}</Card.Footer>
//                   </li>
//                 ))}
//               </ol>
//               </Card.Body>
//             </Card>
//           )}
//         </Modal.Body>
//         <h2>Total Amount: {totalPrice}</h2>

//         <Modal.Footer>
//           <Button color="primary" onClick={handlePayment}>
//             Confirm Payment
//           </Button>{' '}
//           <Button color="secondary" onClick={handleCancelPayment}>
//             Cancel
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       </Container>

//     </div>
//   );
return (
  <div style={{ marginTop: "50px" }}>
    <Container>
      <h2 style={{ textAlign: "center" }}>Ticket Booking</h2>
      <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: 'wrap' }}>
        {eventDetails &&
          eventDetails.ticketType.map((ticket, index) => (
            <div style={{ marginTop: "30px" }} key={index}>
              <Card style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>{ticket.ticketName}</Card.Title>
                  <Card.Text>Price: ₹ {ticket.ticketPrice}</Card.Text>
                  <Card.Text>Remaining: {ticket.remainingTickets}</Card.Text>
                  <Card.Text>Quantity: {tickets[index]}</Card.Text>
                  {ticket.remainingTickets ? 
                  <div>
                    <Button variant="primary" onClick={() => incrementTicket(index)}>
                    Increment
                  </Button>  
                  <Button variant="danger" onClick={() => decrementTicket(index)}>
                    Decrement
                  </Button></div>:<span style={{color:'red'}}>Tickets are Sold</span>}
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: 'wrap', border: "2px solid black", borderRadius: "5px", padding: "10px", marginTop: "20px" }}>
        <h2 style={{ marginTop: "10px" }}>Total Amount: {calculateTotalAmount}</h2>
        <Button variant='success' style={{ width: "100px", height: "40px", marginTop: "10px" }} onClick={handleBookTicket}>
          Book
        </Button>
      </div>
      <Modal show={modalVisible} onHide={handleCancelPayment}>
        <Modal.Header closeButton>
          <Modal.Title>Seats are Confirmed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {checkObject >= 0 ? (
            <Card style={{width:"95%"}}>
              <Card.Body>
                <Card.Text><h3>{bookedTicket?.eventId?.Title}</h3></Card.Text>
                <Card.Text>{bookedTicket?.eventId?.eventStartDateTime}</Card.Text>
                <ul>
                  {bookedTicket?.tickets?.map((ele, index) => (
                    <li key={index}>
                      <Card.Text> TicketType : {ele.ticketType} </Card.Text>
                      <Card.Text> Quantity : {ele.quantity}</Card.Text>
                      <Card.Text> Total Price : {ele.totalAmount}</Card.Text>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          ):<img style={{width:"100%",height:"100%"}} src={`https://eventpot.s3.ap-south-1.amazonaws.com/Animation+-+ticeket.gif`}/>}
          <h2>Total Amount: {calculateTotalAmount }</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePayment}>
            Confirm Payment
          </Button>
          <Button variant="secondary" onClick={handleCancelPayment}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  </div>
);
};

export default TicketBook
