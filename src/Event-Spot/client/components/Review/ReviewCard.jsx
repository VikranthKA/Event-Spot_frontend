import React,{useState,useEffect, useContext} from 'react'
import ReviewForm from './ReviewForm'
import { Container, Carousel, Spinner, Row, Col, Card, ListGroup, Badge, Button,Form, CardText } from 'react-bootstrap';
import { MyContext } from '../../ContextApi/Context';
import { useDispatch } from 'react-redux';
import { startDeleteReview } from '../../react-redux/action/eventAction';


const ReviewCard = ({eventId,reviewinfo}) => {

    const [reviewToggle, setReviewToggle] = useState(false)
    const {userData} = useContext(MyContext)
    const dispatch  =useDispatch()
    const handleReviewToggle = ()=>{
      setReviewToggle(false)
    }

  return (
    <div style={{width:"100%",marginTop:"10%",borderRadius:"5%"}}>
        <ListGroup.Item key={reviewinfo._id} as="li" className="d-flex justify-content-between align-items-start"  >
            {reviewToggle ?<ReviewForm eventId={eventId} updatingReview={reviewinfo} handleReviewToggle={handleReviewToggle} />:<div className="ms-2 me-auto">
                <div>
                Name:{reviewinfo?.userId?.username}
              <div className="fw-bold">Title:{reviewinfo?.title}</div>
              Body:{reviewinfo.body}
            </div>
            <Badge bg="primary" pill>
              {reviewinfo?.rating}
            </Badge>
            </div>}
            { userData?.id===reviewinfo?.userId?._id && <div style={{ display: 'block' }}>
              {reviewToggle ? (
                <Button onClick={() => setReviewToggle(!reviewToggle)}>cancel</Button>
              ) : (
                <Button onClick={() => setReviewToggle(!reviewToggle)}>Edit</Button>
              )}
              <Button onClick={()=>dispatch(startDeleteReview(eventId,reviewinfo._id))}>delete</Button>

            </div>}
          </ListGroup.Item>
    </div>
  )
}

export default ReviewCard
