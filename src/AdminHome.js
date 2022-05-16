import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link, useHistory } from "react-router-dom";
import Logo from "./MunilogicLogo.png";
import "./css/Sidebar.css";
import { connect } from "react-redux";
import useForm from "./components/useForm";
import useFormA from "./components/useFormA";
import Header from "./components/Header";
import {
  Container,
  Backdrop,
  Fade,
  Modal,
  makeStyles,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import axios from "axios";
import * as actions from "./actions/buActions";
import ImageUploading from "react-images-uploading";
import { render } from "@testing-library/react";
import { ContactlessSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid grey",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
}));

const AdminHome = () => {

var searchString = "";
  var dept = [
    "Electrical",
    "Road/Transport",
    "Water/Suage",
    "Traffic/Parking",
    "Waste/Dumping",
  ];
  
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openFormA, setOpenFormA] = useState(false);
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [alertt, setAlertt] = useState(false);
  const[ISSUE_ID,setISSUE_ID]=useState(0);
  const[issueData,setIssueData]=useState([]);
  const[findIssue,setFindIssue]=useState([]);
  const[openSearchIssue,setOpenSearchIssue]=useState(false);
  const[updateFlag,setUpdateFlag]=useState(false);
  const[updatedStatus,setUpdatedStatus]=useState("Active");
  const[editId,setEditId]=useState("");

  const finalArrR = {
    department_id: 0,
    issue_title: "",
    issue_description: "",
    issue_location: "",
    issue_image: "",
    issuer: {
      issuer_name: "",
      issuer_email: "",
      issuer_phone: "",
    },
  };
  const finalArrA = {
    department_id: 0,
    issue_title: "",
    issue_description: "",
    issue_location: "",
    issue_image: "",
    issuer: {
      issuer_name: "Anonymous",
      issuer_email: "Anonymous",
      issuer_phone: "Anonymous",
    },
  };

  const updateStatusFinal = {
    issue_id: 0,
    issue_status: "",
  }

  const initialFieldValues = {
    //FIRST PAGE FORM VALUES INIT
    name: "",
    phone: "",
    email: "",
    issueTitle: "",
    department: "",
    issueDescription: "",
    location: "",
  };

  const initialFieldValuesA = {
    //FIRST PAGE FORM VALUES INIT
    issueTitle: "",
    department: "",
    issueDescription: "",
    location: "",
  };

  const updateStatus = {    
      issue_id: "",
      issue_status : "",
    }
  
  const { values, setValues, handleChange, resetForm } =
    useForm(initialFieldValues); //custom hook call, handles all the field value changes PAGE 1
  const { ifva, setIfva, handleIfvaChange, resetIfva } =
    useFormA(initialFieldValuesA); //custom hook call

  const handleReportIssue = () => {
    setOpenForm(true);
    // history.push('complaint');
  };
  const handleAnonymousComplaint = () => {
    setOpenFormA(true);
    // history.push('complaint');
  };

  const handleHome = () => {
    history.push("/");
  };

  const handleRegister = () => {
    history.push("Register");
  };

  const handleSignIn = () => {
    history.push("SignIn");
  };

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  var blobURL;
  var fileName;

  // Convert a base64 string into a binary Uint8 Array
  // https://gist.github.com/borismus/1032746
  function convertDataURIToBinary(dataURI) {
    var BASE64_MARKER = ";base64,";
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

 

  const convertURIToImageData = (url) => {
    return new Promise((resolve, reject) => {
      if (!url) {
        return reject();
      }
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const image = new Image();
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(context.getImageData(0, 0, canvas.width, canvas.height));
      }
      image.crossOrigin = "Anonymous";
      image.src = url;
    });
  }
  const load = async (url) => {
    const img = await convertURIToImageData(url)
    console.log(img)
  }

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const createIssueInline = async (nm) => {
    // CUSTOM API CALL TO CHECK EXISTANCE OF NEW ADDED BU IN DB
    try {
      var issuenum = await axios.post(
        "https://localhost:5001/api/issue/post" , nm
      );
      setISSUE_ID(issuenum.data);
      setAlertt(true);
      setImages([]);
      
      // data1.push(chkResponse.data);
      // console.log(data1[0].Status);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    finalArrA.department_id = values.department;
    finalArrA.issue_title = values.issueTitle;
    finalArrA.issue_description = values.issueDescription;
    finalArrA.issue_location = values.location;
    (images.length > 0) ? finalArrA.issue_image = images[0].data_url : finalArrA.issue_image = "";
    finalArrA.issuer.issuer_name = values.name;
    finalArrA.issuer.issuer_email = values.email;
    finalArrA.issuer.issuer_phone = values.phone;
  //  props.createIssue(finalArrA);
  //  console.log(props.issueNumber);
   createIssueInline(finalArrA);
   setImages([]);
    setOpenForm(false);
    console.log(finalArrA);
    resetForm();
  };

  const handleSubmitA = (e) => {
    e.preventDefault();
    finalArrR.department_id = ifva.department;
    finalArrR.issue_title = ifva.issueTitle;
    finalArrR.issue_description = ifva.issueDescription;
    finalArrR.issue_location = ifva.location;
    (images.length > 0) ? ifva.issue_image = images[0].data_url : ifva.issue_image = "";
    finalArrR.issuer.issuer_name = "Anonymous";
    finalArrR.issuer.issuer_email = "Anonymous";
    finalArrR.issuer.issuer_phone = "Anonymous";
    // props.createIssue(finalArrR);
    // console.log(props.issueNumber);
    createIssueInline(finalArrR);
    setImages([]);
    setOpenFormA(false);
    console.log(finalArrR);
    resetIfva();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };


  const searchIssueByID = async (ixd) => {
    try {
      var issue = await axios.get(
        "https://localhost:5001/api/issue/issue_id="+ixd
      );
      setSearch(issue.data.issue_id);
      var z = [];
      z.push(issue.data);
      setFindIssue(z);
      //findIssue.push(issue.data);
      // console.log(findIssue);
    } catch (err) {
      console.log(err);
    }


  }

  const fetchAllIssuesInline = async () => {

    try {
      var issues = await axios.get(
        "https://localhost:5001/api/issue"
      );
      console.log(issues);
      setIssueData(issues.data);
      //document.getElementById("tab1").forceUpdate();
    } catch (err) {
      console.log(err);
    }
  }



  const updateIssueStatus = async (us) => {
    console.log(updateStatus);
    try {
      var issue = await axios.post(
        "https://localhost:5001/api/issue/update",us
        
      );
      alert("Issue Status Updated");
      setUpdateFlag(false);

    } catch (err) {
      
    console.log(err);
    }
  }
  const handleIssueSearch = (e) => {
    e.preventDefault();
    console.log(search);
    searchIssueByID(search);
    updateStatus.issue_id = search;
    console.log(updateStatus);
    document.getElementById("search").value = "";
    setOpenSearchIssue(true);
  }

  const handleStatusChange = (e) => {
    e.preventDefault();
    setUpdatedStatus(e.target.value);
    console.log(search);
    updateStatus.issue_id = search;
    updateStatus.issue_status = e.target.value;
    updateStatusFinal.issue_id = updateStatus.issue_id;
    updateStatusFinal.issue_status = updateStatus.issue_status;
    console.log(updateStatus);    
    
    
  }

  const handleCloseSearchIssue = () => {
    setSearch("");
    updateStatus.issue_id = "";
    updateStatus.issue_status = "";
    setOpenSearchIssue(false);
  }

  const handleEditStatus = (e) => {
    e.preventDefault();
    searchIssueByID(e.target.id);
    setOpenSearchIssue(true);    ;
  }

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    const temp = {
      issue_id: 1,
      issue_status : "Closed",
     }
    updateIssueStatus(temp);
    setUpdateFlag(false);
    setOpenSearchIssue(false);
    setSearch("");
    document.getElementById("search").value = "";
  }

  const handleAClose = () => {
    setOpenFormA(false);
    setImages([]);
  }
  const handleRClose = () => {
    setOpenForm(false);
    setImages([]);
  }
  useEffect(() => {
    fetchAllIssuesInline();
  },[]);



 
  return (
    <div>
      {/* <header>
                <div><br></br>
                  <center><img src={Logo} height="50px" width="250px" /></center></div>
                    <div><br></br>
                      <center><h4 className="font">HOME</h4></center>
                    </div><br></br>
            </header> */}
      <Header />
      <br></br>
      <Container>
        {/* <label ><b>LOCATION :</b></label>
                <button id="addNew" type="button" onClick={handlePopupNewOpen} className="btn btn-secondary" style={{  fontSize: "10px" , fontSize: "0.875rem",marginLeft:"10px"}}>
                  Add New
                </button>
                <button type="button" onClick={handlePopupOpen} className="btn btn-secondary" style={{  fontSize: "10px" , fontSize: "0.875rem", marginLeft:"10px"}}> 
                  Add Existing
                </button><br></br><br></br> */}

        <div className="row" >
          <input
          id="search"
            value={search}
            type="text"
            className="form-control"
            placeholder="Search"
            style={{ width: "80%", marginLeft: "10px" }}
            onChange={handleSearchChange}
          />
          <button
            type="button"
            className="btn btn-secondary"
            style={{
              fontSize: "10px",
              fontSize: "0.875rem",
              marginLeft: "10px",
            }}
            onClick={handleIssueSearch}
          >
            search
          </button>
        </div>
        <br></br>

        <div style={{display:"none"}}>
          <center>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleReportIssue}
            >
              Report Issue
            </button>
            {"  "}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleAnonymousComplaint}
            >
              Anonymous complaint
            </button>
          </center>
        </div>
        <br></br>

        <table id="tab1" className="table table-striped">
          <thead>
            <tr>
              <th>Issue No</th>
              <th>Issue Title</th>
              <th>Issue description</th>
              <th>Department</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {issueData.map((issue) => (
              <tr key={issue.issue_id}>
                <td><Link id={issue.issue_id} onClick={handleEditStatus}>{issue.issue_id}</Link></td>
                <td>{issue.issue_title}</td>
                <td>{issue.issue_description}</td>
                <td>{dept[issue.department_id - 1]}</td>
                <td>{issue.issue_status}</td>
                <td>{issue.issue_location}</td>
              </tr>
            ))}
            {/* {loc.map((record,id)=>{ if(showrow == true){return( 
                    <tr key={id}>
                      <td>{index=id+1}</td>
                      <td>{record.label}</td>
                      <td></td>
                      <td>city/town</td>
                      <td></td>
                      <td> <IconButton  aria-label="delete" size="small" onClick={()=>handleDeleteLoc(id)} > <DeleteIcon fontSize="small"   /> </IconButton></td>
                    </tr>)}})} */}
          </tbody>
        </table>
      </Container>
      <br></br>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openForm}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openForm}>
            <div className={classes.paper}>
              <center>
                <h4>Report Issue</h4>
                <br></br>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Name *"
                  required
                  className={"form-control required"}
                  style={{ width: "400px" }}
                />{" "}
                <br></br>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="E-mail *"
                  required
                  className={"form-control required"}
                  style={{ width: "400px" }}
                />{" "}
                <br></br>
                <input
                  type="telephone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="Phone *"
                  required
                  className={"form-control required"}
                  style={{ width: "400px" }}
                />{" "}
                <br></br>
                <input
                  type="text"
                  name="issueTitle"
                  value={values.IssueTitle}
                  onChange={handleChange}
                  placeholder="Issue Title *"
                  required
                  className={"form-control required"}
                  style={{ width: "400px" }}
                />{" "}
                <br></br>
                <select
                  required
                  value={values.department}
                  name="department"
                  placeholder="Department *"
                  onChange={handleChange}
                  className={"form-control required"}
                  style={{ width: "400px" }}
                >
                  <option value={1}>Elelctrical</option>
                  <option value={2}>Road/Transport</option>
                  <option value={3}>Water/Suage</option>
                  <option value={4}>Traffic/Parking</option>
                  <option value={5}>Waste/Dumping</option>
                </select>{" "}
                <br></br>
                <input
                  type="textarea"
                  name="issueDescription"
                  value={values.issueDescription}
                  onChange={handleChange}
                  placeholder="Issue Description *"
                  required
                  className={"form-control required"}
                  style={{ width: "400px" }}
                />{" "}
                <br></br>
                <input
                  type="text"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  placeholder="Location *"
                  required
                  className={"form-control required"}
                  style={{ width: "400px" }}
                />{" "}
                <br></br>
                <div>
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <div className="upload__image-wrapper">
                        <button
                          style={isDragging ? { color: "red" } : undefined}
                          onClick={onImageUpload}
                          className="btn btn-primary"
                          {...dragProps}
                        >
                          Click or Drop here
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-primary"
                          onClick={onImageRemoveAll}
                        >
                          Remove all images
                        </button>
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <br></br>
                            <img src={image["data_url"]} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                              <br></br>
                              <button
                                className="btn btn-primary"
                                onClick={() => onImageUpdate(index)}
                              >
                                Update
                              </button>
                              .
                              <button
                                className="btn btn-primary"
                                onClick={() => onImageRemove(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ImageUploading>
                </div>
                <br></br>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={handleRClose}
                  >
                    Close
                  </button>
                  {"    "}
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      fontSize: "10px",
                      fontSize: "0.875rem",
                      marginRight: "160px",
                    }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </center>
            </div>
          </Fade>
        </Modal>
      </div>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openFormA}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openFormA}>
            <div className={classes.paper}>
              <center>
                {/* <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Name *"
                  required
                  className={"form-control required"}
                  style={{ width: "400px"}}
                />{" "}
                <br></br>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="E-mail *"
                  required
                  className={"form-control required"}
                  style={{ width: "400px" }}
                />{" "}
                <br></br>
                <input
                  type="telephone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="Phone *"
                  required
                  className={"form-control required"}
                  style={{ width: "400px" }}
                />{" "} */}
                <br></br>
                <input
                  type="text"
                  name="issueTitle"
                  value={ifva.issueTitle}
                  onChange={handleIfvaChange}
                  placeholder="Issue Title *"
                  required
                  className={"form-control required"}
                  style={{ width: "400px" }}
                />{" "}
                <br></br>
                <select
                  required
                  value={ifva.department}
                  name="department"
                  placeholder="Department *"
                  onChange={handleIfvaChange}
                  className={"form-control required"}
                  style={{ width: "400px" }}
                >
                  <option value={1}>Select a Department</option>
                  <option value={1}>Elelctrical</option>
                  <option value={2}>Road/Transport</option>
                  <option value={3}>Water/Suage</option>
                  <option value={4}>Traffic/Parking</option>
                  <option value={5}>Waste/Dumping</option>
                </select>{" "}
                <br></br>
                <input
                  type="textarea"
                  name="issueDescription"
                  value={ifva.issueDescription}
                  onChange={handleIfvaChange}
                  placeholder="Issue Description *"
                  required
                  className={"form-control required"}
                  style={{ width: "400px" }}
                />{" "}
                <br></br>
                <input
                  type="text"
                  name="location"
                  value={ifva.location}
                  onChange={handleIfvaChange}
                  placeholder="Location *"
                  required
                  className={"form-control required"}
                  style={{ width: "400px" }}
                />{" "}
                <br></br>
                <div>
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <div className="upload__image-wrapper">
                        <button
                          style={isDragging ? { color: "red" } : undefined}
                          onClick={onImageUpload}
                          className="btn btn-primary"
                          {...dragProps}
                        >
                          Click or Drop here
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-primary"
                          onClick={onImageRemoveAll}
                        >
                          Remove all images
                        </button>
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <br></br>
                            <img src={image["data_url"]} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                              <br></br>
                              <button
                                className="btn btn-primary"
                                onClick={() => onImageUpdate(index)}
                              >
                                Update
                              </button>
                              .
                              <button
                                className="btn btn-primary"
                                onClick={() => onImageRemove(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ImageUploading>
                </div>
                <br></br>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={handleAClose}
                  >
                    Close
                  </button>
                  {"    "}
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      fontSize: "10px",
                      fontSize: "0.875rem",
                      marginRight: "160px",
                    }}
                    onClick={handleSubmitA}
                  >
                    Submit
                  </button>
                </div>
              </center>
            </div>
          </Fade>
        </Modal>
      </div>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openSearchIssue}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openSearchIssue}>
            <div className={classes.paper}>
             
                {findIssue.map((issue) => (
                  <div key={issue.issue_id} style={{justifyContent:"left"}}>
                    <label>Issuer Name : {issue.issuer.issuer_name}</label>
                    <br></br>
                    <label>Issuer Email : {issue.issuer.issuer_email}</label>
                    <br></br>
                    <label>Issue ID: {issue.issue_id}</label>
                    <br></br>
                    <label>Issuer Phone : {issue.issuer.issuer_phone}</label>
                    <br></br>
                    <label>Issue Title : {issue.issue_title}</label>
                    <br></br>
                    <label>Current Issue status : {issue.issue_status}</label>
                    <div style={{display:"inline"}}>
                      <br></br>
                    <label>Update Issue Status :</label><select
                    id="issue_stat"
                  required
                  value={updatedStatus}
                  name="issue_status"
                  placeholder="Issue Status *"
                  onChange={handleStatusChange}
                  className={"form-control required"}
                  style={{ width: "100px" }}
                >
                  <option defaultValue value={"Active"}>Active</option>
                  <option value={"InProgress"}>In Progress</option>
                  <option value={"Closed"}>Closed</option>
                </select>{" "}
                </div>

                    <label>Issue Description : {issue.issue_description}</label>
                    <br></br>
                    <label>Location : {issue.issue_location}</label>
                    <br></br>
                    <label>Department : {dept[issue.department_id - 1]}</label>
                    <br></br>
                    <label>Images : </label>
                    <br></br>                    
                      <img src={issue.issue_image} alt="" width="40%" />
                    
                    </div>
                ))}
                <br></br>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={handleCloseSearchIssue}
                  >
                    Close
                  </button>
                  {"  "}
                  <button
                    type="button"

                    className="btn btn-primary"
                    onClick={handleUpdateStatus}
                  >
                    Update Status
                  </button>
                  
                </div>
              
            </div>
          </Fade>
        </Modal>
      </div>

      <div>
            <Dialog
              fullWidth={true}
              open={alertt}
              onClose={() => setAlertt(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Congrats!</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Complaint has been submitted successfully.
                  Your Issue Number is: {ISSUE_ID}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  className="btn btn-primary"
                  onClick={() => setAlertt(false)}
                  style={{ fontSize: "10px", fontSize: "0.875rem" }}
                >
                  OK
                </button>
                {/* <Button onClick={handleClose} color="primary" autoFocus>
                        Agree
                    </Button> */}
              </DialogActions>
            </Dialog>
          </div>
    </div>
  );
};

export default AdminHome;
