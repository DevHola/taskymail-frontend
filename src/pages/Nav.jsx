import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/Authslice';
function Nav() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.mail);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
     dispatch(logout()).then(()=>{
      navigate("/")
     })
    
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={!isCollapsed ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`}>
          <Link to="/dashboard" className="navbar-brand">TaskyMail</Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/inbox">Inbox</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <span className="d-none d-sm-block mx-4">Hello {user?.name}</span>
          <div className="dropdown">
            <i className="fas fa-bell"></i>
            <span className="badge rounded-pill badge-notification bg-danger">{unreadCount}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
