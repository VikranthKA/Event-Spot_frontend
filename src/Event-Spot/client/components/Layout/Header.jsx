import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {Context} from '../../ContextApi/Context';
import Darkmode from '../Z_Dark_Mode/Darkmode';


function Header() {
  const { isLogin, handleLogout } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleChangeLogout = () => {
    handleLogout();
    alert('Logout Successfully');
  };

  const handleSearch = () => {
    console.log(searchQuery);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Event-Spot
        </Link>
        <Darkmode/>

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
            {isLogin && (
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
            {isLogin ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-dark" onClick={() => navigate('/user-profile')}>
                    Profile
                  </button>
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
