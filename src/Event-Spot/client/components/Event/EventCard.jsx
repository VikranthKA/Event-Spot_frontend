import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function readableDate(inputDateString) {
  const momentObject = moment(inputDateString);
  return momentObject.format('LLLL');
}

function EventCard({ title, image, start, categoryName, id }) {
  return (
    <Link to={`/event-info/${id}`} style={{ textDecoration: 'none' }}>
      <Card style={{ width: '18rem', border: '1px solid black' }}>
        <Card.Img src={`${process.env.REACT_APP_IMAGE_URL}${image}`} />
        <Card.Body style={{ border: '2px solid white', marginTop: '10px' }}>
          <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>{title}</Card.Title>
          <Card.Text style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>Start Date:</span> {readableDate(start)}
          </Card.Text>
          <Card.Text style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>Genre:</span> <span style={{ color: 'blue' }}>{categoryName}</span>
          </Card.Text>
          <Link to={`/event-info/${id}`} style={{ color: 'blue', textDecoration: 'none', fontSize: '0.9rem' }}>View Details</Link>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default EventCard;
