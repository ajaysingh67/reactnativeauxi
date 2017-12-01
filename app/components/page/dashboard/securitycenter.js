import React, { Component } from 'react';
import {Platform,Globalstyleheet,Text,View,Image,TextInput,TouchableHighlight,AsyncStorage,ScrollView,ListView,TouchableOpacity,Picker} from 'react-native';
import Drawers from './drawer';
import Subheader from './subheader';
import FooterTab from './footer';
import { Actions } from 'react-native-router-flux'; 
import Globalstyle from '../../../../asset/css/global_style';
var addressArray = [];

export default class Securitycenter extends Component<{}> {
	    constructor(){
			super();
			this.state = {
			  error:"",
			  isLoading:false,
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
				   
				   let transactionId  = this.props.transactionId ;
				   
				   if(isLogin==1){
						   let response = await fetch('http://wallet.auxledger.com/api/render_settings_preferences/', {
										  method: 'POST',
										  headers: {
											'Accept': 'application/json',
											'Content-Type': 'application/json',
										  },
										   body: JSON.stringify({
											  jwt_token: jwtToken,
											  txid:transactionId
										  })
										});
						 
							let res = await response.text();
							// console.log(res);
							if (response.status >= 200 && response.status < 300) {
								let data = JSON.parse(res);
								
								
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

		
  render() {
	
   // var addressView ='' ;
	var contents =(
	     <View style={Globalstyle.parentcontainer} >
		         <View style={{flex:7}}>
				       <ScrollView>
					  <View style={Globalstyle.maincontainer}>
							  <View style={Globalstyle.subcontainer} >
								   <View>
										 <Text  style={Globalstyle.pageheading}>Basic security: Make sure your detailsare accurate and up to date to keep your wallet safe from unauthorized access and to help you restore access to your wallet in the case of a Wallet ID or password loss.</Text>  
										 <Text style={Globalstyle.subheading}>Wallet recovery phase(Unconfirmed)</Text>  
										 <Text style={Globalstyle.textcontainer}>Your recovery phrase can be used to restore all your funds in the case of a lost password or a loss of service at Blockchain. Note, that the recovery phrase never changes and recovers all of your existing bitcoins as well as newly received funds in this wallet. Please note that imported addresses are not backed up by the wallet recovery phrase. We strongly recommend to transfer funds from imported addresses into this wallet.</Text> 
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
