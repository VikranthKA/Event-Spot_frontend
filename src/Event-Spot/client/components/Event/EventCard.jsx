import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import moment from 'moment'
import { faInfo} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function readableDate(inputDateString) {
  const momentObject = moment(inputDateString);
  return momentObject.format('LLLL');
}
function EventCard({title,image,start,categoryName,id}) {

  return (
    <Card style={{ width: '18rem',border:"1px solid black" }}>
      <img 
<<<<<<< HEAD
        src={`http://localhost:3333/Uploads/images/${image}`}

       style={{backgroundSize:"cover"}} />
      <Card.Body style={{border:"2px solid white" }}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {readableDate(start)}<br/>{categoryName}
        </Card.Text>
        <Link to={`/event-info/${id}`}>View</Link>
=======
        src={`${process.env.REACT_APP_IMAGE_URL}${image}`}
                onClick={()=>`/event-info/${id}`}

       style={{backgroundSize:"cover"}} />
      <Card.Body style={{border:"2px solid white" }}>
        <Card.Title onClick={()=>`/event-info/${id}`}>{title}</Card.Title>
        <Card.Text onClick={()=>`/event-info/${id}`}>
          {readableDate(start)}<br/>
          GENRE:<h4 style={{color:'',display:"inline-block"}}>{categoryName}</h4><br/>
        <Link to={`/event-info/${id}`}>View</Link>
        </Card.Text>
>>>>>>> bc95efedd3bde181ca4d1ae44fe51624a8745c67
      </Card.Body>
    </Card>
  );
}

export default EventCard