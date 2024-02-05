import React, { useState,useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser ,faPlus} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Darkmode from '../Z_Dark_Mode/Darkmode';
import profieIcon from "../../Z_images/profile-icon.png";
import { MyContext } from '../../ContextApi/Context';
import {jwtDecode} from "jwt-decode"




function Header() {
  const {searchQuery,setSearchQuery} = useContext(MyContext)
  const navigate = useNavigate();
  const [role,setRole]  = useState(" ")
  const handleChangeLogout = () => {
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the logout logic
        localStorage.removeItem('token');
        navigate('/login');
        
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been logged out.',
          icon: 'success',
        });
      }
    });
  };

  const handleSearch = () => {
    // Implement search logic here
  };
  useEffect(()=>{
    const {role} = jwtDecode(localStorage.getItem("token"))
    setRole(role)
  },[])

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Event-Spot
        </Link>
        
        {role==="Organiser" && <Link className="navbar-brand" to="/event-form">
        <FontAwesomeIcon className = "search-icon" icon={faPlus} />Event
        </Link>}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
              </>
          </ul>
          <form className="d-flex mx-auto justify-content-start">
            <input
              className="form-control me-2 "
              type="search"
             
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn text-white "
              type="button"
              onClick={handleSearch}
            >
              <FontAwesomeIcon className = "search-icon" icon={faSearch} />
            </button>
          </form>
          <ul className="navbar-nav ml-auto">
            {localStorage.getItem("token") ? (
              <div style={{display:"flex",justifyContent:"space-evenly"}}>
                <li className="nav-item " style={{marginTop:"5px"}}>
                  <Link to="/profile">
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                </li>
                
                <li className="nav-item">
                <Darkmode/>

                </li>
                

                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={handleChangeLogout}>
                    Logout
                  </button>
                </li>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <Darkmode/>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
