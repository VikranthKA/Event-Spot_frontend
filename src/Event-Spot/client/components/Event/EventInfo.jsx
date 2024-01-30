import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CountDown from '../Utils/CountDown/CountDown';
import { useParams,useNavigate } from 'react-router-dom';
import { Container, Carousel, Spinner, Row, Col, Card, ListGroup, Badge, Button,Form, CardText } from 'react-bootstrap';
import axios from '../Api_Resources/axios';
import { useDispatch, useSelector } from 'react-redux';
import { startRaduisEvents } from '../../react-redux/action/eventAction';

function EventInfo() {
  const {eventId} = useParams()
  const dispatch = useDispatch()
  const events = useSelector((state)=>{
    return state.events
  })
  const [event,setEvent] = useState(null)
  useEffect(() => {
    const eventData= events.find(ele=>ele._id === eventId)
    setEvent(eventData)
  }, [eventId]);



  function readableDate(inputDateString) {
    const momentObject = moment(inputDateString);
    return momentObject.format('LLLL');
  }
  const navigate = useNavigate()
  
  const handleBookTickets = () => {
    navigate(`/event-booking/${eventId}`)
  };

  return (
    <Container className="my-5">
      {console.log(event)}
      {event ? (
        <Carousel style={{ height: "400px", width: "100%", margin: "auto" }}>
          {event.posters.map((poster) => (
            <Carousel.Item key={poster._id}>
              <img
                style={{ height: "400px", width: "100%", objectFit: "cover" }}
                className="d-block w-100"
                src={`http://localhost:3333/Uploads/images/${poster.image}`}
                alt={poster.ClipName || poster.BrochureName}
              />
              <Carousel.Caption>
                <h3>{poster.ClipName || poster.BrochureName}</h3>
                {/* Additional captions if needed */}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
          {event.youTube && (
            <Carousel.Item>
<iframe
            width="100%"
            height="500px"
            src={event.youTube.url}
            title="youTube-video-player"
            allowFullScreen
  ></iframe>              <Carousel.Caption>
                <h3>{event.youTube.title}</h3>
                {/* Additional captions if needed */}
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Row>
        <Col>
        
      <h2 className="my-3">{event?.title}</h2>
      <h5>{event?.category}</h5>
      <h5>Venue: {event?.venueName}</h5>
      <h5>Starts At: {readableDate(event?.eventStartDateTime)}</h5>
        </Col>
        <Col>
        <Button variant="primary" onClick={handleBookTickets} className="mt-3">
        Book Tickets
      </Button>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <p>
            <strong>Organiser:</strong> {event?.organiserId}
          </p>
          <Card className='mt-4'>
            <Card.Title className="mt-2">Description</Card.Title>
            <Card.Body>{event?.description}</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='mt-5'>
            <Card.Title className="mt-3">Actors</Card.Title>
            <Card.Body>
              {event?.actors.map((actor) => (
                <CardText key={actor._id}>{actor.name}</CardText>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ListGroup as="ol" numbered className="my-4">
        <ListGroup.Item className="fw-bold">Reviews</ListGroup.Item>
        {event?.reviews.map((review) => (
          <ListGroup.Item key={review._id} as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{review.title}</div>
              {review.body}
            </div>
            <Badge bg="primary" pill>
              {review.rating}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>

    </Container>
  );
}

export default EventInfo;

// import React, { useEffect, useState } from 'react';
// import moment from 'moment';
// import CountDown from '../Utils/CountDown/CountDown';
// import { useParams } from 'react-router-dom';
// import { Container, Carousel, Spinner, Row, Col, Card, Badge, Button } from 'react-bootstrap';
// import {Jumbotron} from 'bootstrap'
// import axios from '../Api_Resources/axios';

// function EventInfo() {
//   const [event, setEvent] = useState(null);
//   const eventId = "65b293e5932dd82cc5ca521b";

//   useEffect(() => {
//     const fetchEventData = async () => {
//       try {
//         const { data } = await axios.get(`/api/event/${eventId}`);
//         setEvent(data);
//       } catch (err) {
//         console.error(err);
//         // Handle errors here
//       }
//     };

//     fetchEventData();
//   }, [eventId]);

//   const reviews = [
//     {
//       _id: "879uijkji78uijki87",
//       userId: "89ouijkl98080809",
//       title: "i am title",
//       body: "i am body",
//       rating: 5,
//     },
//     {
//       _id: "oijknbjiouyiouh",
//       userId: "9878oijkhui7897uyijh",
//       title: "i am title",
//       body: "i am body",
//       rating: 5,
//     },
//   ];

//   const StarRating = ({ rating }) => {
//     const stars = Array.from({ length: rating }, (_, index) => (
//       <i key={index} className="bi bi-star-fill text-warning"></i>
//     ));
//     return <div>{stars}</div>;
//   };

//   function readableDate(inputDateString) {
//     const momentObject = moment(inputDateString);
//     return momentObject.format('LLLL');
//   }

//   const handleBookTickets = () => {
//     // Placeholder for booking tickets logic
//     alert('Booking tickets logic goes here!');
//   };

//   return (
//     <Container className="my-5 mt-3">
//       {event ? (
//         <>

//           <div class="jumbotron jumbotron-fluid">
//   <div class="container">
//     <h1 class="display-4">{event.title}</h1>
//     <p class="lead">{event.description}</p>
//   </div>
// </div>
//           <Row>
//             <Col xs={12} md={8}>
//               <Carousel style={{ height: "400px", width: "100%", margin: "auto" }}>
//                 {event.posters.map((poster) => (
//                   <Carousel.Item key={poster._id}>
//                     <img
//                       style={{ height: "400px", width: "100%", objectFit: "cover" }}
//                       className="d-block w-100"
//                       src={`http://localhost:3333/Uploads/images/${poster.image}`}
//                       alt={poster.ClipName || poster.BrochureName}
//                     />
//                     <Carousel.Caption>
//                       <h3>{poster.ClipName || poster.BrochureName}</h3>
//                       {/* Additional captions if needed */}
//                     </Carousel.Caption>
//                   </Carousel.Item>
//                 ))}
//                 {event.youTube && (
//                   <Carousel.Item>
//                     <iframe
//                       title="YouTube Video"
//                       width="100%"
//                       height="315"
//                       src={event.youTube.url}
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     ></iframe>
//                     <Carousel.Caption>
//                       <h3>{event.youTube.title}</h3>
//                       {/* Additional captions if needed */}
//                     </Carousel.Caption>
//                   </Carousel.Item>
//                 )}
//               </Carousel>
//             </Col>
//             <Col xs={12} md={4}>
//               <h5>Venue: {event.venueName}</h5>
//               <p>
//                 <strong>Organiser:</strong> {event.organiserId}
//               </p>
//               <p>
//                 <strong>Actors:</strong>
//               </p>
//               {event.actors.map((actor) => (
//                 <Card.Text key={actor._id}>{actor.name}</Card.Text>
//               ))}
//               <p>
//                 <strong>Starts At:</strong> {readableDate(event.eventStartDateTime)}
//               </p>
//               <Button variant="primary" onClick={handleBookTickets} className="mt-3">
//                 Book Tickets
//               </Button>
//             </Col>
//           </Row>
//           <Row className="my-4">
//             <Col>
//               <Card>
//                 <Card.Title className="mt-3">Description</Card.Title>
//                 <Card.Body>{event.description}</Card.Body>
//               </Card>
//             </Col>
//             <Col>
//               <Card>
//                 <Card.Title className="mt-3">Reviews</Card.Title>
//                 <Card.Body>
//                   {reviews.map((review) => (
//                     <Card key={review._id} className="mb-3">
//                       <Card.Body>
//                         <Card.Title>{review.title}</Card.Title>
//                         <Card.Text>{review.body}</Card.Text>
//                         <StarRating rating={review.rating} />
//                       </Card.Body>
//                     </Card>
//                   ))}
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </>
//       ) : (
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       )}
//     </Container>
//   );
// }

// export default EventInfo;





    // return (

    //     <div className="container" key={eventDetails._id}>
    //         <div className="image">

    //         </div>

    //         <div>
    //             <div className="details">
    //                 Venue Name: {eventDetails.venueName}<br />
    //                 Genre : {eventDetails.categoryId} <br />  {/*how to find the name using id */}
    //                 Start At : {readableDate(eventDetails.eventStartDateTime)}<br />
    //                 End At:{readableDate(eventDetails.eventEndDateTime)}<br />
    //             </div>

    //             <div className="book">
    //                 {eventDetails.ticketSaleStartTime === new Date() && eventDetails.remainingTickets >= 1 ? <button onClick={handleBookTickets}>Book</button> : <CountDown ticketSaleStartTime={eventDetails.ticketSaleStartTime} />}
    //                 {eventDetails.ticketSaleEndTime === new Date() && <h4>Ticket Booking Closed</h4>}
    //             </div>

    //         </div>

    //         <div className="actorsAndDesc">
    //             <div className="actors">
    //                 <span>Actors</span>
    //                 {eventDetails.actors.map((ele) => {
    //                     return (
    //                         <div className="actor">
    //                             <span key={ele._id}>
    //                                 Image : {ele.image}<br />
    //                                 Name :{ele.name}</span>
    //                         </div>
    //                     )
    //                 })}
    //             </div>

    //             <div className="desc">
    //                 About:{eventDetails.description}
    //             </div>

    //         </div>

    //         <div className="reviews">
    //             <ul>
    //                 <p>Reviews</p>
    //                 {eventDetails.reviews.map((ele) => {
    //                     return (
    //                         <div className="review">
    //                             <li key={ele._id}> Name:{ele.userId} <br /></li>
    //                             <li>Title:{ele.title} Rating :{ele.rating}<br /></li>
    //                             <li>Body:{ele.body} <br /></li>
    //                         </div>

    //                     )
    //                 })}
    //             </ul>
    //         </div>
    //         <footer>
    //             <h2>I am footer</h2>
    //         </footer>

    //     </div>
    // )
