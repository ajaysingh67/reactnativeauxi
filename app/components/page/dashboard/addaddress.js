import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,TextInput,TouchableHighlight,ScrollView,Button,Picker,AsyncStorage} from 'react-native';
import Drawers from './drawer';
import Subheader from './subheader'
import { Actions } from 'react-native-router-flux'; 
import Globalstyle from '../../../../asset/css/global_style';
import FooterTab from './footer';

export default class Addaddress extends Component<{}> {
	
		constructor(){
			super();
			this.state = {
			  error:"",
			  isShow:false,
			  addresses:'',
			  isLoading:false,
			};
		}
		
		
		async onsubmitbtn(){
			     let address = this.state.address ;
				 
				 if(address==''){ 
					 this.setState({error: "Please enter address."});
				} else { 
						 try{
							   let jwtToken = await AsyncStorage.getItem('jwtToken') ;
							   let response = await fetch('http://wallet.auxledger.com/api/create_new_alias/', {
											  method: 'POST',
											  headers: {
												'Accept': 'application/json',
												'Content-Type': 'application/json',
											  },
											  body: JSON.stringify({
												  alias: address,
												  jwt_token:jwtToken
											  })
											});
							 
								let res = await response.text();
								
								if (response.status >= 200 && response.status < 300) {
									
										   let data = JSON.parse(res);
										   Keyboard.dismiss() ;
										   
										   
										
								} else {
										  let error = res;
										  throw error;
								} 
							 
							} catch(error) {
								this.setState({error: error});
							}
					}
				
		}
		
  render() {
     
     var contents =(
			 <View style={Globalstyle.parentcontainer}>
				   <View style={{flex:7}}>
						 <ScrollView>
							  <View style={Globalstyle.maincontainer}>
									  <View style={Globalstyle.subcontainer} >
										  <View>
											  
											  <Text style={Globalstyle.formtext}>Name</Text>
											  <TextInput style={Globalstyle.input}  placeholder="Enter address" placeholderTextColor='#ccc' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({address: text}) }/>
											   <View>
												  <TouchableHighlight style={Globalstyle.buttonContainer} onPress={() => this.onsubmitbtn.bind(this)} underlayColor={'#23527c'}>
														<Text style={Globalstyle.buttonText}>Create New</Text>
												  </TouchableHighlight>
											   </View>
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
				contents
			)
		}
	 
	 
	 // return (<Drawers data={contents} screentitle={'Home'}/>);
  }
}

