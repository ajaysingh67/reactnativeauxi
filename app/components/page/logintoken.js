import React, { Component } from 'react';
import {Platform,Auxestyleheet,Text,View,Image,TextInput,TouchableHighlight,AsyncStorage,Keyboard} from 'react-native';
import { Actions } from 'react-native-router-flux'; 
import Auxestyle from '../../../asset/css/auxestyle';

export default class Logintoken extends Component<{}> {
	
	constructor(){
			super();
			this.state = {
			  token: "",
			  error:"",
			};
		}
		
	async onsubmitbtn(){
		  try{
			   let jwtToken = await AsyncStorage.getItem('jwtToken') ;
			   let response = await fetch('http://wallet.auxledger.com/api/verify_token/', {
							  method: 'POST',
							  headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json',
							  },
							  body: JSON.stringify({
								  token: this.state.token,
								  jwt_token:jwtToken
							  })
							});
			 
				let res = await response.text();
				let token = this.state.token ;
				
				if (response.status >= 200 && response.status < 300) {
					
						let data = JSON.parse(res);
						   if(data.status==0){
							     Keyboard.dismiss() ;
								 Actions.loginpassword();
						   } else if(data.status==1){
								this.setState({error: "Token not match."});
								
						   } else if(data.status==2){
								this.setState({error: "Please enter email again."});
							   
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
				      <Text style={Auxestyle.heading}>Enter Token</Text>
					  <Text style={Auxestyle.tokenmessage} >Please check your Email ID and follow the steps or enter token sent to your Email Id here to authenticate</Text>
				      <TextInput style={Auxestyle.input}  placeholder="Enter Token" placeholderTextColor='#ccc' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({token: text}) }/>
					 <TouchableHighlight style={Auxestyle.buttonContainer} onPress={this.onsubmitbtn.bind(this)} underlayColor={'#23527c'}>
						<Text style={Auxestyle.buttonText}>Next</Text>
					 </TouchableHighlight>
				 </View>
			  </View>
      </View>
    );
  }
}
