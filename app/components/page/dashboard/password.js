import React, { Component } from 'react';
import {Platform,Globalstyleheet,Text,View,TextInput,TouchableHighlight,AsyncStorage,TouchableOpacity,Keyboard} from 'react-native';
import Drawers from './drawer';
import Subheader from './subheader';
import FooterTab from './footer';
import { Actions } from 'react-native-router-flux'; 
import Globalstyle from '../../../../asset/css/global_style';
var addressArray = [];

export default class Preferences extends Component<{}> {
	    constructor(){
			super();
			this.state = {
			  error:"",
			  isLoading:false,
			  password:'',
			};
		}
		
		async onSubmitPassword(){
			     
				 try{
					   let jwtToken = await AsyncStorage.getItem('jwtToken') ;
					   let pageName  = this.props.pageName ;
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
						
						if (response.status >= 200 && response.status < 300) {
							
								   let data = JSON.parse(res);
								   Keyboard.dismiss() ;
								   
								   if(data.status==0){
										   if(pageName=='preferences'){
												 Actions.preferences();
											} else if(pageName=='securitycenter'){
												Actions.securitycenter();
											}
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
	
   // var addressView ='' ;
	var contents =(
	     <View style={Globalstyle.parentcontainer} >
		         <View style={{flex:7}}>
				       <View style={{backgroundColor:"#f1f1f1",justifyContent:'center',flex:1,paddingLeft:10,paddingRight:10}}>
					         <View style={{backgroundColor:"#fff",padding:20}}>
								  <Text style={Globalstyle.errormsg} >
									  {this.state.error}
								  </Text>
							    <Text style={Globalstyle.heading2}>Password</Text>
								<TextInput style={Globalstyle.input}  placeholder="Enter password" secureTextEntry placeholderTextColor='#ccc' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({password: text}) }/>
                                  <TouchableHighlight style={Globalstyle.buttonContainer} onPress={this.onSubmitPassword.bind(this)} underlayColor={'#23527c'}>
									<Text style={Globalstyle.buttonText}>Next</Text>
								  </TouchableHighlight>
							 </View>
					   </View>
			    </View>
	           <View style={Globalstyle.footer}><FooterTab /></View>
		</View>
      );
	 
	    if(this.state.isLoading){
		 return(
			  <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF'}}>
				<Image
				  style={{width: 70, height: 70,}}
				  source={require('../../img/V_loading_.gif')} />
			  </View>
		    )
		 
		}else {
			return (
				<Drawers data={contents} screentitle={'Check Password'}/>
			)
		}
	 
  }
}
