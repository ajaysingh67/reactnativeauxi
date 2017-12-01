import React, { Component } from 'react';
import {Platform,Globalstyleheet,Text,View,Image,TextInput,TouchableHighlight,AsyncStorage,ScrollView,ListView,TouchableOpacity} from 'react-native';
import Drawers from './drawer';
import Subheader from './subheader';
import FooterTab from './footer';
import { Actions } from 'react-native-router-flux'; 
import Globalstyle from '../../../../asset/css/global_style';
var addressArray = [];

export default class Addresses extends Component<{}> {
	    constructor(){
			super();
			 var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
			this.state = {
			  error:"",
			  isLoading:true,
			  walletBalance:'',
			  dataSource: dataSource.cloneWithRows(addressArray),
			};
		}
		
		componentDidMount() {
			   
				 this.getTheData();  
		}
		
	   async getTheData() {
		   
				try{
				   let jwtToken = await AsyncStorage.getItem('jwtToken') ;
				  // console.log(jwtToken);
				   let isLogin  = await AsyncStorage.getItem('isLogin') ;
				   if(isLogin==1){
						   let response = await fetch('http://wallet.auxledger.com/api/render_settings_address?jwt_token='+jwtToken, {
										  method: 'GET',
										  headers: {
											'Accept': 'application/json',
											'Content-Type': 'application/json',
										  }
										});
						 
							let res = await response.text();
							
							if (response.status >= 200 && response.status < 300) {
								let data = JSON.parse(res);
								addressArray = data.result ;
								this.setState({
								  dataSource:this.state.dataSource.cloneWithRows(addressArray),
								  isLoading:false,
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

		renderRow(rowData, sectionID, rowID) {
			
			let transactionType = null ;
			let transactionPrice = null ;
			let transactionRow = null ;
			
			let alias = rowData.alias ;
			return (
				<TouchableHighlight underlayColor='#dddddd' onPress={() => Actions.managealias({alias:alias})} >
					 <View style={Globalstyle.addressblock}>
						 <View style={Globalstyle.subaddressblock}>
								 <Text numberOfLines={1} style={{flex:2,fontSize:16,fontWeight:'bold'}}>{rowData.alias}</Text>
								 <Text numberOfLines={1} style={{flex:1,fontSize:16,fontWeight:'bold'}}>{rowData.alias_balance+' BTC'}</Text>
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
									 <View style={Globalstyle.addressblock}>
											 <View style={Globalstyle.subaddressblock}>
													 <Text numberOfLines={1} style={{flex:2,fontSize:16,fontWeight:'bold'}}>My Bitcoin Wallet (Default)</Text>
													 <Text numberOfLines={1} style={{flex:1,fontSize:16,fontWeight:'bold'}}>{this.state.walletBalance+' BTC'}</Text>
											 </View>
									         <View style={{height: 1, backgroundColor: '#dddddd'}}/>
									   </View>
										    {addressView}
											 <TouchableHighlight style={Globalstyle.buttonContainer} onPress={() => Actions.addaddress()} underlayColor={'#23527c'}>
												<Text style={Globalstyle.buttonText}>Add More</Text>
											 </TouchableHighlight>
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
