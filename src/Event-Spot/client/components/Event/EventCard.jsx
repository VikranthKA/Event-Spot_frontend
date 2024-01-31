import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample({title,poster,description}) {
  return (
    <Card style={{ width: '18rem' }}>
        add the localhost thing
      <Card.Img variant="top" src={`poster[0].clipfile`} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
        {description}
        </Card.Text>
        <Link to={`/event-info/${eventId}`}></Link>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;