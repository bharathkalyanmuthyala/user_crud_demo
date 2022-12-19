import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import {FaUsers,FaUsersSlash} from 'react-icons/fa'

function Navbar() {
  const activeLink = {
    color: "#EEF0F1",
   
    fontWeight: "bold",
    fontSize:"1.2rem",
   
  };
  const inactiveLink = {
    color: "#EEF0F1",
    fontSize:"1.2rem",
    
  };


  return (
    <div>
      <nav className="navbar navbar-expand-sm " >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/WLM_logo-2.svg/404px-WLM_logo-2.svg.png" width="60px" className="shadow" alt="" />
            </a>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* users */}
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  style={({isActive}) => {
                    return isActive ? activeLink :  inactiveLink;
                  }}
                  to="/users"
                >
                  <FaUsers className='users-icon'/>
                  Users
                </NavLink>
              </li>
              {/* removed users */}
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  style={({isActive}) => {
                    return isActive ? activeLink : inactiveLink;
                  }}
                  to="/removed-users"
                >
                  <FaUsersSlash className="removed-users-icon" />
                  Removed Users
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
