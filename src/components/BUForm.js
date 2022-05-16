///*******************************************************************************************************************///

//  CREATED ON   : 10/11/2020
//  COMPANY NAME : MCT IT SOLUTIONS PVT LTD.
//  PROJECT NAME : MUNILOGIC SETUP BU
//  CREATED BY   : JAY PATEL, ROHIT HADIYA
//  GUIDED BY    : PRAKASH NISHAD, ROHIT HADIYA, NIHAL BHATASANA, MITTAL PANCHAL

///*******************************************************************************************************************///

import React, { useState, useEffect } from "react";
// import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Logo from "../MunilogicLogo.png";
import { connect } from "react-redux";
import useForm from "./useForm";
import useDept from "./useDept";
import useLoc from "./useLoc";
import useDiv from "./useDiv";
import useContact from "./useContact";
import { Multiselect } from "multiselect-react-dropdown";
//import Select from 'react-select';
import axios from "axios";
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteIcon from "@material-ui/icons/Delete";
import * as actions from "../actions/buActions";
import { ProgressBar, Tooltip, OverlayTrigger } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
// import {ThreeDots} from "svg-loaders-react";
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
//import Loader from 'react-loader-spinner'
import { useHistory } from "react-router-dom";
import "../css/Sidebar.css";
import Header from "./Header";
import SignIn from "./SignIn";
import Register from "./Register";
import ImageUploading from "react-images-uploading";

//class declaration and css for popup form in Pages 2,3,4,5
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
///---------------------------------------------------------------///

/// ******************************Global   variable   Declaration******************************* ///

var finalFieldValues; //an array that holds values of objects created from each page
var index;
var buRecords;

var loc = []; // ARRAY FOR STORING SELECTED AWA ADDED LOCATIONS
var fLoc = {}; // OBJECT THAT FINALLY PUSHED IN TO FINAL FIELD VALUES ARRAY
var finalLocValues = []; // REMAINING OPTIONS ARRAY AFTER SELECTING OPTIONS

var dept = []; //ARRAY FOR STORING ADDED DEPARTMENTS
var fDept = {}; // OBJECT THAT FINALLY PUSHED IN TO FINAL FIELD VALUES ARRAY

var divi = []; //ARRAY FOR STORING ADDED DIVISIONS
var fDiv = {}; // OBJECT THAT FINALLY PUSHED IN TO FINAL FIELD VALUES ARRAY

var contact = []; //ARRAY FOR STORING  ADDED CONTACTS
var fCont = {}; // OBJECT THAT FINALLY PUSHED IN TO FINAL FIELD VALUES ARRAY

const finalArr = {
  name: "",
  Phone: "",
  email: "",
  Location: {
    Line1: "",
    Line2: "",
    Line3: "",
    City: "",
    County: "",
    StateProvince: "",
    zip: "",
    Country: "",
  },
};
const finalArrR = {
  name: "",
  Phone: "",
  email: "",
  Location: {
    Line1: "",
    Line2: "",
    Line3: "",
    City: "",
    County: "",
    StateProvince: "",
    zip: "",
    Country: "",
  },
};
const finalArrA = {
  name: "",
  Phone: "",
  email: "",
  Location: {
    Line1: "",
    Line2: "",
    Line3: "",
    City: "",
    County: "",
    StateProvince: "",
    zip: "",
    Country: "",
  },
};

const initialFieldValues = {
  //FIRST PAGE FORM VALUES INIT
  name: "",
  Phone: "",
  email: "",
  Location: {
    Line1: "",
    Line2: "",
    Line3: "",
    City: "",
    County: "",
    StateProvince: "",
    zip: "",
    Country: "",
  },
};

const initialLocValues = {
  // SECOND PAGE POPUP FORM ADD NEW --> VALUES INIT
  label: "",
  ParentLocId: "",
};

const initialDeptValues = {
  // THIRD PAGE POPUP FORM ADD NEW --> VALUES INIT
  deptName: "",
};

const initialDivValues = {
  // FOURTH PAGE POPUP FORM ADD NEW --> VALUES INIT
  divName: "",
};

const initialContactValues = {
  // FIFTH PAGE POPUP FORM ADD NEW --> VALUES INIT
  firstName: "",
  lastName: "",
  email: "",
  userType: "",
};

/// ********************Form declaration********************************* ///

