import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from './cartHelpers'
import '../App.css';
import * as ReactBootStrap from 'react-bootstrap'



const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#000" };
    } else {
        return { color: "#479438" }
    }
};




const MenuAdmin = ({ history }) => {
    const [navbar, setNavbar] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 70) {
            setNavbar(true);
        } else {
            setNavbar(false)
        }
    }


    window.addEventListener('scroll', changeBackground)
    return (
        
        
        <ReactBootStrap.Navbar collapseOnSelect className= "jcol1 fixed-top "  expand="sm" bg="" variant="dark">
  <ReactBootStrap.Navbar.Brand >
  <Link className="nav-brand logo12 ml-3 mb-3" style={{ color: '#000' }} to="/admin/dashboard">
            <img className="logo12" style={{width:"160px",paddingTop:"", paddingBottom:"10px"}} src="https://svgshare.com/i/QV9.svg" />
            
        </Link>
  </ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle className="tcol" aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="mr-auto">
      
     
    </ReactBootStrap.Nav>
    <ReactBootStrap.Nav>
      <ReactBootStrap.Nav.Link >
{/* <div> */}
{isAuthenticated() && isAuthenticated().user.role === 0 && (
            <div className="nav-item l1" >
                <Link
                    className="nav-link"
                    style={isActive(history, "/user/dashboard")}
                    to="/user/dashboard"
                >
                  
                   Dashboard
      
                </Link>
            </div>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <div className="nav-item l1" >
                <Link
                    className="nav-link"
                    style={isActive(history, "/admin/dashboard")}
                    to="/admin/dashboard"
                >
                    Admin
    </Link>
            </div>
        )}
        {!isAuthenticated() && (
          
          <li className="nav-item l1" >
          <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
          >
              Signin
  
          </Link>
      </li>
        )}
      </ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link eventKey={2} >
      {!isAuthenticated() && (
           
                <li className="nav-item l1" >
                    <Link
                        className="nav-link"
                        style={isActive(history, "/signup")}
                        to="/signup"
                    >
                        Signup
           
                    </Link>
                </li>
      )}
       {isAuthenticated() && (
            <li className="nav-item pull-right l1 " >
                <span
                    className="nav-link "
                    style={{ cursor: "pointer", color: "#479438" }}
                    onClick={() =>
                        signout(() => {
                            history.push("/");
                        })
                    }
                >
                    Signout
        

                </span>
            </li>
        )}
      </ReactBootStrap.Nav.Link>
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
        
    )
};

export default withRouter(MenuAdmin);


































