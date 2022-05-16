///*******************************************************************************************************************///

  //  CREATED ON   : 10/11/2020
  //  COMPANY NAME : MCT IT SOLUTIONS PVT LTD.
  //  PROJECT NAME : MUNILOGIC SETUP BU
  //  CREATED BY   : JAY PATEL, ROHIT HADIYA
  //  GUIDED BY    : PRAKASH NISHAD, ROHIT HADIYA, NIHAL BHATASANA, MITTAL PANCHAL

///*******************************************************************************************************************///

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
