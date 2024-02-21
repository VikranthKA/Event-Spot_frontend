import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import CountDown from '../Utils/CountDown/CountDown';
import { useParams,useNavigate } from 'react-router-dom';
import { Container, Carousel, Spinner, Row, Col, Card, ListGroup, Badge, Button,Form, CardText } from 'react-bootstrap';
import axios from '../Api_Resources/axios';
import { useDispatch, useSelector } from 'react-redux';
import { startGetEvents, startRaduisEvents } from '../../react-redux/action/eventAction';
import ReviewForm from '../Review/ReviewForm';
import EventCardsDisplay from './EventCardsDisplay';
import ViewHisEvents from '../ProfileHelpers/ViewHisEvents';
import { MyContext } from '../../ContextApi/Context';
import ReviewCard from '../Review/ReviewCard';
import { toast } from 'react-toastify';
import OrganiserDashboard from '../Dashboard/OrganiserDashboard';

// Import statements...
function countRemainingTicket(tickets){
const totalRemainingTickets = tickets?.reduce((total, ticket) => total + ticket?.remainingTickets, 0);
return totalRemainingTickets
}

export default function EventInfo() {
  const { eventId } = useParams();
  const [event, setEvent] = useState('');
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events)
  const {userData} = useContext(MyContext)

  useEffect(() => {
    dispatch(startGetEvents());
  }, [])
  
  useEffect(() => {
    const eventData = events.find((ele) => ele._id === eventId);
    if (eventData) {
      setEvent(eventData);
    }
  }, [events, eventId])

  function readableDate(inputDateString) {
    const momentObject = moment(inputDateString);
    return momentObject.format('L');
  }

  const navigate = useNavigate();

  const handleBookTickets = () => {
    if(userData.role==="Customer"){navigate(`/event-booking/${eventId}`);}
    else{
      toast.info("Please Login or Register to Book the tickets")
      navigate("/login")
    }
  };

  return (
    <div>
    <Container className="my-5">
    {event ? (
        <Carousel style={{ height: "400px", width: "100%", margin: "auto" ,}}>
          {event.posters.map((poster) => (
            <Carousel.Item key={poster._id} style={{}}>
              <img
                style={{ height: "400px", width: "100%", objectFit: "cover",borderRadius:"20px" }}
                className="d-block w-100"
                src={`${process.env.REACT_APP_IMAGE_URL}${poster.image}`}


                alt={poster.ClipName || poster.BrochureName}
              />
              <Carousel.Caption>
                <h3>{poster.ClipName || poster.BrochureName}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
          {event.youTube && (
            <Carousel.Item>
<iframe
            
            src={event.youTube.url}
            title="youTube-video-player"
            allowFullScreen
            style={{ height: "400px", width: "100%", objectFit: "cover",borderRadius:"20px" }}

  ></iframe>              <Carousel.Caption>
                <h3>{event.youTube.title}</h3>
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
          <h3>ORGANISER:{event?.organiserId?.username}</h3>

          <h5>Venue: {event?.venueName}</h5>
          <h5>Starts At: {readableDate(event?.eventStartDateTime)}</h5>
          <p>            Address : {event?.addressInfo?.address}<br/>
            city : {event?.addressInfo?.city}</p>
          
        </Col>
        <Col>
 
      {new Date(event.ticketSaleStartTime) > new Date() ? (
        <div>
          <CountDown ticketSaleStartTime={event.ticketSaleStartTime} />
          {userData.role == "Organiser" && userData.id === event.organiserId._id && (
            <Button onClick={() => navigate(`/event-form/${event._id}`)}>Edit</Button>
          )}
        </div>
      ) : (
        <div>
        {countRemainingTicket(event?.ticketType) >=1 
                          ? 
          <Button onClick={handleBookTickets}>Book</Button>
                         : 
          <h2>All Seats are Booked</h2>}
        </div>
      )}
    </Col>

 
    <div>

    </div>
    </Row>
      <Row className="my-4">
        <Col>
        Actors :{event?.actors?.map((actor)=>actor?.name)}
        </Col>
        <Col >
        Description :{event?.description}
        </Col>
      </Row>
      {userData.role==="Organiser" && <OrganiserDashboard event={event}/>}

      <ListGroup numbered className="my-4">
        <ListGroup.Item className="fw-bold" style={{width:"40%"}}>Reviews</ListGroup.Item>
        <ReviewForm eventId={event?._id}/>
        <div style={{width:"40%"}}>
        { event?.reviews?.length > 0 && event?.reviews?.map((review) =><ReviewCard
          eventId={event._id}
          reviewinfo={review.reviewId}
        />)}
        </div>
      </ListGroup>
    </Container>
    </div>
  );
}


