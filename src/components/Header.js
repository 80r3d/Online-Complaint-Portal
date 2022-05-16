import React, { Component, Fragment,useState, useEffect  } from "react";
import { useHistory } from 'react-router-dom';
import "./assets/css/bootstrap.min.css";
import "./assets/css/icons.css";
import "./assets/css/style.css";
import "./assets/css/pk-style.css";
import "./assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css";
import "./assets/images/favicon.ico";
import "./assets/plugins/datatables/dataTables.bootstrap4.min.css";
import "./assets/plugins/datatables/responsive.bootstrap4.min.css";
import { Link, withRouter } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import logo from "./assets/images/logo.png";
import logosm from "./assets/images/logo-sm.png";
import user1 from "./assets/images/users/cep-user1.jpg";

import { Container, Backdrop, Fade, Modal, makeStyles, Checkbox, FormControlLabel, Grid, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, Table } from '@material-ui/core'

import {

  Navbar,
  NavbarBrand,
  NavLink,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
//import DropdownButton from 'react-dropdown';
//import 'react-dropdown/style.css';

import $ from "jquery";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";
import SignIn from "./SignIn";

const useStyles = makeStyles((theme) => ({

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid grey',
    borderRadius:'10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& .MuiTableCell-head": {
        fontSize: "1.25rem"
    }
  }

}));

const Header = (...props) => {

  const classes = useStyles();
  const [openSignIn, setOpenSignIn] = useState(false); 

  
  // toggle = (e) => {
  //   //console.log(e.target.id);

  //   let stepErrors = {};
  //   e.preventDefault();
  //   this.Jquery_func();

  //   // after type error message hide
  //   //console.log('error msg');
  //   //console.log(e.target.name);
  //   if (e.target.id === "saveAction") {
  //     this.setState({ profileimage: this.state.tempprofileImage });

  //     // Update Profile method
  //     this.UpdateProfileMethod();
  //     // Update Profile method
  //   } else {
  //     // after type error message hide
  //     let step2Errors = {};
  //     delete this.state.errors[e.target.name];
  //     this.setState({ errors: [] });
  //     this.setState({ stepErrors: step2Errors });
  //     // after type error message hide

  //     this.GetProfileInfo();

  //     this.setState({
  //       modal: !this.state.modal,
  //     });
  //   }
  // }
  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  }
  return (
    <div>
      <Fragment>
        <div className="header" style={{ backgroundColor: "#508aeb", fontSize: "20px" }}>
          <div className="container-fluid" >
            <div className="row">
              <div className="col-xl-12" >
                <nav className="navbar navbar-expand-lg navbar-light">
                  <NavbarBrand href="/">
                    <h6 style={{ fontSize: "30px", marginTop: "20px", color: "white" }}>Citizen Engagement Portal{localStorage.userName!=""? " : Admin Portal":""}</h6>
                  </NavbarBrand>
                  <Collapse isOpen={true} navbar>
                    <Nav className="ml-auto" navbar>
                     {localStorage.userName == "" ? (<NavItem>
                        <NavLink style={{ color: "white" }} href="/">Home</NavLink>
                      </NavItem>):(<NavItem>
                        <NavLink style={{ color: "white" }} href="/#/AdminHome">Home</NavLink>
                      </NavItem>)}
                      <NavItem>
                        <NavLink style={{ color: "white" }} href="/about">About</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink style={{ color: "white" }} href="/contact">Contact</NavLink>
                      </NavItem>
                      {localStorage.userName != ""? (<NavItem>
                       <NavLink onClick={()=> localStorage.userName = ""} style={{ color: "white" }} href="/#/" >Log Out</NavLink>
                      </NavItem>):(<NavItem>
                        <NavLink style={{ color: "white" }} href="/#/SignIn" >SignIn</NavLink>
                      </NavItem>)}
                      <NavItem>
                        <NavLink href="#"><i style={{ color: "white", fontSize: "30px" }} onClick={() => alert("clicked")} className="mdi mdi-account-circle m-r-5"></i>{" "}</NavLink>
                      </NavItem>
                    </Nav>
                  </Collapse>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
      {/* <div className="menu-extras topbar-custom">
                
                <ul className="list-inline float-right mb-0">
                  <li class="list-inline-item dropdown notification-list d-none d-sm-inline-block">
                    <form role="search" class="app-search">
                      <div class="form-group mb-0" style={{ color: "#fff" }}>
                        {localStorage.name != null ? (
                          <div>Welcome, {localStorage.name}</div>
                        ) : null}
                      </div>
                    </form>
                  </li>


                  <li className="list-inline-item dropdown notification-list">
                    <a
                      className="nav-link dropdown-toggle arrow-none waves-effect nav-user"
                      data-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-haspopup="false"
                      aria-expanded="false"
                    >
                      
                      {this.state.profileimage == "" ? (
                        <img
                          src={user1}
                          alt="user"
                          className="rounded-circle"
                        />
                      ) : (
                        <img
                          src={this.state.profileimage}
                          alt="user"
                          className="rounded-circle"
                        />
                      )}
                    </a>
                    {localStorage.usertype != null ? (
                      <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown ">
                        <a
                          className="dropdown-item"
                          onClick={this.toggle}
                          href="#"
                        >
                          <i className="mdi mdi-account-circle m-r-5 text-muted"></i>{" "}
                          Profile
                        </a>
                        <Link to="/Settings" className="dropdown-item" href="#">
                          <i className="mdi mdi-settings m-r-5 text-muted"></i>{" "}
                          Settings
                        </Link>
                        <a
                          className="dropdown-item"
                          onClick={this.changePassToggle}
                          href="#"
                        >
                          <i className="mdi mdi-lock-open m-r-5 text-muted"></i>{" "}
                          Change Password
                        </a>
                        <a
                          id="logout_btn_id"
                          className="dropdown-item"
                          href="#"
                          onClick={this.Logout}
                        >
                          <i className="mdi mdi-logout m-r-5 text-muted"></i>{" "}
                          Logout
                        </a>
                      </div>
                    ) : null}
                    {localStorage.usertype == null ? (
                      <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown ">
                        <Link to="/SignIn" className="dropdown-item" href="#">
                          <i className="mdi mdi-login m-r-5 text-muted"></i>{" "}
                          Sign In
                        </Link>
                        <Link to="/Register" className="dropdown-item" href="#">
                          <i className="mdi mdi-account m-r-5 text-muted"></i>{" "}
                          Sign up
                        </Link>
                      </div>
                    ) : null}
                  </li>
                  <li className="menu-item list-inline-item">
                    <a className="navbar-toggle nav-link">
                      <div className="lines">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div> */}

      {/* <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openSignIn}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>

          <Fade in={openSignIn}>
            <div className={classes.paper}>
              <center><h5>SignIn</h5></center>
              <SignIn />
              
            </div>
          </Fade>
        </Modal>
      </div> */}

    </div>
  );


}
export default Header;
