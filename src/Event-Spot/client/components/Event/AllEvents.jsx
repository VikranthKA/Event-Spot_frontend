import React, { useState, useEffect } from 'react';
import axios from '../Api_Resources/axios';

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/event?page=${currentPage}`);
        setEvents(response.data.events);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchEvents();
  }, [currentPage]);

  const toggleDescription = (eventId) => {
    setExpandedDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [eventId]: !prevDescriptions[eventId],
    }));
  };

  const handleApprove = async (eventId) => {
    try {
      const response = await axios.put(`/api/event/approve/${eventId}`);
      const updatedEvent = response.data;
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card text-center bg-light p-3">
        <h1 className="card-title">Events Approval</h1>
      </div>
      <div className="card-container d-flex flex-wrap justify-content-around" style={{marginTop:'20px'}}>
        {events.map((event) => (
          <div key={event._id} className="card mb-4" style={{ width: '18rem' }}>
            {event.posters && event.posters.length > 0 && (
              <img src={event.posters[0].image} className="card-img-top" alt={event.title} />
            )}
            <div className="card-body">
              <h5 className="card-title">{event.title}</h5>
              <p className="card-text">Category: {event.categoryId && event.categoryId.name}</p>
              {expandedDescriptions[event._id] ? (
                <div>
                  <p className="card-text">Description: {event.description}</p>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => toggleDescription(event._id)}
                  >
                    Read Less
                  </button>
                </div>
              ) : (
                <div>
                  <p className="card-text">
                    Description: {event.description.substring(0, 100)}
                    {event.description.length > 100 && (
                      <span>
                        ...{' '}
                        <button
                          className="btn btn-link p-0"
                          onClick={() => toggleDescription(event._id)}
                        >
                          Read More
                        </button>
                      </span>
                    )}
                  </p>
                </div>
              )}
              <br />
              <button className="btn btn-success" onClick={() => handleApprove(event._id)}>
                Approve
              </button>
              <br />
              <br />
              <button className="btn btn-danger">disapprove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-dark"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`btn btn-dark ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-dark"
        >
          Next
        </button>
      </div>
    </div>
  );
}
