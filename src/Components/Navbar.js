import React, { useContext} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom"
import NoteContext from '../Context/NoteCotext';


export default function Navbar() {
  const location = useLocation();
  // console.log(location.pathname)
  

   // context data
   let data = useContext(NoteContext);
   const { LoggedUser, setLoggedUser } = data;

   // create  navigete
   const Navigate =  useNavigate();
  
  // click on log out

  const userLogout = () => {

// remove token and chenge state and then navigate to login
    localStorage.removeItem("token");
    setLoggedUser(false);
    Navigate('/Login');

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ps-5 position-relative">
        <div className="container-fluid">
          <h1 className="navbar-brand" to="">
            My Notes
          </h1>
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
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} aria-current="page" to="/Home">
                  Home
                </Link>
              </li>
             { LoggedUser && ( <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} to="/Add-Note">
                  Add New Notes
                </Link>
              </li>)}
              { LoggedUser && (<li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} to="/View-Note">
                  View All Notes
                </Link>
              </li>)}
              { LoggedUser && (<li className="nav-item">
                <a className="nav-link" onClick={userLogout}>
                  Logout
                </a>
              </li>)}
              { !LoggedUser && (<li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} to="/Login">
                  Login
                </Link>
              </li>)}
              { !LoggedUser && (<li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} to="/Register">
                  Register
                </Link>
              </li>)}
              { LoggedUser && (<li className="nav-item" >
                <Link className="nav-link position-relative" to="/User">
                <i className="fa-solid fa-circle-user fa-2x position-absolute" style={{right:"-750px"}}></i>
                </Link>
              </li>)}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
