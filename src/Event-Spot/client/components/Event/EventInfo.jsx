import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import CountDown from '../Utils/CountDown/CountDown';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Carousel, Spinner, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startGetEvents } from '../../react-redux/action/eventAction';
import ReviewForm from '../Review/ReviewForm';
import ReviewCard from '../Review/ReviewCard';
import ViewHisEvents from '../ProfileHelpers/ViewHisEvents';
import { MyContext } from '../../ContextApi/Context';

function EventInfo() {
  const { eventId } = useParams();
  const [event, setEvent] = useState('');
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events)
  const { userData } = useContext(MyContext)

  useEffect(() => {
    dispatch(startGetEvents());
  }, []);

  useEffect(() => {
    const eventData = events.find((ele) => ele._id === eventId);
    if (eventData) {
      setEvent(eventData);
    }
  }, [events, eventId])

  function readableDate(inputDateString) {
    const momentObject = moment(inputDateString);
    return momentObject.format('LLLL');
  }

  const navigate = useNavigate();

  const handleBookTickets = () => {
    navigate(`/event-booking/${eventId}`);
  };

  return (
    <div>
      <Container className="my-5">
        {event ? (
          <Carousel style={{ height: "400px", width: "100%", margin: "auto" }}>
            {event.posters.map((poster) => (
              <Carousel.Item key={poster._id}>
                <img
                  style={{ height: "400px", width: "100%", objectFit: "cover" }}
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
                  width="100%"
                  height="400px"
                  src={event.youTube.url}
                  title="youTube-video-player"
                  allowFullScreen
                ></iframe>
                <Carousel.Caption>
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
          <Container style={{ color: "#F7DC6F" }}>
            <Card style={{ width: "1100px", height: "250px", }} >
              <Row>
                <Col>
                  <h1 className="my-3, fw-bold">{event?.title}</h1>
                  <h3>Organized by: {event?.organiserId?.username}</h3>
                  <h5>Venue: {event?.venueName}</h5>
                  <h5>Starts At: {readableDate(event?.eventStartDateTime)}</h5>
                </Col>
                <Col>
                  {userData.role === 'Organiser' && userData.id === event.organiserId ? (
                    <Button onClick={() => navigate(`/event-form/${event._id}`)}>Edit</Button>
                  ) : (
                    <Button className='btn btn-warning' onClick={handleBookTickets} style={{ marginLeft: "500px" }}>Book</Button>
                  )}
                </Col>
              </Row>
              <Row className="my-4">
                <Col>
                  <p>Actors: {event?.actors?.map((actor) => actor?.name)}</p>
                </Col>
              </Row>
            </Card>
          </Container>
        </Row>
        <Row>
          <Container>
            <p className="text-center bg-light p-3">Description: {event?.description}</p>
          </Container>
        </Row>
        <ListGroup numbered className="my-4">
          <Card style={{ width: "900px", }}>
            <h2 className="fw-bold" style={{ width: "50%" }}>Reviews</h2>
            <ReviewForm style={{ width: "1000px" }} eventId={event?._id} />
          </Card>
          <div style={{ width: "40%" }}>
            {event?.reviews?.length > 0 && event?.reviews?.map((review) => <ReviewCard
              eventId={event._id}
              reviewinfo={review.reviewId}
            />)}
          </div>

        </ListGroup>
      </Container>
      {userData.role === "Organiser" && <ViewHisEvents />}
    </div>
  );
}

export default EventInfo;
