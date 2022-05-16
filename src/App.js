///*******************************************************************************************************************///

  //  CREATED ON   : 10/11/2020
  //  COMPANY NAME : MCT IT SOLUTIONS PVT LTD.
  //  PROJECT NAME : MUNILOGIC SETUP BU
  //  CREATED BY   : JAY PATEL, ROHIT HADIYA
  //  GUIDED BY    : PRAKASH NISHAD, ROHIT HADIYA, NIHAL BHATASANA, MITTAL PANCHAL

///*******************************************************************************************************************///

import React,{Component} from 'react';
import {store} from './actions/store';
import {Provider} from 'react-redux';
import BUForm from './components/BUForm';
import Home from './Home'
import { Route } from 'react-router-dom';
import './App.css'
import SignIn from './components/SignIn';
import AdminHome from './AdminHome';


class App extends Component {
  
  render() {
    return (
        <Provider store={store}>
          <Route exact path="/" component={Home} />
          <Route exact path="/AdminHome" component={AdminHome} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/complaint" component={BUForm} />
        </Provider>
    );
  }
}


export default App;
