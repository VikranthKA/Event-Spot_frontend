import React from 'react';
import notFound from "../../../Z_images/IMAGE/notFound.jpg";
import "./NotFound.css"; // Import CSS file for styling

function NotFound() {
  return (
    <div className="not-found-container"> {/* Apply a class to the container */}
      <div className="background-image" style={{backgroundImage: `url(${notFound})`}}></div>
      <div className="not-found-content"> {/* Wrap content in a separate div for styling */}
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default NotFound;
