import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,AsyncStorage} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Splash from './app/components/page/splash';
import Index from './app/components/page/index';
import EmailSignup from './app/components/page/emailSignup';
import Logintoken from './app/components/page/logintoken';
import Loginpassword from './app/components/page/loginpassword';
import Recoverfund from './app/components/page/recoverfund';
import Logout from './app/components/page/dashboard/logout';
import Recievedpayment from './app/components/page/dashboard/recievedpayment';
import Transactionsdetail from './app/components/page/dashboard/transactionsdetail';
import Transactionwebview from './app/components/page/dashboard/transactionwebview';
import Securitycenter from './app/components/page/dashboard/securitycenter';
import Checkpassword from './app/components/page/dashboard/password';
import Preferences from './app/components/page/dashboard/preferences';
import Addaddress from './app/components/page/dashboard/addaddress';
import Managealias from './app/components/page/dashboard/managealias';
import Addresses from './app/components/page/dashboard/addresses';
import Qrcodecamara from './app/components/page/dashboard/qrcodecamara';
import Drawers from './app/components/page/dashboard/drawer';
import Home from './app/components/page/dashboard/home';
import Sendpayment from './app/components/page/dashboard/sendpayment';
import Paymentrequest from './app/components/page/dashboard/paymentrequest';


const App = () => {
	
  return (
    <Router>
      <Scene key="root">
	    <Scene key="splash"
          component={Splash}
		  hideNavBar
		  initial
        />
		<Scene key="logout"
          component={Logout}
		  hideNavBar
        />
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
		  
        />
		<Scene key="sendpayment"
          component={Sendpayment}
		  hideNavBar
		  
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
		 <Scene key="paymentrequest"
          component={Paymentrequest}
		  title ="Request Created"
		  
        />
		 <Scene key="addresses"
		   hideNavBar
           component={Addresses}
		   title ="Addresses"
		   
        />
		 <Scene key="managealias"
		   hideNavBar
          component={Managealias}
		  title ="Manage alias"
		  
        />
		 <Scene key="addaddress"
          component={Addaddress}
		  title ="Add address"
		  
        />
		<Scene key="preferences"
		   hideNavBar
          component={Preferences}
		  title ="Setting Preferences"
		  
        />
		<Scene key="checkpassword"
		   hideNavBar
          component={Checkpassword}
		  title ="Password"
		  
        />
		<Scene key="securitycenter"
		   hideNavBar
          component={Securitycenter}
		  title ="Security center"
		  
        />
		<Scene key="qrcodecamara"
           component={Qrcodecamara}
		   title="Scanner"
        />
      </Scene>
	  
      </Router>
  );
}

export default App;