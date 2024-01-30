import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Darkmode from '../Z_Dark_Mode/Darkmode';
import profieIcon from "../../Z_images/profile-icon.png";




function Header() {
  const [searchQuery, setSearchQuery] = useState('');//useRef
  const navigate = useNavigate();

  const handleChangeLogout = () => {
    alert('Logout Successfully');
    localStorage.removeItem('token')
    navigate('/login')
  };

  const handleSearch = () => {
    
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Event-Spot
        </Link>
        <Darkmode/>
        <Link className="navbar-brand" to="/event-form">
        Create-Event
        </Link>
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
            {localStorage.getItem("token") && (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
              </>
            )}
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
          <ul className="navbar-nav ml-auto">
            {localStorage.getItem("token") ? (
              <>
                <li className="nav-item">
                  <Link to="/user-profile">Profile</Link>

                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={handleChangeLogout}>
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
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
