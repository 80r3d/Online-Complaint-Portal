import React, { Component, Fragment } from 'react';
import './assets/css/bootstrap.min.css'
import './assets/css/icons.css'
import './assets/css/style.css'
import './assets/css/pk-style.css'
import './assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css'
import './assets/images/favicon.ico'
import './assets/plugins/datatables/dataTables.bootstrap4.min.css'
import './assets/plugins/datatables/responsive.bootstrap4.min.css'

import logo from './assets/images/logo.png'
import logosm from './assets/images/logo-sm.png'
import user1 from './assets/images/users/user-1.jpg'

//import DropdownButton from 'react-dropdown';
//import 'react-dropdown/style.css';

import $ from 'jquery'; 



class Loader extends Component {

    render(){
        return(
        <div id="preloader" style={{"backgroundColor":"transparent"}}><div id="status"><div className="spinner"></div></div></div>  
        );
    }
}

export default Loader;