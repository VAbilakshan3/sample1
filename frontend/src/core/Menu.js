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



// scroll navbar
const Menu = ({ history }) => {
    const [navbar, setNavbar] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 70 && window.size > 600) {
            setNavbar(true);
        } else {
            setNavbar(false)
        }
    }



    window.addEventListener('scroll', changeBackground)
    return (


        <ReactBootStrap.Navbar collapseOnSelect className="jcol1 fixed-top n" expand="sm" bg="dark" variant="dark">
            <ReactBootStrap.Navbar.Brand >
                <Link className="nav-brand logo12 ml-3 mb-3" style={{ color: '#000' }} to="/">
                    <img className="logo12" style={{ width: "160px" }} src="https://svgshare.com/i/QV9.svg" />

                </Link>
            </ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle className="tcol text-center" aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                    <ReactBootStrap.Nav.Link >
                        <div className="nav-item l2" >
                            <Link className="nav-link ml-5" style={isActive(history, "/")} to="/">
                               <i className="fa fa-home"></i>
                            </Link>
                        </div>
                    </ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link >
                        <div className="nav-item ml-3 l2" >
                            <Link
                                className="nav-link pull-right"
                                style={isActive(history, "/cart")}
                                to="/cart"

                            >
                                <i className='fas fa-shopping-cart' ></i>

                                <sup><smal className="cart-badge1"> {itemTotal()}</smal></sup>
                            </Link>
                        </div>
                    </ReactBootStrap.Nav.Link>

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

                           <Fragment>
                                <li className="nav-item l1" >
                                <Link
                                    className="nav-link"
                                    style={isActive(history, "/signin")}
                                    to="/signin"
                                >
                                    Signin
                                </Link>
                            </li>
                           </Fragment>
                        )}
                    </ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link eventKey={2} >
                        {!isAuthenticated() && (

                           <Fragment>
                                <li className="nav-item l1" >
                                <Link
                                    className="nav-link"
                                    style={isActive(history, "/signup")}
                                    to="/signup"
                                >
                                    Signup
                                </Link>
                            </li>
                           </Fragment>
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

export default withRouter(Menu);


































