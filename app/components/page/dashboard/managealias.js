import React, { Component } from 'react';
import {Platform,Globalstyleheet,Text,View,Image,TextInput,TouchableHighlight,AsyncStorage,ScrollView,ListView,TouchableOpacity} from 'react-native';
import Drawers from './drawer';
import Subheader from './subheader';
import FooterTab from './footer';
import { Actions } from 'react-native-router-flux'; 
import Globalstyle from '../../../../asset/css/global_style';
var addressArray = [];

export default class Managealias extends Component<{}> {
	    constructor(){
			super();
			 var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
			this.state = {
			  error:"",
			  isLoading:false,
			  walletBalance:'',
			  alias:'',
			  dataSource: dataSource.cloneWithRows(addressArray),
			};
		}
		
		componentDidMount() {
			   
				 this.getTheData();  
		}
		
	   async getTheData() {
		   
				try{
				   let jwtToken = await AsyncStorage.getItem('jwtToken') ;
				   var alias = 'test' ;
				   let isLogin  = await AsyncStorage.getItem('isLogin') ;
				   if(isLogin==1){
						   let response = await fetch('http://wallet.auxledger.com/api/generate_address_v2?jwt_token='+jwtToken+'&alias='+alias, {
										  method: 'GET',
										  headers: {
											'Accept': 'application/json',
											'Content-Type': 'application/json',
										  }
										});
						 
							let res = await response.text();
							console.log(res);
							if (response.status >= 200 && response.status < 300) {
								let data = JSON.parse(res);
								console.log(data);
								addressArray = data.result ;
								this.setState({
								  dataSource:this.state.dataSource.cloneWithRows(addressArray),
								  isLoading:false,
								  walletBalance:data.default_address_balance,
								  alias:alias
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

		renderRow(rowData, sectionID, rowID) {
			
			let transactionType = null ;
			let transactionPrice = null ;
			let transactionRow = null ;
			
			let alias = rowData.alias ;
			return (
				<TouchableHighlight underlayColor='#dddddd' onpress={() => actions.transactionsdetail({alias:alias})} >
					 <View style={Globalstyle.addressblock}>
						 <View style={Globalstyle.subaddressblock}>
								 <Text numberOfLines={1} style={{flex:2}}>2323</Text>
								 <Text numberOfLines={1} style={{flex:1}}>23423</Text>
						 </View>	 
					 <View style={{height: 1, backgroundColor: '#dddddd'}}/>
					</View>
			     </TouchableHighlight>
		   );
		}
		
  render() {
	
     var addressView = (this.state.isLoading) ? <View style={{height: 110}} /> : <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections={true} />
   // var addressView ='' ;
	var contents =(
	     <View style={Globalstyle.parentcontainer} >
		         <View style={{flex:7}}>
					   <ScrollView>
							<View style={Globalstyle.maincontainer}>
								   <View style={Globalstyle.subcontainer} >
										 <View>
											<Text style={Globalstyle.heading2}>{this.state.alias}</Text>
											<Text style={Globalstyle.heading2}>Unused Addresses</Text>
											<Text style={{marginBottom:10}}>Your Blockchain Wallet contains an unlimited collection of bitcoin addresses that you can use to receive funds from anybody, globally. Your wallet will automatically manage your bitcoin addresses for you. The addresses below are the subset of addresses that are labeled.</Text>
										 </View>
									 
										 {addressView}
										   <View>
											  <TouchableHighlight style={Globalstyle.buttonContainer} onPress={() => Actions.transactionwebview()} underlayColor={'#23527c'}>
													<Text style={Globalstyle.buttonText}>Add Next Address</Text>
											  </TouchableHighlight>
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
				<Drawers data={contents} screentitle={'Addresses'}/>
			)
		}
	 
  }
}
