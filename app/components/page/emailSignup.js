import React, { Component } from 'react';
import {Platform,Auxestyleheet,Text,View,Image,TextInput,TouchableHighlight,AsyncStorage,Keyboard} from 'react-native';
import { Actions } from 'react-native-router-flux'; 
import Auxestyle from '../../../asset/css/auxestyle';

export default class EmailSignup extends Component<{}> {
	
	constructor(){
			super();
			this.state = {
			  email: "",
			  error:"",
			};
			
		}
		
		
		validateEmail = (email) => {
		  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		};
   async onsubmitbtn(){
		  
		    if (!this.validateEmail(this.state.email)) {
				  this.setState({error: "Please enter correct email."});
				 
			} else {
				 
				   try{
					   let response = await fetch('http://wallet.auxledger.com/api/signup_v2/', {
									  method: 'POST',
									  headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/json',
									  },
									  body: JSON.stringify({
										  email_id: this.state.email,
									  })
									});
					 
					    let res = await response.text();
					   
						if (response.status >= 200 && response.status < 300) {
							
						        let data = JSON.parse(res);
							    let token = data.jwt_token;
								   if(data.status==0){
									    
										 let loginResponse = await fetch('http://wallet.auxledger.com/api/render_verify_token/', {
															  method: 'POST',
															  headers: {
																'Accept': 'application/json',
																'Content-Type': 'application/json',
															  },
															  body: JSON.stringify({
																  jwt_token: token,
															  })
															});
									   if (loginResponse.status >= 200 && loginResponse.status < 300) {
						                    AsyncStorage.setItem('jwtToken',token) ;
											let loginres = await loginResponse.text();
											let logindata = JSON.parse(loginres);
											let loginStatus = logindata.status ;
											if(loginStatus==0){ 
											     Keyboard.dismiss() ;
												 Actions.logintoken();
											} else {
												this.setState({error: "Please try again."});
											}
									   }
									  
								   } else if(data.status==1){
									     AsyncStorage.setItem('jwtToken',token) ;
										 Actions.logintoken();
								   } else if(data.status==2){
										this.setState({error: "Please try again."});
									   
								   }
								
							
					    } else {
								  //Handle error
								  let error = res;
								  throw error;
								  
						} 
					 
				  } catch(error) {
					  
					  	this.setState({error: error});
					  
				  }
			}
	}
	onRecover(){
		  Actions.recoverfund();
	}
  render() {
    return (
     <View style={Auxestyle.container}>
	       <View style={Auxestyle.header}>
		      <Image source={require('../../../asset/images/logo.png')} style={Auxestyle.logo} />
		   </View>
		      <View style={Auxestyle.bodycontainer} >
			      <View style={Auxestyle.formcontainer} >
				       <Text style={Auxestyle.errormessage} >
						  {this.state.error}
						</Text>
				      <Text style={Auxestyle.heading}>Enter E-mail</Text>
				      <TextInput style={Auxestyle.input}  placeholder="Enter Email" placeholderTextColor='#ccc' keyboardType="email-address" underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({email: text}) }/>
                     <TouchableHighlight onPress={this.onRecover}>					
							<Text style={Auxestyle.recoverlink} >Recover Fonds?</Text>
                      </TouchableHighlight>					
					<TouchableHighlight style={Auxestyle.buttonContainer} onPress={this.onsubmitbtn.bind(this)} underlayColor={'#23527c'}>
						<Text style={Auxestyle.buttonText}>Next</Text>
					 </TouchableHighlight>
				 </View>
			  </View>
      </View>
    );
  }
}
