import React,{useState} from 'react'
import Star from "./ReviewStar/Star"
import z from 'zod'
import { useDispatch,useSelector } from 'react-redux'
function ReviewForm() {
    const dispatch = useDispatch()

    const [review,setReview] = useState({
        title: "",
        body: "",
        rating: ""
    })
    const handleReviewChange = (value,name)=>{
        setReview((prev)=>({
            ...prev,
            [name]:value
        }))

    }
    const handleReviewSubmit = (e)=>{
        e.preventDefault()
        
    }
  return (
    <div>ReviewForm
        <form onSubmit={handleReviewSubmit}>
            <input type='text' value={review.body} name="body" onChange={(e)=>handleReviewChange(e.target.value,e.target.name)} />
            <input type='text' value={review.title} name="title" onChange={(e)=>handleReviewChange(e.target.value,e.target.name)} />
            <input type='number' value={review.rating} name="rating" onChange={(e)=>handleReviewChange(e.target.value,e.target.name)} />
            <input type="submit"></input>
        </form>

        <div>
            <Star/>
        </div>
    </div>
        )
}

export default ReviewForm