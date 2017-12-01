import React, { Component } from 'react';
import {Platform,Globalstyleheet,Text,View,Image,TextInput,TouchableHighlight,AsyncStorage,ScrollView,ListView,TouchableOpacity,Picker} from 'react-native';
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
			  isLoading:true,
			  data:'',
			  currency:'',
			};
		}
		componentDidMount() {
			   
				 this.getTheData();  
		}
		
		async getTheData() {
		   
				try{
				   let jwtToken = await AsyncStorage.getItem('jwtToken') ;
				   
				   let isLogin  = await AsyncStorage.getItem('isLogin') ;
				   
				   if(isLogin==1){
						   let response = await fetch('http://wallet.auxledger.com/api/render_settings_preferences?jwt_token='+jwtToken, {
										  method: 'GET',
										  headers: {
											'Accept': 'application/json',
											'Content-Type': 'application/json',
										  }
										});
						 
							let res = await response.text();
							
							if (response.status >= 200 && response.status < 300) {
								let responsedata = JSON.parse(res);
								
								this.setState({
									data:responsedata,
									currency:responsedata.currency,
									isLoading:false,
								})
								
							} else {
									  let error = res;
									  throw error;
							} 
							
				    } else {
						Actions.emailSignup();
					}
							
			 	} catch(error) {
					
					this.setState({error: error});
				}
	    }
		
		onSubmitPassword(){
			 
			let password = this.state.password ;
			alert(password);
			
		}

	  async onCurrencyChange(itemValue){
			 
				 try{
				   let jwtToken = await AsyncStorage.getItem('jwtToken') ;
				   console.log(jwtToken);
				   let response = await fetch('http://wallet.auxledger.com/api/change_currency/', {
								  method: 'POST',
								  headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json',
								  },
								  body: JSON.stringify({
									  currency:itemValue,
									  jwt_token:jwtToken
								  })
								});
				 
					let res = await response.text();
					console.log(res);
					
					
					if (response.status >= 200 && response.status < 300) {
						        this.setState({
									currency:itemValue,
								})
							   let data = JSON.parse(res);
							   console.log(data);
							   
							
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
				       <ScrollView>
					  <View style={Globalstyle.maincontainer}>
							  <View style={Globalstyle.subcontainer} >
								   <View>
										 <Text  style={Globalstyle.pageheading}>Customize your wallet experience.</Text>  
										 <Text style={Globalstyle.subheading}>Email Address</Text>  
										 <Text style={Globalstyle.labeltext}>{this.state.data.email_id}</Text> 
										 <Text style={Globalstyle.textcontainer}>Your verified email address is used to send login codes when suspicious or unusual activity is detected, to remind you of your wallet login ID, and to send bitcoin payment alerts when you receive funds.</Text> 
								   </View>
								   <View style={{height: 1, backgroundColor: '#dddddd',marginTop:10,marginBottom:10}}/> 
								    <View>
										 <Text  style={Globalstyle.subheading}>Mobile Number(Unverified)</Text>  
										 <Text style={Globalstyle.labeltext}>test</Text> 
										 <Text style={Globalstyle.textcontainer}>Your mobile phone can be used to enable two-factor authentication, helping to secure your wallet from unauthorized access, and to send bitcoin payment alerts when you receive funds.</Text> 
								   </View>
								     <View style={{height: 1, backgroundColor: '#dddddd',marginTop:10,marginBottom:10}}/> 
								   <View>
										 <Text  style={Globalstyle.subheading}>Local Currency</Text>  
										 <Text style={Globalstyle.labeltext}>Select your local currency.</Text> 
										 
										  <Picker onValueChange={(itemValue, itemIndex) => this.onCurrencyChange(itemValue)} selectedValue={this.state.currency}>
                                              <Picker.Item label={'GBP'} value='GBP' key='GBP' /> 										   
										      <Picker.Item label={'INR'} value='INR' key='INR' /> 
											  <Picker.Item label={'USD'} value='USD' key='USD' /> 
											  <Picker.Item label={'EUR'} value='EUR' key='EUR' /> 
										 </Picker>
								   </View>
								   
							   </View>
					  </View>
				  </ScrollView>
				      
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
				<Drawers data={contents} screentitle={'Preference'}/>
			)
		}
	 
  }
}
