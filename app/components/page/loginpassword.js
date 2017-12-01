import React, { Component } from 'react';
import {Platform,Auxestyleheet,Text,View,Image,TextInput,TouchableHighlight,AsyncStorage,Keyboard} from 'react-native';
import { Actions } from 'react-native-router-flux'; 
import Auxestyle from '../../../asset/css/auxestyle';

export default class Loginpassword extends Component<{}> {
	
	constructor(){
			super();
			this.state = {
			  password: "",
			  error:"",
			};
		}
	
	 async onsubmitbtn(){
		  try{
			   let jwtToken = await AsyncStorage.getItem('jwtToken') ;
			   console.log(jwtToken);
			   let response = await fetch('http://wallet.auxledger.com/api/verify_password/', {
							  method: 'POST',
							  headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							  },
							  body: JSON.stringify({
								  password: this.state.password,
								  jwt_token:jwtToken
							  })
							});
			 
				let res = await response.text();
				console.log(res);
				
				
				if (response.status >= 200 && response.status < 300) {
					
						   let data = JSON.parse(res);
						   console.log(data);
						   if(data.status==0){
							   Keyboard.dismiss() ;
							   let walletId = data.wallet_id ;
							   AsyncStorage.setItem('walletId',walletId) ;
							   AsyncStorage.setItem('isLogin',"1") ;
							   AsyncStorage.setItem('userCurrency',"USD") ;
							   AsyncStorage.setItem('currencyRate',"10412.12") ;
							   Actions.home();
						   } else if(data.status==1){
								this.setState({error: "Password not match try again."});
								
						   } else if(data.status==2){
							  //  Actions.emailSignup();
								this.setState({error: "Password not match try again."});
						   } 
						
				} else {
						  let error = res;
						  throw error;
				} 
			 
		    } catch(error) {
				this.setState({error: error});
		    }
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
				      <Text style={Auxestyle.heading}>Enter Password</Text>
				      <TextInput style={Auxestyle.input}  placeholder="Enter Password" placeholderTextColor='#ccc' secureTextEntry underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({password: text}) }/>
					 <TouchableHighlight style={Auxestyle.buttonContainer} onPress={this.onsubmitbtn.bind(this)} underlayColor={'#23527c'}>
						<Text style={Auxestyle.buttonText}>Next</Text>
					 </TouchableHighlight>
				 </View>
			  </View>
      </View>
     );
   }
 }
