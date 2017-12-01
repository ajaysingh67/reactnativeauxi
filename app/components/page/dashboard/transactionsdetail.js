import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,TextInput,TouchableHighlight,ScrollView,AsyncStorage} from 'react-native';
import Drawers from './drawer';
import Subheader from './subheader'
import { Actions } from 'react-native-router-flux'; 
import Globalstyle from '../../../../asset/css/global_style';
import FooterTab from './footer';

export default class Transactionsdetail extends Component<{}> {
	
		constructor(){
			super();
			this.state = {
			  token: "",
			  error:"",
			  paymentDetail:"",
			  isLoading:true,
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
		   
				try{
				   let jwtToken = await AsyncStorage.getItem('jwtToken') ;
				   
				   let isLogin  = await AsyncStorage.getItem('isLogin') ;
				   
				   let transactionId  = this.props.transactionId ;
				   
				   if(isLogin==1){
						   let response = await fetch('http://wallet.auxledger.com/api/transaction_details/', {
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
								
								this.setState({
									paymentDetail:data.result,
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
		
		
		render() {
			 let transactionId = this.props.transactionId ;
			 let transactionType ='SENT';
			 if(this.state.paymentDetail.transaction_type=='0'){
				 let transactionType ='RECIEVED';
			 }
			 
			var contents = (
				<View style={Globalstyle.singlepagecontainer}>
					<ScrollView>
					   <View style={Globalstyle.transationrow}>
							<Text style={Globalstyle.transationlabel}>{transactionType} </Text>
							<Text style={Globalstyle.transationtext}>{this.state.paymentDetail.value}</Text>
					   </View>
					   <View style={Globalstyle.transationrow}>
					       <Text style={Globalstyle.transationlabel}>Description</Text>
						   <Text style={Globalstyle.transationtext}>{this.state.paymentDetail.description}</Text>
					   </View>
					    <View style={Globalstyle.transationaddressrow}>
						   <View style={{flexDirection:'row',paddingBottom:10}}>
							   <Text style={Globalstyle.transationlabel}>To</Text>
							   <Text style={Globalstyle.transationtext}>{this.state.paymentDetail.to_address}</Text>
						   </View>
						   <View style={{flexDirection:'row'}}>
							   <Text style={Globalstyle.transationlabel}>From</Text>
							   <Text style={Globalstyle.transationtext}>{this.state.paymentDetail.address}</Text>
						   </View>
					   </View>
					   <View style={Globalstyle.transationrow}>
					       <Text style={Globalstyle.transationlabel}>Date</Text>
						   <Text style={Globalstyle.transationtext}>{this.state.paymentDetail.transaction_date}</Text>
					   </View>
					   
					   <View>
					      <TouchableHighlight style={Globalstyle.buttonContainer} onPress={() => Actions.transactionwebview({transactionId:this.state.paymentDetail.txid})} underlayColor={'#23527c'}>
								<Text style={Globalstyle.buttonText}>View On blockchain.info</Text>
						  </TouchableHighlight>
					   </View>
				   </ScrollView>
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
					<Drawers data={contents}/>
				)
			 }
		  }
  
}