const BUForm = ({ ...props }) => {
  ///form declaration as an object///

  const classes = useStyles();

  const [page, setPage] = useState(1); // hook for page handling
  const [open, setOpen] = useState(false); // hook for add exixting popup form handling in page 2
  const [locDropDown, setLocDropDown] = useState(false); //hook for tentative fix of dropdown problem
  const [openn, setOpenn] = useState(false); // hook for add new popup form handling in page 2
  const [showrow, setShowrow] = useState(false);
  const [alertt, setAlertt] = useState(false);
  const [locAlert, setLocAlert] = useState(false);
  const [deptBut, setDeptBut] = useState(true);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const history = useHistory();

  const { values, setValues, handleChange, resetForm } =
    useForm(initialFieldValues); //custom hook call, handles all the field value changes PAGE 1

  const { locations, setLocations, handleLocChange, resetPopupForm } =
    useLoc(initialLocValues); //custom hook call, handles all the field value changes PAGE 2

  const { div, setDiv, handleDivChange, resetDiv } = useDiv(initialDivValues); //custom hook call, handles all the field value changes PAGE 3

  const { dep, setDep, handleDeptChange, resetDept } =
    useDept(initialDeptValues); //custom hook call, handles all the field value changes PAGE 4

  const { cont, setCont, handleContChange, resetCont } =
    useContact(initialContactValues); //custom hook call, handles all the field value changes PAGE 5

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  var blobURL;
var fileName;

// Convert a base64 string into a binary Uint8 Array 
// https://gist.github.com/borismus/1032746
function convertDataURIToBinary(dataURI) {
	var BASE64_MARKER = ';base64,';
	var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
	var base64 = dataURI.substring(base64Index);
	var raw = window.atob(base64);
	var rawLength = raw.length;
	var array = new Uint8Array(new ArrayBuffer(rawLength));

	for(i = 0; i < rawLength; i++) {
		array[i] = raw.charCodeAt(i);
	}
	return array;
}

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  /// ****************************************General Functions*********************************** ///

  useEffect(() => {
    // Hook that Performs operations on page load
    // props.fetchAllBU();
  }, []);

  buRecords = props.buList;

  const handleSetup = () => {
    history.push("SetupBU");
  };

  const handleHome = () => {
    history.push("/");
  };

  const goToNextPage = () => {
    //navigate to next page
    setPage(page + 1);
  };

  const goToPrevPage = () => {
    //navigate to previous page
    setPage(page - 1);
    //   if(page==3){
    //   var tab = document.getElementById("tab2");
    //   if(tab.rows.length < 2){
    //     document.getElementById("addNewDept").disabled = true;
    //   }
    // }
  };

  const handleNext = (e) => {
    //handles Next button click
    e.preventDefault();

    if (page == 2) {
      fLoc = Object.assign({}, loc); //array to object conversion
      if (Object.keys(fLoc).length !== 0) {
        finalFieldValues.push(fLoc);
      }
      var table = document.getElementById("tab1");
      if (table.rows.length > 1) {
        goToNextPage();
      } else {
        // alert("add atleast one Location" );
        setAlertt(true);
      }
    }

    if (page == 3) {
      fDept = Object.assign({}, dept);
      if (Object.keys(fDept).length !== 0) {
        finalFieldValues.push(fDept);
      }
      var table = document.getElementById("tab2");
      if (table.rows.length > 1) {
        goToNextPage();
      } else {
        // alert("add atleast one Department");
        setAlertt(true);
      }
    }

    if (page == 4) {
      fDiv = Object.assign({}, divi);
      if (Object.keys(fDiv).length !== 0) {
        finalFieldValues.push(fDiv);
      }
      var table = document.getElementById("tab3");
      if (table.rows.length > 1) {
        goToNextPage();
      } else {
        // alert("add atleast one Division");
        setAlertt(true);
      }
    }

    if (page == 5) {
      fCont = Object.assign({}, contact);
      if (Object.keys(fCont).length !== 0) {
        finalFieldValues.push(fCont);
      }
      var table = document.getElementById("tab4");

      if (table.rows.length > 1) {
        finalArr.BusinessUnitName = finalFieldValues[0].name;
        finalArr.ParentBusinessUnitId = finalFieldValues[0].parentBu;
        finalArr.BaseUrl = finalFieldValues[0].baseUrl;
        // finalArr.Division = finalFieldValues[0].division;
        // finalArr.MainPhone = finalFieldValues[0].mainPhone;
        // finalArr.OtherPhone = finalFieldValues[0].otherPhone;
        // finalArr.OtherPhone2 = finalFieldValues[0].otherPhone2;
        // finalArr.Fax = finalFieldValues[0].fax;
        // finalArr.Email = finalFieldValues[0].email;
        // finalArr.WebSite = finalFieldValues[0].website;
        // finalArr.Facebook = finalFieldValues[0].facebook;
        // finalArr.Twitter = finalFieldValues[0].twitter;
        // finalArr.LinkedIn = finalFieldValues[0].linkedin;
        // finalArr.Instagram = finalFieldValues[0].instagram;
        // finalArr.Address.Line1 = finalFieldValues[0].street1;
        // finalArr.Address.Line2 = finalFieldValues[0].street2;
        // finalArr.Address.Line3 = finalFieldValues[0].street3;
        // finalArr.Address.City = finalFieldValues[0].city;
        // finalArr.Address.County = finalFieldValues[0].county;
        // finalArr.Address.StateProvince = finalFieldValues[0].state;
        // finalArr.Address.PostalCode = finalFieldValues[0].zip;
        // finalArr.Address.Country = finalFieldValues[0].country;

        for (
          var i = 0;
          i < loc.length;
          i++ //sets locations in final object
        ) {
          if (
            loc[i].hasOwnProperty("ParentLocId") &&
            loc[i].hasOwnProperty("label")
          ) {
            const temp = {
              LocationName: loc[i].label,
              ParentLocationId: loc[i].ParentLocId,
            };

            finalArr.Locations.push(temp);
          } else {
            const temp = {
              LocationId: loc[i].value,
              LocationName: loc[i].label,
            };
            finalArr.Locations.push(temp);
          }
        }

        finalArr.Departments.DepartmenntName = dept[0].deptName; //sets department and Division in final object
        for (var i = 0; i < divi.length; i++) {
          const temp = {
            DivisionName: divi[i].divName,
          };
          finalArr.Departments.Divisions.push(temp);
        }

        for (var i = 0; i < contact.length; i++) {
          //sets contact in final object
          const temp = {
            FirstName: contact[i].firstName,
            LastName: contact[i].lastName,
            Email: contact[i].email,
            UserType: contact[i].userType,
          };
          finalArr.Contacts.push(temp);
        }

        const onSuccess = () => {
          goToNextPage();
        };

        const onFailure = () => {
          goToNextPage();
          goToNextPage();
        };
        // createBusinessUnit(finalArr);
        //props.createBU(finalArr,onSuccess,onFailure);
      } else {
        // alert("add atleast one Contact");
        setAlertt(true);
      }
      var str = JSON.stringify(finalArr);
      console.log(str);
    }
    console.log(finalFieldValues);
  };

  const handlePrevious = (e) => {
    //handles previous button click
    e.preventDefault();
    if (page == 2) {
      goToPrevPage();
    }
    if (page == 3) {
      finalFieldValues.splice(1, 1);
      goToPrevPage();
    }

    if (page == 4) {
      finalFieldValues.splice(2, 1);
      goToPrevPage();
    }
    if (page == 5) {
      finalFieldValues.splice(3, 1);
      goToPrevPage();
    }
  };

  useEffect(() => {
    // Hook that Performs operations on page change
    if (page == 2) {
      props.fetchLoc();
      props.fetchPBuLoc();
    }

    if (page == 5) {
      props.fetchUser();
    }
  }, [page]);

  /// ***********************************Functions For Page 1********************************* ///
  var tempLoc = [];
  const handleSubmit = (e) => {
    // handles BUform page1 submit
    e.preventDefault();
    sendBUCheckRequest(values.name);
  };

  const sendBUCheckRequest = async (nm) => {
    // CUSTOM API CALL TO CHECK EXISTANCE OF NEW ADDED BU IN DB
    try {
      var chkResponse = await axios.get(
        "https://devapi.mctapps.in/BusinessUnitSetting/CheckBU?name=" + nm
      );
      console.log(chkResponse.data.Status);
      if (chkResponse.data.Status == 1) {
        setAlertt(true);
      } else if (chkResponse.data.Status == 0) {
        finalFieldValues = [values];
        goToNextPage();
        console.log(finalFieldValues);
      }
      // data1.push(chkResponse.data);
      // console.log(data1[0].Status);
    } catch (err) {
      console.log(err);
    }
  };  

  /// ***********************************Functions For Page 2********************************* ///

  var options = [
    props.locList.map((record) => {
      return { value: record.Id, label: record.Name };
    }),
  ]; //OPTIONS ARRAY -->PAGE2 POPUP ADD EXISTING

  const handlePopupNewOpen = () => {
    //handles add new popup form opening
    setOpenn(true);
  };

  const handlePopupNewClose = () => {
    //handles add new popup form closing
    setOpenn(false);
    resetPopupForm();
  };

  const handlePopupOpen = () => {
    //handles popup form opening
    setOpen(true);
  };

  const handlePopupClose = () => {
    //handles popup form closing
    tempLoc = [];
    setOpen(false);
  };

  const onSelect = (selectedList, selectedItem) => {
    //handles select dropdown page2,adds selected options to array
    tempLoc.push(selectedItem);
    //loc.push(selectedItem);
    //finalLocValues = options[0].filter(o => !loc.find(o2 => o.value === o2.value));
  };

  const onRemove = (selectedList, removedItem) => {
    //handles select dropdown page2, removes deselected options from array
    const i = tempLoc.indexOf(removedItem);
    tempLoc.splice(i, 1);
  };

  const handleSave = (e) => {
    //HANDLES SAVE BUTTON EVENT PAGE2 --> POPUP --> ADD EXISTING
    //console.log(locations);
    e.preventDefault();
    for (var i = 0; i < tempLoc.length; i++) {
      loc.push(tempLoc[i]);
    }
    tempLoc = [];
    finalLocValues = options[0].filter(
      (o) => !loc.find((o2) => o.value === o2.value)
    );
    setLocDropDown(true);
    console.log(finalLocValues);
    setOpen(false);
    setShowrow(true);
    console.log(loc);
  };

  const sendCustomGetRequest = async (nm) => {
    // CUSTOM API CALL TO CHECK EXISTANCE OF NEW ADDED LOCATION IN DB
    try {
      var chkResponse = await axios.get(
        "https://devapi.mctapps.in/Location/CheckLocationWithBU?name=" + nm
      );
      console.log(chkResponse.data.Status);
      if (chkResponse.data.Status == 1) {
        // alert(chkResponse.data.Message + " Can Not Be Added As A New Location." );
        setLocAlert(true);
      } else if (chkResponse.data.Status == 0) {
        loc.push(locations);
        setOpenn(false);
        console.log(loc);
      }
      // data1.push(chkResponse.data);
      // console.log(data1[0].Status);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveNew = (e) => {
    //HANDLES SAVE BUTTON EVENT PAGE2 --> POPUP --> ADD NEW
    //console.log(locations);
    // props.checkLoc(locations.label);
    e.preventDefault();
    sendCustomGetRequest(locations.label);
    setShowrow(true);
    //   if(data1[0].Status == 1){
    //   alert(data1[0].Message);
    // }
    // else {  loc.push(locations); setOpenn(false); }
    resetPopupForm();
    console.log(loc);
  };

  const handleDeleteLoc = (id) => {
    let temp = [...loc];
    let deleted_value = temp.splice(id, 1);
    loc = [];
    for (var i = 0; i < temp.length; i++) {
      loc.push(temp[i]);
    }
    if (deleted_value[0].hasOwnProperty("value")) {
      finalLocValues.push(deleted_value[0]);
    }
    console.log(deleted_value);
    console.log(loc);
    setDeleteAlert(true);
  };

  /// *********************************Functions For Page 3*******************************************///

  const handleSaveDept = (e) => {
    //HANDLES SAVE BUTTON EVENT PAGE 4 --> POPUP --> ADD NEW
    e.preventDefault();
    var table = document.getElementById("tab2");
    if (table.rows.length < 2) {
      dept.push(dep);
      setDeptBut(false);
      //document.getElementById("addNewDept").disabled = true;
    }
    setOpen(false);
    resetDept();
  };

  const handleDeptOpen = () => {
    setOpen(true);
  };

  const handleDeptClose = () => {
    setOpen(false);
    resetDept();
  };

  const handleDeleteDept = (id) => {
    let temp = [...dept];
    let deleted_value = temp.splice(id, 1);
    dept = [];
    for (var i = 0; i < temp.length; i++) {
      dept.push(temp[i]);
    }
    console.log(deleted_value);
    console.log(dept);
    setDeptBut(true);
    setDeleteAlert(true);
  };

  /// *********************************Functions For Page 4*******************************************///
  const handleSaveDiv = (e) => {
    //HANDLES SAVE BUTTON EVENT PAGE 3 --> POPUP --> ADD NEW
    e.preventDefault();
    divi.push(div);
    setOpen(false);
    resetDiv();
  };

  const handleCloseDiv = (e) => {
    //HANDLES CLOSE BUTTON EVENT PAGE 3 --> POPUP --> ADD NEW
    e.preventDefault();
    setOpen(false);
    resetDiv();
  };

  const handleDeleteDiv = (id) => {
    let temp = [...divi];
    let deleted_value = temp.splice(id, 1);
    divi = [];
    for (var i = 0; i < temp.length; i++) {
      divi.push(temp[i]);
    }
    console.log(deleted_value);
    console.log(divi);
    setDeleteAlert(true);
  };

  /// *********************************Functions For Page 5*******************************************///

  //var userOptions = [ props.userList.map((record)=>{return({value: record.Value , label: record.Name})})]   //OPTIONS ARRAY -->PAGE2 POPUP ADD EXISTING

  // const onSelectUser = (selectedList, selectedItem)=>{  //handles select dropdown page5,adds selected options to array
  //   console.log(selectedItem);
  //   if(selectedList.length > 0){
  //   cont.userType = selectedList ;}

  // }

  // const onRemoveUser = (selectedList, removedItem)=>{   //handles select dropdown page5, removes deselected options from array
  //   const i = contact.indexOf(removedItem);
  //   contact.splice(i,1);
  // }

  const handleSaveCont = (e) => {
    //HANDLES SAVE BUTTON EVENT PAGE 5 --> POPUP --> ADD NEW
    e.preventDefault();
    contact.push(cont);
    setOpen(false);
    resetCont();
  };

  const handleCloseCont = (e) => {
    //HANDLES CLOSE BUTTON EVENT PAGE 5 --> POPUP --> ADD NEW
    e.preventDefault();
    setOpen(false);
    resetCont();
  };

  const handleDeleteCont = (id) => {
    let temp = [...contact];
    let deleted_value = temp.splice(id, 1);
    contact = [];
    for (var i = 0; i < temp.length; i++) {
      contact.push(temp[i]);
    }
    console.log(deleted_value);
    console.log(contact);
    setDeleteAlert(true);
  };

  // const createBusinessUnit= async (data)=>{      // CUSTOM API CALL TO CHECK EXISTANCE OF NEW ADDED LOCATION IN DB
  //   try{

  //    const send = await axios.post('https://devapi.mctapps.in/BusinessUnitSetting/CreateBusinessUnit/' , data );
  //    console.log(send);
  //       // console.log(chkResponse.data.Status);
  //       // if(chkResponse.data.Status == 1){
  //       //   alert(chkResponse.data.Message + " Can Not Be Added As A New Location." );
  //       // }
  //       // else if(chkResponse.data.Status == 0) {   loc.push(locations); setOpenn(false);console.log(loc); alert( "New Location added Successfully." );   }
  //       // // data1.push(chkResponse.data);
  //       // console.log(data1[0].Status);

  //    }catch(err){
  //     console.log(err);
  //   }
  // };

  if (buRecords.length > 0) {
    for (var i = 0; i < buRecords.length; i++)
      if (buRecords[i].IsDefault) {
        initialFieldValues.baseUrl = buRecords[i].BaseURL;
        initialFieldValues.parentBu = buRecords[i].BusinessUnitId;
      }
  }

  const handleRegister = () => {
    history.push("Register");
  };

  //debugger;

  return (
    <div>
      {/* <div class="sidenav" style={{width:"300px"}}>
                <div style={{marginTop:"150px"}}> 
                <button type="button" className="btn btn-link" onClick={handleHome}  >Home</button><br></br>
                <button type="button" className="btn btn-link" onClick={handleSetup} style={{marginTop:"-30px"}}>Setup BU</button><br></br>
            </div>
            </div> */}

      {/* ******************BUFORM*****************PAGE 1 starts here*******************BUFORM**************** */}
      {page == 1 ? (
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Header />
          <br></br>
          <br></br>
          <center>
            <h6 style={{ marginRight: "160px" }}>Please fill in your data</h6>
          </center>
          <br></br>

          <div>
            <Dialog
              fullWidth={true}
              open={alertt}
              onClose={() => setAlertt(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">WARNING</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  A Business Unit with that name already exists, can not create
                  a new one.
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

          {/* <input type="text" name="street1" value={values.street1} onChange={handleChange} placeholder="Street1" className={"form-control required"} style={{width:"400px",marginLeft:"700px"}}/>
                <input type="text" name="name" value={values.name} onChange={handleChange} placeholder="Name *" required className={"form-control required"} style={{width:"400px",marginTop:"-35px",marginLeft:"110px"}} /><br></br>
                  
                <input type="text" name="street2" value={values.street2} onChange={handleChange} placeholder="Street2"  className={"form-control required"} style={{width:"400px",marginLeft:"700px",marginTop:"-10px",marginBottom:"8px"}}/>
                
                <br></br>
            
                <input type="text" name="street3" value={values.street3} onChange={handleChange} placeholder="Street3"  className={"form-control required"} style={{width:"400px",marginLeft:"700px",marginTop:"-15px"}}/>    
                
                <select required value={values.BusinessUnitId} name="parentBu" placeholder="Parent BU" onChange={handleChange} className={"form-control required"} style={{width:"400px",marginTop:"-90px",marginLeft:"110px"}}> 
                  <option value=''>{"Select Parent BU*"}</option>{buRecords.map((record,id) => { return(<option key ={id} value={record.BusinessUnitId}>{record.BusinessUnitName}</option>)})}
                </select >         
              
                <input key={index} type="url" name="baseUrl" value={values.baseUrl} onChange={handleChange} placeholder="Base URL *" pattern="https?://.+" required className={"form-control required"} style={{width:"400px",marginTop:"15px",marginLeft:"110px"}}/><br></br>

                <input type="url" name="baseUrl" value={props.buList.map((record,index)=> {if(index == 2){ return( record.BaseURL)}})} onChange={handleChange} placeholder="Base URL *" pattern="https?://.+" required className={"form-control required"} style={{width:"400px",marginTop:"10px",marginLeft:"110px"}}/><br></br>  
                                                                                      
                <input type="text" name="city" value={values.city} onChange={handleChange} placeholder="City"  className={"form-control required"} style={{width:"400px",marginTop:"15px",marginLeft:"700px"}}/>
                
                <input type="text" name="division" value={values.divison} onChange={handleChange} placeholder="Division"  className={"form-control required"} style={{width:"400px",marginTop:"-35px",marginLeft:"110px"}}/><br></br>
                
                <input type="text" name="state" value={values.state} onChange={handleChange} placeholder="State/Province"  className={"form-control required"} style={{width:"400px",marginTop:"-10px",marginLeft:"700px"}}/>
                
                <input type="tel" name="mainPhone" value={values.mainPhone} onChange={handleChange} placeholder="Main Phone"  className={"form-control required"} maxLength="10" style={{width:"400px",marginTop:"-35px",marginLeft:"110px"}}/><br></br>
                
                <input type="text" name="county" value={values.county} onChange={handleChange} placeholder="County"  className={"form-control required"} style={{width:"400px",marginTop:"-10px",marginLeft:"700px"}}/>
                
                <input type="tel" name="otherPhone" value={values.otherPhone} onChange={handleChange} placeholder="Other Phone" className={"form-control required"} maxLength="10" style={{width:"400px",marginTop:"-35px",marginLeft:"110px"}}/><br></br>
                
                <input type="text" name="zip" value={values.zip} onChange={handleChange} placeholder="Zip/Postal Code"  className={"form-control required"} style={{width:"400px",marginTop:"-10px",marginLeft:"700px"}}/>
                
                <input type="text" name="fax" value={values.fax} onChange={handleChange} placeholder="Fax" className={"form-control required"} style={{width:"400px",marginTop:"-35px",marginLeft:"110px"}}/><br></br>
                
                <input type="text" name="country" value={values.country} onChange={handleChange} placeholder="Country/Region"  className={"form-control required"} style={{width:"400px",marginTop:"-10px",marginLeft:"700px"}}/>
                
                <input type="email" name="email" value={values.email} onChange={handleChange} placeholder="Email" className={"form-control required"} style={{width:"400px",marginTop:"-35px",marginLeft:"110px"}}/><br></br>
                
                <input type="text" name="website" value={values.website} onChange={handleChange} placeholder="Web Site"className={"form-control required"} style={{width:"400px",marginLeft:"110px"}}/><br></br>
                
                <input type="text" name="facebook" value={values.facebook} onChange={handleChange} placeholder="Facebook" className={"form-control required"} style={{width:"400px",marginLeft:"110px"}}/><br></br>
                
                <input type="text" name="twitter" value={values.twitter} onChange={handleChange} placeholder="Twitter" className={"form-control required"} style={{width:"400px",marginLeft:"110px"}}/><br></br>
                
                <input type="text" name="linkedin" value={values.linkedin} onChange={handleChange} placeholder="LinkedIn" className={"form-control required"} style={{width:"400px",marginLeft:"110px"}}/><br></br>
                
                <input type="text" name="instagram" value={values.instagram} onChange={handleChange} placeholder="Instagram" className={"form-control required"} style={{width:"400px",marginLeft:"110px"}}/><br></br>

                <input type="text" name="otherPhone2" value={values.otherPhone2} onChange={handleChange} placeholder="Other Phone2" className={"form-control required"} style={{width:"400px",marginLeft:"110px"}}/><br></br><br></br>       */}

          <center>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Name *"
              required
              className={"form-control required"}
              style={{ width: "400px", marginRight: "160px" }}
            />{" "}
            <br></br>
            <select
              required
              value={values.BusinessUnitId}
              name="parentBu"
              placeholder="Parent BU"
              onChange={handleChange}
              className={"form-control required"}
              style={{ width: "400px", marginRight: "160px" }}
            >
              {buRecords.map((record, id) => {
                return (
                  <option key={id} value={record.BusinessUnitId}>
                    {record.BusinessUnitName}
                  </option>
                );
              })}
            </select>{" "}
            <br></br>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Name *"
              required
              className={"form-control required"}
              style={{ width: "400px", marginRight: "160px" }}
            />{" "}
            <br></br>
            <input
              type="email"
              name="email"
              value={values.name}
              onChange={handleChange}
              placeholder="E-mail *"
              required
              className={"form-control required"}
              style={{ width: "400px", marginRight: "160px" }}
            />{" "}
            <br></br>
            <input
              type="telephone"
              name="phone"
              value={values.name}
              onChange={handleChange}
              placeholder="Phone *"
              required
              className={"form-control required"}
              style={{ width: "400px", marginRight: "160px" }}
            />{" "}
            <br></br>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Name *"
              required
              className={"form-control required"}
              style={{ width: "400px", marginRight: "160px" }}
            />{" "}
            <br></br>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Name *"
              required
              className={"form-control required"}
              style={{ width: "400px", marginRight: "160px" }}
            />{" "}
            <br></br>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Name *"
              required
              className={"form-control required"}
              style={{ width: "400px", marginRight: "160px" }}
            />{" "}
            <br></br>
            <input
              key={index}
              required
              type="url"
              name="baseUrl"
              value={values.baseUrl}
              onChange={handleChange}
              placeholder="Base URL *"
              pattern="https?://.+"
              className={"form-control required"}
              style={{ width: "400px", marginRight: "160px" }}
            />
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
                <div className="upload__image-wrapper" style={{marginRight:"150px"}}>
                  
                  <button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    className="btn btn-primary"
                    {...dragProps}
                  >
                    Click or Drop here
                  </button>
                  &nbsp;
                  <button className="btn btn-primary" onClick={onImageRemoveAll}>Remove all images</button>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item"><br></br>
                      <img src={image["data_url"]} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                      <br></br>
                        <button className="btn btn-primary" onClick={() => onImageUpdate(index)}>
                          Update
                        </button>
                        .
                        <button className="btn btn-primary" onClick={() => onImageRemove(index)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                 
                </div>
              )}
            </ImageUploading>
            
            </div>
          </center>
<br></br>
          <div>
            <center>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  fontSize: "10px",
                  fontSize: "0.875rem",
                  marginRight: "160px",
                }}
                onSubmit={handleSubmit}
              >
                Next
              </button>
            </center>{" "}
            <br></br>
          </div>
        </form>
      ) : null}

      {/* ***********LOCATION**************PAGE 2 Starts Here***************LOCATION*****************  */}

      {page == 2 ? (
        <div style={{ marginLeft: "160px" }}>
          <header className="head">
            <div>
              <br></br>
              <center>
                <img
                  src={Logo}
                  height="50px"
                  width="250px"
                  style={{ marginRight: "160px" }}
                />
              </center>
            </div>
            <div>
              <br></br>
              <center>
                <h4 className="font" style={{ marginRight: "160px" }}>
                  SetUp Business Unit
                </h4>
              </center>
            </div>
            <br></br>
            <ProgressBar now={20} />
          </header>
          <br></br>
          <br></br>

          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openn}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openn}>
                <div className={classes.paper}>
                  <center>
                    <h5>Add New Location</h5>
                  </center>
                  <form autoComplete="off" onSubmit={handleSaveNew}>
                    <input
                      type="text"
                      name="label"
                      required
                      value={locations.label}
                      onChange={handleLocChange}
                      placeholder="Location Name"
                      className={"form-control required"}
                    />
                    <br></br>
                    <select
                      name="ParentLocId"
                      value={locations.ParentLocId}
                      required
                      onChange={handleLocChange}
                      className={"form-control required"}
                    >
                      <option value="">{"Select Parent Location ID"}</option>
                      {props.PBuLocList.map((record, id) => {
                        return (
                          <option key={id} value={record.Id}>
                            {record.Name}
                          </option>
                        );
                      })}
                    </select>
                    <br></br>

                    {/* <Select  options={options[0]} isMulti  /> */}
                    {/* <Multiselect options={options[0]}  onSelect={onSelect}  onRemove={onRemove} displayValue="label" /> */}
                    <br></br>
                    <center>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onSubmit={handleSaveNew}
                      >
                        Save
                      </button>{" "}
                      .{" "}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handlePopupNewClose}
                      >
                        close
                      </button>
                    </center>
                  </form>
                </div>
              </Fade>
            </Modal>
          </div>

          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <center>
                    <h5>Add Existing Location</h5>
                  </center>
                  {/* <Select  options={options[0]} isMulti  /> */}
                  {locDropDown == false ? (
                    <Multiselect
                      options={options[0]}
                      onSelect={onSelect}
                      onRemove={onRemove}
                      displayValue="label"
                    />
                  ) : (
                    <Multiselect
                      options={finalLocValues}
                      onSelect={onSelect}
                      onRemove={onRemove}
                      displayValue="label"
                    />
                  )}
                  <br></br>
                  <center>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleSave}
                    >
                      Save
                    </button>{" "}
                    .{" "}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handlePopupClose}
                    >
                      close
                    </button>
                  </center>
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
              <DialogTitle id="alert-dialog-title">WARNING</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Add atleast one Location to this Business Unit.
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

          <div>
            <Dialog
              fullWidth={true}
              open={locAlert}
              onClose={() => setLocAlert(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">WARNING</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This Location is already linked with another Business Unit.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  className="btn btn-primary"
                  onClick={() => setLocAlert(false)}
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

          <div>
            <Dialog
              fullWidth={true}
              open={deleteAlert}
              onClose={() => setDeleteAlert(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">ACKNOWLEDGEMENT</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Location deleted sucessfully.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  className="btn btn-primary"
                  onClick={() => setDeleteAlert(false)}
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

          <Container>
            <label>
              <b>LOCATION :</b>
            </label>
            <button
              id="addNew"
              type="button"
              onClick={handlePopupNewOpen}
              className="btn btn-secondary"
              style={{
                fontSize: "10px",
                fontSize: "0.875rem",
                marginLeft: "10px",
              }}
            >
              Add New
            </button>
            <button
              type="button"
              onClick={handlePopupOpen}
              className="btn btn-secondary"
              style={{
                fontSize: "10px",
                fontSize: "0.875rem",
                marginLeft: "10px",
              }}
            >
              Add Existing
            </button>
            <br></br>
            <br></br>

            <table id="tab1" className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Business Unit Name</th>
                  <th>Type</th>
                  <th>Created On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loc.map((record, id) => {
                  if (showrow == true) {
                    return (
                      <tr key={id}>
                        <td>{(index = id + 1)}</td>
                        <td>{record.label}</td>
                        <td></td>
                        <td>city/town</td>
                        <td></td>
                        <td>
                          {" "}
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => handleDeleteLoc(id)}
                          >
                            {" "}
                            <DeleteIcon fontSize="small" />{" "}
                          </IconButton>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </Container>
          <br></br>

          <center>
            <button
              type="button"
              className="btn btn-primary"
              style={{ fontSize: "10px", fontSize: "0.875rem" }}
              onClick={handlePrevious}
            >
              Previous
            </button>{" "}
            .{" "}
            <button
              type="button"
              className="btn btn-primary"
              style={{
                fontSize: "10px",
                fontSize: "0.875rem",
                marginRight: "160px",
              }}
              onClick={handleNext}
            >
              Next
            </button>
          </center>
        </div>
      ) : null}

      {/*  **************DEPT*****************PAGE 3 Starts Here*****************DEPT*****************  */}

      {page == 3 ? (
        <div style={{ marginLeft: "160px" }}>
          <header className="head">
            <div>
              <br></br>
              <center>
                <img
                  src={Logo}
                  height="50px"
                  width="250px"
                  style={{ marginRight: "160px" }}
                />
              </center>
            </div>
            <div>
              <br></br>
              <center>
                <h4 className="font" style={{ marginRight: "160px" }}>
                  SetUp Business Unit
                </h4>
              </center>
            </div>
            <br></br>
            <ProgressBar now={40} />
          </header>
          <br></br>
          <br></br>

          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <center>
                    <h5>Add New Department</h5>
                  </center>
                  <form autoComplete="off" onSubmit={handleSaveDept}>
                    <input
                      type="text"
                      name="deptName"
                      required
                      value={dep.deptName}
                      onChange={handleDeptChange}
                      placeholder="Department Name"
                      className={"form-control required"}
                    />
                    <br></br>
                    <center>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onSubmit={handleSaveDept}
                      >
                        Save
                      </button>{" "}
                      .{" "}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleDeptClose}
                      >
                        close
                      </button>
                    </center>
                  </form>
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
              <DialogTitle id="alert-dialog-title">WARNING</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Add a Department to this Business Unit.
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
          <div>
            <Dialog
              fullWidth={true}
              open={deleteAlert}
              onClose={() => setDeleteAlert(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">ACKNOWLEDGEMENT</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Department deleted sucessfully.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  className="btn btn-primary"
                  onClick={() => setDeleteAlert(false)}
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

          <Container>
            <label>
              <b>DEPARTMENT :</b>
            </label>
            {deptBut == true ? (
              <button
                id="addNewDept"
                type="button"
                onClick={handleDeptOpen}
                className="btn btn-secondary"
                style={{
                  fontSize: "10px",
                  fontSize: "0.875rem",
                  marginLeft: "10px",
                }}
              >
                Add New
              </button>
            ) : (
              <button
                id="addNewDept"
                disabled
                type="button"
                onClick={handleDeptOpen}
                className="btn btn-secondary"
                style={{
                  fontSize: "10px",
                  fontSize: "0.875rem",
                  marginLeft: "10px",
                }}
              >
                Add New
              </button>
            )}{" "}
            <br></br> <br></br>
            <table id="tab2" className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Business Unit Name</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {dept.map((record, id) => {
                  return (
                    <tr key={id}>
                      <td>{(index = id + 1)}</td>
                      <td>{record.deptName}</td>
                      <td></td>
                      <td>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => handleDeleteDept(id)}
                        >
                          {" "}
                          <DeleteIcon fontSize="small" />{" "}
                        </IconButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Container>
          <br></br>

          <center>
            <button
              type="button"
              className="btn btn-primary"
              style={{ fontSize: "10px", fontSize: "0.875rem" }}
              onClick={handlePrevious}
            >
              Previous
            </button>{" "}
            .{" "}
            <button
              type="button"
              className="btn btn-primary"
              style={{
                fontSize: "10px",
                fontSize: "0.875rem",
                marginRight: "160px",
              }}
              onClick={handleNext}
            >
              Next
            </button>
          </center>
        </div>
      ) : null}

      {/* ***************DIV****************PAGE 4 Starts Here*****************DIV******************** */}

      {page == 4 ? (
        <div style={{ marginLeft: "160px" }}>
          <header className="head">
            <div>
              <br></br>
              <center>
                <img
                  src={Logo}
                  height="50px"
                  width="250px"
                  style={{ marginRight: "160px" }}
                />
              </center>
            </div>
            <div>
              <br></br>
              <center>
                <h4 className="font" style={{ marginRight: "160px" }}>
                  SetUp Business Unit
                </h4>
              </center>
            </div>
            <br></br>
            <ProgressBar now={60} />
          </header>
          <br></br>
          <br></br>
          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <center>
                    <h5>Add New Division</h5>
                  </center>
                  <form autoComplete="off" onSubmit={handleSaveDiv}>
                    <input
                      type="text"
                      name="divName"
                      required
                      value={div.divName}
                      onChange={handleDivChange}
                      placeholder="Division Name"
                      className={"form-control required"}
                    />
                    <br></br>
                    <br></br>
                    <center>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onSubmit={handleSaveDiv}
                      >
                        Save
                      </button>{" "}
                      .{" "}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCloseDiv}
                      >
                        close
                      </button>
                    </center>
                  </form>
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
              <DialogTitle id="alert-dialog-title">WARNING</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Add atleast one Division to this Business Unit.
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

          <div>
            <Dialog
              fullWidth={true}
              open={deleteAlert}
              onClose={() => setDeleteAlert(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">ACKNOWLEDGEMENT</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Division deleted sucessfully.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  className="btn btn-primary"
                  onClick={() => setDeleteAlert(false)}
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

          <Container>
            <label>
              <b>DIVISION :</b>
            </label>
            <button
              id="addNewDiv"
              type="button"
              onClick={() => setOpen(true)}
              className="btn btn-secondary"
              style={{
                fontSize: "10px",
                fontSize: "0.875rem",
                marginLeft: "10px",
              }}
            >
              Add New
            </button>{" "}
            <br></br> <br></br>
            <table id="tab3" className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Business Unit Name</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {divi.map((record, id) => {
                  return (
                    <tr key={id}>
                      <td>{(index = id + 1)}</td>
                      <td>{record.divName}</td>
                      <td></td>
                      <td>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => handleDeleteDiv(id)}
                        >
                          {" "}
                          <DeleteIcon fontSize="small" />{" "}
                        </IconButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Container>
          <br></br>

          <center>
            <button
              type="button"
              className="btn btn-primary"
              style={{ fontSize: "10px", fontSize: "0.875rem" }}
              onClick={handlePrevious}
            >
              Previous
            </button>{" "}
            .{" "}
            <button
              type="button"
              className="btn btn-primary"
              style={{
                fontSize: "10px",
                fontSize: "0.875rem",
                marginRight: "160px",
              }}
              onClick={handleNext}
            >
              Next
            </button>
          </center>
        </div>
      ) : null}

      {/*  **************CONTACT*****************PAGE 5 Starts Here*****************CONTACT*****************   */}

      {page == 5 ? (
        <div style={{ marginLeft: "160px" }}>
          <header className="head">
            <div>
              <br></br>
              <center>
                <img
                  src={Logo}
                  height="50px"
                  width="250px"
                  style={{ marginRight: "160px" }}
                />
              </center>
            </div>
            <div>
              <br></br>
              <center>
                <h4 className="font" style={{ marginRight: "160px" }}>
                  SetUp Business Unit
                </h4>
              </center>
            </div>
            <br></br>
            <ProgressBar now={80} />
          </header>
          <br></br>
          <br></br>

          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <center>
                    <h5>Add New Contact</h5>
                  </center>
                  <form autoComplete="off" onSubmit={handleSaveCont}>
                    <input
                      type="text"
                      name="firstName"
                      value={cont.firstName}
                      required
                      onChange={handleContChange}
                      placeholder="First Name"
                      className={"form-control required"}
                    />
                    <br></br>
                    <input
                      type="text"
                      name="lastName"
                      value={cont.lastName}
                      required
                      onChange={handleContChange}
                      placeholder="Last Name"
                      className={"form-control required"}
                    />
                    <br></br>
                    <input
                      type="email"
                      name="email"
                      value={cont.email}
                      required
                      onChange={handleContChange}
                      placeholder="Email"
                      className={"form-control required"}
                    />
                    <br></br>
                    <select
                      name="userType"
                      value={cont.userType}
                      required
                      onChange={handleContChange}
                      className={"form-control required"}
                    >
                      <option value="">{"Select User Type"}</option>
                      {props.userList.map((record, id) => {
                        return (
                          <option key={id} value={record.Value}>
                            {record.Name}
                          </option>
                        );
                      })}
                    </select>
                    <br></br>
                    {/* <Multiselect name="userType"  options={userOptions[0]}  onSelect={onSelectUser}  onRemove={onRemoveUser} displayValue="label" /> */}
                    <br></br>
                    <center>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onSubmit={handleSaveCont}
                      >
                        Save
                      </button>{" "}
                      .{" "}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCloseCont}
                      >
                        close
                      </button>
                    </center>
                  </form>
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
              <DialogTitle id="alert-dialog-title">WARNING</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Add atleast one Contact to this Business Unit.
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

          <div>
            <Dialog
              fullWidth={true}
              open={deleteAlert}
              onClose={() => setDeleteAlert(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">ACKNOWLEDGEMENT</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Contact deleted sucessfully.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  className="btn btn-primary"
                  onClick={() => setDeleteAlert(false)}
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

          <Container>
            <label>
              <b>CONTACT :</b>
            </label>
            <button
              id="addNewCont"
              type="button"
              onClick={() => setOpen(true)}
              className="btn btn-secondary"
              style={{
                fontSize: "10px",
                fontSize: "0.875rem",
                marginLeft: "10px",
              }}
            >
              Add New
            </button>{" "}
            <br></br> <br></br>
            <table id="tab4" className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>User Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contact.map((record, id) => {
                  return (
                    <tr key={id}>
                      <td>{(index = id + 1)}</td>
                      <td>{record.firstName + " " + record.lastName}</td>
                      <td>{record.email}</td>
                      <td>{record.userType}</td>
                      <td>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => handleDeleteCont(id)}
                        >
                          {" "}
                          <DeleteIcon fontSize="small" />{" "}
                        </IconButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Container>
          <br></br>

          <center>
            <button
              type="button"
              className="btn btn-primary"
              style={{ fontSize: "10px", fontSize: "0.875rem" }}
              onClick={handlePrevious}
            >
              Previous
            </button>{" "}
            .{" "}
            <button
              type="button"
              className="btn btn-primary"
              style={{
                fontSize: "10px",
                fontSize: "0.875rem",
                marginRight: "160px",
              }}
              onClick={handleNext}
            >
              Next
            </button>
          </center>
        </div>
      ) : null}

      {/*  **************SUCCESS*****************PAGE 6 Starts Here*****************SUCCESS*****************   */}

      {page == 6 ? (
        <div style={{ marginLeft: "160px" }}>
          <header className="head">
            <div>
              <br></br>
              <center>
                <img
                  src={Logo}
                  height="50px"
                  width="250px"
                  style={{ marginRight: "160px" }}
                />
              </center>
            </div>
            <div>
              <br></br>
              <center>
                <h4 className="font" style={{ marginRight: "160px" }}>
                  SetUp Business Unit
                </h4>
              </center>
            </div>
            <br></br>
            <ProgressBar now={100} />
          </header>
          <br></br>
          <br></br>
          <center>
            <span>BU has been Sucessfully Created</span>
          </center>
        </div>
      ) : null}

      {/*  **************FAILURE*****************PAGE 6 Starts Here*****************FAILURE*****************   */}

      {page == 7 ? (
        <div style={{ marginLeft: "160px" }}>
          <header className="head">
            <div>
              <br></br>
              <center>
                <img
                  src={Logo}
                  height="50px"
                  width="250px"
                  style={{ marginRight: "160px" }}
                />
              </center>
            </div>
            <div>
              <br></br>
              <center>
                <h4 className="font" style={{ marginRight: "160px" }}>
                  SetUp Business Unit
                </h4>
              </center>
            </div>
            <br></br>
            <ProgressBar now={80} />
          </header>
          <br></br>
          <br></br>
          <center>
            <span>An Error has occurred.</span>
          </center>
        </div>
      ) : null}
    </div>
  );
};

/// **************************************Data and actions mapping as props********************************** ///
const mapStateToProps = (state) => {
  return {
    buList: state.buReducer.list,
    locList: state.locReducer.list,
    PBuLocList: state.PBuLocReducer.list,
    userList: state.UserTypeReducer.list,
  };
};

const mapActionToProps = {
  fetchAllBU: actions.fetchAll,
  fetchLoc: actions.fetchLoc,
  fetchPBuLoc: actions.fetchPBuLoc,
  fetchUser: actions.fetchUserType,
  createBU: actions.create,
};

export default connect(mapStateToProps, mapActionToProps)(BUForm);
