import React, { Component } from 'react';
import {Platform,Globalstyleheet,Text,View,Image,TextInput,TouchableHighlight,AsyncStorage,ScrollView,ListView,TouchableOpacity} from 'react-native';
import Drawers from './drawer';
import Subheader from './subheader';
import FooterTab from './footer';
import { Actions } from 'react-native-router-flux'; 
import Globalstyle from '../../../../asset/css/global_style';
var transactionArray = [];

export default class Home extends Component<{}> {
	    constructor(){
			super();
			 var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
			this.state = {
			  error:"",
			  isLoading:true,
			  currentCurrency:"",
			  TotalBalance:"",
			  btcRate:"",
			  changeCurrency:false,
			  walletBalance:'',
			  dataSource: dataSource.cloneWithRows(transactionArray),
			};
		}
		
		componentDidMount() {
			   
				 this.getTheData();  
		}
		
		 changePrice(){
				let rateChange = this.state.changeCurrency ;
				this.setState({
				  changeCurrency:!this.state.changeCurrency,
				});
				this.setState({
					  dataSource:this.state.dataSource.cloneWithRows([]),
					  // isLoading:true,
					})
			    this.getTheData(1) ;
				
			  
		}
		
		
	   async getTheData() {
		   
				try{
				   let jwtToken = await AsyncStorage.getItem('jwtToken') ;
				  // console.log(jwtToken);
				   let isLogin  = await AsyncStorage.getItem('isLogin') ;
				   if(isLogin==1){
						   let response = await fetch('http://wallet.auxledger.com/api/home?jwt_token='+jwtToken, {
										  method: 'GET',
										  headers: {
											'Accept': 'application/json',
											'Content-Type': 'application/json',
										  }
										});
						 
							let res = await response.text();
							if (response.status >= 200 && response.status < 300) {
								let data = JSON.parse(res);
								
								 let WalletAddress = data.address ;
							     AsyncStorage.setItem('WalletAddress',WalletAddress) ;
								 
								 let currentRate = String(data.rate) ;
							     AsyncStorage.setItem('currentRate',currentRate) ;
								
								transactionArray = data.result_for_v2 ;
								this.setState({
								  dataSource:this.state.dataSource.cloneWithRows(transactionArray),
								  isLoading:false,
								  currentCurrency:data.currency,
								  TotalBalance:data.balance_in_dollars,
								  btcRate:data.rate,
								  walletBalance:data.wallet_balance,
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
			
		    let currentCurrency = this.state.currentCurrency ;
			let transactionType = null ;
			let transactionPrice = null ;
			let transactionRow = null ;
			let rateChange = this.state.changeCurrency ;
			
			btcRate = this.state.btcRate ;
			//alert("asdas 121");
			//console.log(test);
			if (this.state.changeCurrency) {
				transactionPrice = currentCurrency+" "+(rowData.value*btcRate).toFixed(3) ;
			} else {
				transactionPrice = "BTC "+" "+rowData.value ;
				
			}
			if (rowData.transaction_type=="0") {
				 transactionType = <Text style={{color:'#41a040'}}>RECEIVED</Text> ;
				 transactionRow = <Text numberOfLines={1} style={{backgroundColor: '#41a040',paddingTop:10,paddingBottom:10,textAlign:"center",color:"#fff"}}>{transactionPrice}</Text> ;
			} else if(rowData.transaction_type=="1"){
				 transactionType = <Text style={{color:'#c9681e'}}>SENT</Text> ;
				 transactionRow = <Text numberOfLines={1} style={{backgroundColor: '#c9681e',paddingTop:10,paddingBottom:10,textAlign:"center",color:"#fff"}}>{transactionPrice}</Text>;
			}	
				let transactionId = rowData.txid ;
			return (
				<TouchableHighlight underlayColor='#dddddd' onPress={() => Actions.transactionsdetail({transactionId:transactionId})} >
					 <View style={{marginTop:2,paddingBottom:10}}>
						 <View style={{flexDirection:'row',marginBottom:10}}>
						     <View style={{flex:1}}>
								 <Text numberOfLines={1}>{rowData.dashboard_date}</Text>
								 <Text numberOfLines={1}>{transactionType}</Text>
							 </View>
							 <View style={{flex:1}}>
							     {transactionRow}
							 </View>
						 </View>	 
					 <View style={{height: 1, backgroundColor: '#dddddd'}}/>
					</View>
			     </TouchableHighlight>
		   );
		}
		
  render() {
	        
		let changeCurrency = this.state.changeCurrency ;
		
		if (this.state.changeCurrency) {
				headerPrice = this.state.currentCurrency+" "+this.state.TotalBalance ;
			} else {
				headerPrice = "BTC "+" "+this.state.walletBalance ;
			}
		
     var transactionView = (this.state.isLoading) ? <View style={{height: 110}} /> : <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections={true} />
    
	var contents =(
	     <View style={Globalstyle.parentcontainer}>
		         <View style={{flex:7}}>
					   <ScrollView>
					       
						         <TouchableOpacity onPress={() => this.changePrice()} style={{alignItems:'center',backgroundColor:"#004a7c",paddingBottom:10,paddingTop:10}}>
									<Text style={{color:"#fff",fontSize:25}}>{headerPrice}</Text>
									<Text style={{color:"#fff"}}>Total Balance</Text>
								</TouchableOpacity>
						   
							<View style={Globalstyle.maincontainer}>
								   <View style={Globalstyle.subcontainer} >
								      <Text></Text>
										    {transactionView}
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
				<Drawers data={contents} screentitle={'Home'}/>
			)
		}
	 
  }
}
