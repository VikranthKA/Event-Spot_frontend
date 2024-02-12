import React, { useState } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReviewForm() {
  const [review, setReview] = useState({
    title: '',
    body: '',
    rating: 0,
  });

  const handleReviewChange = (value, name) => {
    setReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div>
      <Form onSubmit={handleReviewSubmit} style={{width:"40%"}}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Enter title"
            value={review.title}
            onChange={(e) => handleReviewChange(e.target.value, 'title')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="body">Body</Label>
          <Input
            type="textarea"
            id="body"
            placeholder="Enter review body"
            value={review.body}
            onChange={(e) => handleReviewChange(e.target.value, 'body')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="rating">Rating</Label>
          <ReactStarsRating
            value={review.rating}
            count={5}
            onChange={(value) => handleReviewChange(value, 'rating')}
            size={30}
            isHalf={true}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>

    </div>
  );
}

export default ReviewForm

