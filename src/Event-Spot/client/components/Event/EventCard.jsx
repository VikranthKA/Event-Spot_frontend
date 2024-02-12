import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import moment from 'moment'

function readableDate(inputDateString) {
  const momentObject = moment(inputDateString);
  return momentObject.format('LLLL');
}
function EventCard({title,image,start,categoryName,id}) {

  return (
    <Card style={{ width: '18rem',border:"1px solid black" }}>

      <img 
        src={`${process.env.REACT_APP_IMAGE_URL}${image}`}

       style={{backgroundSize:"cover"}} />
      <Card.Body style={{border:"2px solid white" }}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {readableDate(start)}<br/>{categoryName}
        </Card.Text>
        <Link to={`/event-info/${id}`}>View</Link>
      </Card.Body>
    </Card>
  );
}

export default EventCard