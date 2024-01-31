import React, { useEffect, useState } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startGetEvents } from '../../react-redux/action/eventAction';

// Action to update remaining ticket count in the Redux store
const updateRemainingTickets = (eventId, updatedTickets) => ({
  type: 'UPDATE_REMAINING_TICKETS',
  payload: { eventId, updatedTickets },
});

const TicketBook = () => {
  const { eventId } = useParams();
  // const eventId = "65b776b965522858ab0ee703"
  const [eventDetails, setEventDetails] = useState(null);
  const [tickets, setTickets] = useState([]);

  const events = useSelector((state) => state.events);
 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startGetEvents());
        const eventData =await events.find((ele) => ele._id === eventId);
        console.log(eventData,"i am ticket")
        if (eventData) {
          setEventDetails(eventData);
          setTickets(Array(eventData.ticketType.length).fill(0));
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle error, show a message to the user, or redirect to an error page.
      }
    };

    fetchData();
  }, [eventId])

  const updateTicketsAndRemaining = (index, updateCount) => {
    setTickets((prevTickets) => {
      const updatedTickets = [...prevTickets];
      updatedTickets[index] += updateCount;
  
      const updatedEventDetails = {
        ...eventDetails,
        ticketType: eventDetails.ticketType.map((ticket, i) => {
          if (i === index) {
            const remainingTickets = ticket.remainingTickets - updateCount;
            const updatedTicket = { ...ticket, remainingTickets,Quantity: ticket.ticketCount - remainingTickets };
            
            // Dispatch action to update remaining ticket count in the Redux store
            dispatch(updateRemainingTickets(eventId, [...eventDetails.ticketType.slice(0, i), updatedTicket, ...eventDetails.ticketType.slice(i + 1)]));
  
            console.log('Updated Ticket:', updatedTicket); // Log the updated ticket data
            
            return updatedTicket;
          }
          return ticket;
        }),
      };
  
      setEventDetails(updatedEventDetails);
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

  const handleBookTicket = () => {
    if (!eventDetails) {
      console.error('Event details not available.');
      return;
    }

    const bookedTickets = tickets
      .map((count, index) => ({ count, ticket: eventDetails.ticketType[index] }))
      .filter((ticket) => ticket.count > 0);

    // Update remainingTickets based on booked tickets
    const updatedEventTickets = eventDetails.ticketType.map((ticket, index) => {
      const bookedTicket = bookedTickets.find((booked) => booked.ticket._id === ticket._id);
      const bookedCount = bookedTicket ? bookedTicket.count : 0;
      const remainingCount = ticket.ticketCount - bookedCount;
      return { ...ticket, remainingTickets: remainingCount, Quantity: ticket.ticketCount - remainingCount };
    });

    console.log(updatedEventTickets);
  };
  if (!eventDetails) {
    return <div><Spinner/></div>;
  }

  return (
    <div>
      <h2>Ticket Booking</h2>
      {eventDetails &&
        eventDetails.ticketType.map((ticket, index) => (
          <Card key={index} style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
              <Card.Title>{ticket.ticketName}</Card.Title>
              <Card.Text>Price: ${ticket.ticketPrice}</Card.Text>
              <Card.Text>Remaining: {ticket.remainingTickets}</Card.Text>
              <Card.Text>Quantity: {tickets[index]}</Card.Text>
              <Button variant="primary" onClick={() => incrementTicket(index)}>
                Increment
              </Button>{' '}
              <Button variant="danger" onClick={() => decrementTicket(index)}>
                Decrement
              </Button>
            </Card.Body>
          </Card>
        ))}
      <Button onClick={handleBookTicket} style={{ display: 'flex', flexWrap: 'flex-end' }}>
        Book
      </Button>
    </div>
  );
};

export default TicketBook;
