import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Index from './app/components/page/index';
import EmailSignup from './app/components/page/emailSignup';
import Logintoken from './app/components/page/logintoken';
import Loginpassword from './app/components/page/loginpassword';
import Recoverfund from './app/components/page/recoverfund';
import Recievedpayment from './app/components/page/dashboard/recievedpayment';
import Transactionsdetail from './app/components/page/dashboard/transactionsdetail';
import Transactionwebview from './app/components/page/dashboard/transactionwebview';
import Drawers from './app/components/page/dashboard/drawer';
import Home from './app/components/page/dashboard/home';
const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="index"
          component={Index}
          title="Index"
		  hideNavBar
        />
	    <Scene key="emailSignup"
          component={EmailSignup}
          title="Email Signup"
		  hideNavBar
		  
        />
		 <Scene key="logintoken"
          component={Logintoken}
		  hideNavBar
          
        />
		<Scene key="drawers" component={Drawers}  hideNavBar={true}  />
		<Scene key="loginpassword"
          component={Loginpassword}
		  hideNavBar
		  
        />
		<Scene key="recoverfund"
          component={Recoverfund}
		  hideNavBar
        />
		<Scene key="home"
          component={Home}
		  hideNavBar
		  initial
        />
		
		<Scene key="recievedpayment"
          component={Recievedpayment}
		  hideNavBar
		  
        />
		<Scene key="transactionsdetail"
           component={Transactionsdetail}
		   title="Transaction"
        />
		<Scene key="transactionwebview"
           component={Transactionwebview}
		   title="Transaction"
        />
      </Scene>
      </Router>
  );
}

export default App;