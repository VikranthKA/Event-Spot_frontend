import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import moment from 'moment'

function readableDate(inputDateString) {
  const momentObject = moment(inputDateString);
  return momentObject.format('LLLL');
}
function BasicExample({title,image,start,categoryName,id}) {

  return (
    <Card style={{ width: '18rem' }}>
      <img src={image} style={{backgroundSize:"cover"}} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {readableDate(start)}<br/>{categoryName}
        </Card.Text>
        <Link to={`/event-info/${id}`}></Link>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;