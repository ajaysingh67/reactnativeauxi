import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,TextInput,TouchableHighlight,ScrollView,Button,Picker,AsyncStorage} from 'react-native';
import Drawers from './drawer';
import Subheader from './subheader'
import { Actions } from 'react-native-router-flux'; 
import Globalstyle from '../../../../asset/css/global_style';
import FooterTab from './footer';

export default class Sendpayment extends Component<{}> {
	
		constructor(){
			super();
			this.state = {
			  token: "",
			  error:"",
			  isShow:false,
			  addresses:'',
			  isLoading:true,
			  sendaddress:'',
			  currentCurrency:'',
			  currentaddress:'',
			  walletBalance:'0.00',
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
		   
				try{
				   let jwtToken = await AsyncStorage.getItem('jwtToken') ;
				   let isLogin  = await AsyncStorage.getItem('isLogin') ;
				  
				   if(isLogin==1){
						   let response = await fetch('http://wallet.auxledger.com/api/get_aliases?jwt_token='+jwtToken, {
										  method: 'GET',
										  headers: {
											'Accept': 'application/json',
											'Content-Type': 'application/json',
										  }
										});
						 
							let res = await response.text();
							if (response.status >= 200 && response.status < 300) {
								let data = JSON.parse(res);
								let addresses = data.aliases;
								// console.log(jwtToken);
								var qrCode  = this.props.qrCode ;
								
								this.setState({
								  addresses:addresses,
								  isLoading:false,
								  currentCurrency:data.currency,
								  sendaddress:qrCode,
								  walletBalance:data.default_address_balance,
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
		
		
  render() {
      let TransactionFee = null; 
      if (this.state.isShow) {
		  TransactionFee  =  <View >
								<Text style={Globalstyle.formtext}>Transaction Fee: </Text>
								<TextInput style={Globalstyle.input}  placeholder="Enter address on which to send" placeholderTextColor='#ccc' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({token: text}) }/>
							</View>
	  }	 
        let addresslist = null ;
		if(!this.state.isLoading){
			     
				addresslist = this.state.addresses.map((prop, key) => {
					return (
					<Picker.Item label={prop.alias+' ('+prop.alias_balance+' BTC)'} value={prop.alias} key={prop.alias}  /> 
					   )
				});
			 
			 // console.log(addresslist);
		}
		/* <Picker onValueChange={(itemValue, itemIndex) => this.setState({fromaddress: itemValue})}>
		  <Picker.Item label="My bitcoin wallet (0.0 BTC)" value="1" />
		  <Picker.Item label="test (0.0 BTC)" value="2" />
		</Picker> */ 
     
     var contents =(
	 <View style={Globalstyle.parentcontainer}>
		   <View style={{flex:7}}>
				 <ScrollView>
					  <View style={Globalstyle.maincontainer}>
							  <View style={Globalstyle.subcontainer} >
								  <View>
									  <Text style={Globalstyle.subheading}>Send Bitcoin to any Bitcoin Address</Text>
									  <Text style={Globalstyle.formtext}>From</Text>
									  <View style={{borderWidth:1,borderColor:'#ccc'}} >
									     <Picker onValueChange={(itemValue, itemIndex) => this.setState({currentaddress: itemValue})} selectedValue={this.state.currentaddress}>
                                              <Picker.Item label={'My bitcoin wallet ('+this.state.walletBalance+' BTC)'} value='default_alias' key='default_alias' /> 										   
										      {addresslist}
										 </Picker>
									  </View>
									  <Text style={Globalstyle.formtext}>To</Text>
									  <TextInput style={Globalstyle.input}  placeholder="Enter address on which to send" placeholderTextColor='#ccc' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({sendaddress: text}) } value={this.state.sendaddress}/>
									  <Text style={Globalstyle.formtext}>Enter Amount in BTC</Text>
									   <View style={Globalstyle.transferprice}>
											<View style={Globalstyle.transferpricecontainer} >
												<TextInput style={Globalstyle.halfinput}  placeholder="In BTC" placeholderTextColor='#ccc' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({btcprice: text}) }/>
											</View>
											<View style={Globalstyle.transferpricecontainer} >
												<TextInput style={Globalstyle.halfinput}  placeholder="GBP" placeholderTextColor='#ccc' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({token: text}) }/>
											</View>
											
									   </View>	
									 
									  <Text style={Globalstyle.formtext}>Description</Text>
									  <TextInput style={Globalstyle.textarea} multiline = {true} numberOfLines = {5}  placeholder="Eg. For rent.." placeholderTextColor='#ccc' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({token: text}) }/>
									   
										{TransactionFee}
									   
									   <View style={{flexDirection: 'row'}} >
												<View style={Globalstyle.banklinks}>
												   <Button 
													  onPress={() => this.toggleregular()}
													  title="Regular Send"
												   />
												</View>
												<View style={Globalstyle.banklinks}>
												   <Button
													  onPress={() => Actions.home()}
													  title="Next Step"
												   />
											   </View> 
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
				<Drawers data={contents} screentitle={'Send payment'}/>
			)
		}
	 
	 
	 // return (<Drawers data={contents} screentitle={'Home'}/>);
  }
}

