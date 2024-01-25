// import {useState,useEffect} from "react"
// import {useSelector,useDispatch} from 'react-redux'
// import {startGetUser} from "../../react-redux/action/userAction"

// const DisplayUser = () => {
//     const userData  = useSelector((state)=>{
//         return state.user
//     })
//     const dispatch  = useDispatch()
//       return (
//     <div>
//       <button onClick={()=>{dispatch(startGetUser())}}>Get data</button>
//       <ul>
//         {userData?.map((ele)=>{
//             return (
//                 <li key={ele._id}>
//                   {ele.name}
//                 </li>
//             )
//         })}
//         {console.log(userData)}
//       </ul>
//     </div>
//   )
// }

// export default DisplayUser

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../Api_Resources/axios'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
  const { id } = useParams();
  const [profilePic, setProfilePic] = useState('');
  const [displayPic, setDisplayPic] = useState('');

  useEffect(() => {
    // Fetch saved details from local storage
    const savedDetails = JSON.parse(localStorage.getItem('profileDetails')) || {};

    if (id) {
      // Fetch user details
      axios
        .get(`/api/user/${id}`)
        .then((response) => {
          setProfilePic(response.data.profilePic);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }

    // Fetch displayPic from local storage
    const savedDisplayPic = localStorage.getItem('displayPic') || '';
    setDisplayPic(savedDisplayPic);
  }, [id]);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const confirmProfilePic = () => {
    const formData = new FormData();
    formData.append('profilePic', profilePic);

    axios
      .post('/api/profile/pic', formData)
      .then((response) => {
        console.log('Backend response:', response.data);

        // Update displayPic with response data
        const updatedDisplayPic = response.data.profilePic;

        // Update and save displayPic
        localStorage.setItem('displayPic', updatedDisplayPic);
        setDisplayPic(updatedDisplayPic);
      })
      .catch((error) => {
        console.error('Error sending data to the backend:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-3">
        <img
          className="rounded-circle"
          src={`/Uploads/images/${displayPic}`}
          alt="Profile"
          width="100"
          height="100"
        />
      </div>

      <form encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="profilePic" className="form-label">
            Change Profile Picture
          </label>
          <input type="file" className="form-control" name="profilePic" onChange={handleFileChange} />
        </div>

        <div className="mb-3">
          <button type="button" className="btn btn-dark" onClick={confirmProfilePic}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
