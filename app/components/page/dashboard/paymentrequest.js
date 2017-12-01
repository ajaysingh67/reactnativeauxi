import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,TextInput,TouchableHighlight,ScrollView,Button,Picker,Share,AsyncStorage } from 'react-native';
import Drawers from './drawer';
import Subheader from './subheader' ;
import { Actions } from 'react-native-router-flux'; 
import Globalstyle from '../../../../asset/css/global_style';
import FooterTab from './footer';

export default class Paymentrequest extends Component<{}> {
	
		constructor(){
			super();
			this.state = {
			  token: "",
			  error:"",
			  fromaddress:"",
			  RequestLink:'',
			  transferBtcPrice:"",
			  transferPrice:"",
			  message:"",
			  isShow:false
			};
		}
		toggleregular(){
				this.setState({
				  isShow:!this.state.isShow
				});
				console.log('toggle button handler: '+ this.state.isShow);
		}
		
		componentDidMount() {
			 this.getTheData();  
		}
		async getTheData() {
			    let isLogin  = await AsyncStorage.getItem('isLogin') ;
			    if(isLogin==1){
					   let WalletAddress = await AsyncStorage.getItem('WalletAddress') ;
					   var siteUrl = 'http://wallet.auxledger.com/payment_request';
					   let amount = this.props.transferBtcPrice ;
					   let message = this.props.message ;
					   var RequestLink = siteUrl+'?address='+WalletAddress+'&amount='+amount+'&message='+message;
					   this.setState({
							  RequestLink:RequestLink,
							  transferBtcPrice:amount,
							  message:message,
							  isLoading:false,
					   })
			     } else {
						Actions.emailSignup();
				 }
		}
		
		 _showResult (result) {
			console.log(result)
		 }
		 
		 openShareDialogbox() {
			   
				 Share.share({
				  message: 'Use this link for payment :  '+this.state.RequestLink,
				  title: 'Auxledger Wallet',
				}, {
				  dialogTitle: 'Auxledger Wallet',
				  excludedActivityTypes: [
					'com.apple.UIKit.activity.PostToTwitter',
					'com.apple.uikit.activity.mail'
				  ],
				  tintColor: 'green'
				})
				.then(this._showResult)
				.catch(err => console.log(err)) 
		  }
		
  render() {
      
     var contents =(
	 <View style={{flex:1,backgroundColor:'#fff'}}>
		   <View style={{flex:7}}>
				 <ScrollView>
					  <View style={Globalstyle.maincontainer}>
							  <View style={Globalstyle.subcontainer} >
								   <View>
									  <Text style={Globalstyle.subheading} >Share the link below to your friend or contact and they will be able to send bitcoin directly to your wallet.</Text>
								      <Text style={{marginBottom:10,textAlign:"center",fontSize:16}}>{this.state.RequestLink}</Text>
									   <View style={{backgroundColor:'#ccc8c8',paddingTop:15,paddingBottom:15,marginBottom:20}}>
											 <Text style={{textAlign:'center',color:'#000',fontWeight:'bold',fontSize:22}}>Payment Request</Text>
											 <Text style={{textAlign:'center',color:'#F26C57',fontWeight:'bold',fontSize:18}}>{this.state.transferBtcPrice} BTC</Text>
											 <Text style={{textAlign:'center',fontSize:18}}>For "{this.state.message}"</Text>
									   </View>
									   <View>
											 <TouchableHighlight style={Globalstyle.buttonContainer} onPress={this.openShareDialogbox.bind(this)} underlayColor={'#23527c'}>
												<Text style={Globalstyle.buttonText}>SHARE</Text>
											 </TouchableHighlight>
									    </View>
								  </View>
							   </View>
					   </View>
				  </ScrollView>
	        </View>
	 </View>
	   
     );
	 return (contents);
  }
}
