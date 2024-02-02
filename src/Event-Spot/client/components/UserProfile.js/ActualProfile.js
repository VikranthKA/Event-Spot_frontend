import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../Api_Resources/axios';
import './ActualProfile.css'; // Import a separate CSS file for styling
import Create from '../Category/Create'; // Import the Create component

const ActualProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const { profileId } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`api/profile/${profileId}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        if (response.data) {
          setProfileData(response.data);
        } else {
          setError('User profile not found');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error fetching user profile');
      }
    };

    fetchProfileData();
  }, [profileId]);

  const userRole = localStorage.getItem('token'); // Get the user's role from localStorage

  if (error) {
    return (
      <div className="container mt-5">
        <div className="card text-center bg-light p-3">
          <h1 className="card-title">Hello</h1>
          <p className="card-text text-danger">Create your profile</p>
          <div>
            <Link to="/user-profile" className="btn btn-success">
              Create
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="container mt-5">
        <div className="card text-center bg-light p-3">
          <h1 className="card-title">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="actual-profile-container">
      <div className="card text-center bg-light p-3">
        <h1 className="card-title">Actual Profile</h1>
      </div>
      <div className="card mt-3">
        <h2 className="card-header d-flex justify-content-between align-items-center">
          Profile Details
          <div>
            {userRole == 'Admin' && (
              <Create />
            )}
            {profileData && (
              <Link to="/user-profile" className="btn btn-primary me-2">
                Edit
              </Link>
            )}
            {!profileData && (
              <Link to="/user-profile" className="btn btn-success">
                Create
              </Link>
            )}
          </div>
        </h2>
        <div className="card-body">
          <img
            className="rounded-circle mb-3"
            src={`http://localhost:3333/Uploads/images/${profileData.profilePic}`}
            alt="Profile"
            width="100"
            height="100"
          />
          <p className="card-text">
            <strong>Description:</strong> {profileData.description}
          </p>
          <p className="card-text">
            <strong>Address:</strong> {profileData.address}
          </p>
          {/* Add other fields as needed */}
        </div>
      </div>
    </div>
  );
};

export default ActualProfile;
