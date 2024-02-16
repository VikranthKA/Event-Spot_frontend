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
      <Card style={{ width: '18rem', border: "1px solid black" }}>
        <Card.Img src={`${process.env.REACT_APP_IMAGE_URL}${image}`} />
        <Card.Body style={{ border: "2px solid white",marginTop:"" }}>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {readableDate(start)}<br />
            GENRE: <h4 style={{ color: '', display: "inline-block" }}>{categoryName}</h4><br />
            <Link to={`/event-info/${id}`}>View</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default EventCard;
