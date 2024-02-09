import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../Api_Resources/axios';
import './ActualProfile.css'; // Import a separate CSS file for styling
import UserForm from './UserForm';

export default function Profile (){
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const { profileId } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`api/profile`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        if (response.data) {
          console.log(response.data)
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
            <Link to="/edit-profile" className="btn btn-success">
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
    <div className="container mt-5">
      <div className="card shadow" style={{width:"700px", marginLeft:"200px"}}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Profile Details</h5>
          <div>
            {profileData && (
              <Link to="/edit-profile" className="btn btn-warning me-2">
                Edit
              </Link>
            )}
            {!profileData && (
              <Link to="/edit-profile" className="btn btn-success">
                Create
              </Link>
            )}
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center" style={{marginTop:"20px"}}>
              <img
                className="rounded-circle mb-3"
                src={`http://localhost:3333/Uploads/images/${profileData.profilePic}`}
                alt="Profile"
                width="150"
                height="150"
              />
            </div>
            <div className="col-md-8">
              <p className="card-text">
                <strong>Username:</strong> {profileData.userId.username}
              </p>
              <p className="card-text">
                <strong>Role:</strong> {profileData.userId.role}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {profileData.userId.email}
              </p>
              <p className="card-text">
                <strong>Description:</strong> {profileData.description}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {profileData.addressInfo.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
