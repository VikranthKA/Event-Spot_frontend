import React from 'react';
import ReactStarsRating from 'react-awesome-stars-rating'

const ReactStarsExample = ({ value, onChange }) => {
  return (
    <div>
      <ReactStarsRating
        value={value}
        onChange={(val) => {
            onChange && onChange(val)
        }}
        size={30} 
        isHalf={false}
        className="custom-stars"
      />
    </div>
  );
};

export default ReactStarsExample;
