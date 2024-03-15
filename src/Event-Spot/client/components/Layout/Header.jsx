import React, { useState, useContext, memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserAstronaut, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Darkmode from '../Z_Dark_Mode/Darkmode';
import { MyContext } from '../../ContextApi/Context';
import eventLogo from "../../Z_images/EVENT_LOGO_FINAL.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript



function Header() {
  const [search, setSearch] = useState(" ")
  const { searchQuery, setSearchQuery, userData, profileDispatch, setUserData, setToken, profile } = useContext(MyContext)
  const navigate = useNavigate();

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
        //empty the profile state in the app
        profileDispatch({ type: 'CLEAR_PROFILE_DATA' })
        setUserData("")
        setToken("")
        navigate('/login')


        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been logged out.',
          icon: 'success',
        });
      }
    });
  };

  const handleSearch = () => {
    setSearchQuery(search.toLowerCase())
  }
  useEffect(() => {
    console.log(userData, "in headers")
  }, [userData])

  const navContent = () => {
    return ( 
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {localStorage.getItem("token") && (
            <>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  {console.log(userData.role)}
                  {(userData.role === "Organiser" || userData.role === "Admin") ? <h4 style={{ marginTop: "10px" }}>DASHBOARD</h4> : <h2 style={{ marginTop: "10px" }}>MAP</h2>}
                </Link>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav ml-auto" style={{ display: "flex" }}>
          {localStorage.getItem("token") ? (
            <>
              <li className="nav-item ">
                <Link to="/user-profile" >

                  {profile?.profilePic ? <img
                    className="rounded-circle mb-3"
                    src={`${process.env.REACT_APP_IMAGE_URL}${profile.profilePic}`}
                    alt="Profile"
                    width="30"
                    height="30"
                    style={{ marginTop: "10px", marginRight: "10px" }}
                  /> : <FontAwesomeIcon icon={faUserAstronaut} style={{ marginTop: "15px", marginRight: "10px", width: "20", height: "20" }} />
                  }

                </Link>
              </li>
              <li className="nav-item" style={{ marginRight: "10px", marginTop: "5px" }}>
                <Darkmode />

              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={handleChangeLogout} style={{ marginRight: "10px", marginTop: "5px" }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <a class="dropdown-item" href="/login"><Link className="nav-link" to="/login">
                  Login
                </Link>
                </a>
              </li>
              <li className="nav-item">
                <Darkmode />

              </li>
            </>
          )}
        </ul>
      </div>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img style={{ height: "50px", width: "150px", border: "2px solid orange", borderRadius: "10px" }} src={eventLogo} />
        </Link>

        {userData.role === "Organiser" && <Link className=" nav-link navbar-brand" to="/event-form">
          <FontAwesomeIcon icon={faPlus} />Event
        </Link>}

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" style={{margin:" 0 5% 0 5%"}}> </span>
        </button>
        {navContent()
        }
      </div>
    </nav>
  );
}

export default memo(Header)