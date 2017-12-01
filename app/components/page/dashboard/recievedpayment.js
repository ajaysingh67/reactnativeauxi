import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,TextInput,TouchableHighlight,ScrollView,Button,Picker,Share,AsyncStorage } from 'react-native';
import Drawers from './drawer';
import Subheader from './subheader'
import { Actions } from 'react-native-router-flux'; 
import Globalstyle from '../../../../asset/css/global_style';
import QRCode from 'react-native-qrcode';
import FooterTab from './footer';

export default class Recievedpayment extends Component<{}> {
	
		constructor(){
			super();
			this.state = {
			  token: "",
			  error:"",
			  fromaddress:"",
			  WalletAddress:"",
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
				  
				   this.setState({
						  WalletAddress:WalletAddress,
						  isLoading:false,
				   })
				} else {
						Actions.emailSignup();
				}
		}
		// currentRate
		
		async onBtcPrice(text){
			  let BtcPrice = text ;
			  let currentRate = await AsyncStorage.getItem('currentRate') ;
			  var price = BtcPrice*currentRate;
			   price = String(price.toFixed(5));
			   this.setState({
					  transferPrice:price,
					  transferBtcPrice:BtcPrice
					  
			   })
			  // console.log(currentRate);
			  console.log("ab");
			
		}
		
		async onPriceChange(text){
			  let price = text ;
			  let currentRate = await AsyncStorage.getItem('currentRate') ;
			  var BtcPrice = price/currentRate;
			   BtcPrice =String(BtcPrice.toFixed(5));
			   this.setState({
					  transferPrice:price,
					  transferBtcPrice:BtcPrice
					  
			   })
			  // console.log(currentRate);
			  console.log("34");
			
		}
		
		async onsubmitbtn(){
			    let transferBtcPrice = this.state.transferBtcPrice ;
				let transferPrice = this.state.transferPrice ;
				let message = this.state.message ;
				
				if(transferBtcPrice==''){ 
					 this.setState({error: "Please enter amount."});
				} else if((transferBtcPrice=="NaN")||(transferPrice=="NaN")){
					this.setState({error: "Please enter correct price."});
				} else if(transferPrice==''){ 
				    this.setState({error: "Please enter amount."});
				} else if(message==''){ 
				     this.setState({error: "Please write the description."});
				} else { 
				    this.setState({error: ""});
					 Actions.paymentrequest({transferBtcPrice:transferBtcPrice,message:message});
				}
			
		}
		
		 
  render() {
	    let errormsg = this.state.error ;
		let errormessage = null ;
		if(errormsg!=''){
         errormessage = <View>
	                         <Text style={Globalstyle.errormsg}>{this.state.error}</Text>
						  </View>
		}
     var contents =(
	 <View style={{flex:1,backgroundColor:'#fff'}}>
		   <View style={{flex:7}}>
				 <ScrollView>
					  <View style={Globalstyle.maincontainer}>
							  <View style={Globalstyle.subcontainer} >
								   <View>
									  <Text style={Globalstyle.pageheading} >Tab to copy this address.Share it with the sender via email or text</Text>
								          <View style={{alignItems: 'center'}}>
											   <QRCode
												  value={this.state.WalletAddress}
												  size={150}
												  bgColor='black'
												  fgColor='white' />
											   </View>
									  <Text style={{marginBottom:10,textAlign:"center",fontSize:15,marginTop:10}} selectable>{this.state.WalletAddress}</Text>
										  {errormessage}
										  
									     
									  <Text style={Globalstyle.formtext}>Enter Amount in BTC</Text>
									   <View style={Globalstyle.transferprice}>
											<View style={Globalstyle.transferpricecontainer} >
												<TextInput style={Globalstyle.halfinput}  placeholder="In BTC" placeholderTextColor='#ccc' underlineColorAndroid='transparent' onChangeText={ (text)=> this.onBtcPrice(text) }  value={this.state.transferBtcPrice} />
											</View>
											 <View style={Globalstyle.transferpricecontainer} >
												<TextInput style={Globalstyle.halfinput}  placeholder="GBP" placeholderTextColor='#ccc' underlineColorAndroid='transparent' onChangeText={ (text)=> this.onPriceChange(text) } value={this.state.transferPrice} />
											</View>
									   </View>
									   <Text style={Globalstyle.formtext}>Description</Text>
									  <TextInput style={Globalstyle.textarea} multiline = {true} numberOfLines = {3}  placeholder="Eg. For rent.." placeholderTextColor='#ccc' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({message: text}) }/>
									  <View>
										  <TouchableHighlight style={Globalstyle.buttonContainer} onPress={this.onsubmitbtn.bind(this)} underlayColor={'#23527c'}>
												<Text style={Globalstyle.buttonText}>Request</Text>
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
	 return (<Drawers data={contents} screentitle={'Home'}/>);
  }
}
