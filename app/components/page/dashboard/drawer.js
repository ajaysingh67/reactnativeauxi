import React, { Component } from 'react';
import { Text,ToolbarAndroid,View,ScrollView,StatusBar, StyleSheet, Image,TouchableOpacity,AsyncStorage, } from 'react-native' ;
import Toolbar from './Toolbar' ;
import Drawer from 'react-native-drawer';
import { Actions } from 'react-native-router-flux';

var userArray = [];
export default class Drawers extends Component {
	
	constructor(props){
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeControlPanel = this.closeControlPanel.bind(this);
    this.state = {
			  userCurrency:'',
			  currencyRate:'',
			};
  }
  closeControlPanel = () => {
    this._drawer.close()

  };
  async componentDidMount() {
	  
	    var userCurrency  = await AsyncStorage.getItem('userCurrency') ;
		var currencyRate  = await AsyncStorage.getItem('currencyRate') ;
		this.setState({
					  userCurrency:userCurrency,
					  currencyRate:currencyRate,
					})
		
  }
  openDrawer = () => {
    console.log('Clicked');
    this._drawer.open()
  };
   render(){
	  // var currencyRate ='';
		
		return (
		<Drawer
			type="overlay"
			ref = {(ref)=> this._drawer = ref }
			content={
			  <View style={{backgroundColor:'#ffffff',flex:1}}>
			       <View style={{backgroundColor:'#004a7c',padding:10}}>
				      <Text style={{margin:20,color:'#fff',fontSize:22,textAlign:'center'}}>1 BTC = {this.state.userCurrency+' '+this.state.currencyRate}</Text>
				   </View>
					<View style={{margin:23}}>
						  <View style={styles.rowHeight}>
							<Image
							  style= {styles.imageHeight}
							  source = {require('../../img/notifications-button.png')}
							  />
							  <Text style={styles.menutext}  onPress={() => Actions.home()}>Home</Text>
						  </View>
						  
						  <View style={styles.rowHeight}>
							<Image
							  style= {styles.imageHeight}
							  source = {require('../../img/settings.png')}
							  />
							  <Text style={styles.menutext} onPress={() => Actions.checkpassword({pageName:'securitycenter'})}>Security Center</Text>
						  </View>
						  <View style={styles.submenumain} >
							  <View style={{flexDirection:'row',marginBottom:10}}>
								 <Image
									style= {styles.imageHeight}
									source = {require('../../img/settings.png')}
								  />
								  <Text style={styles.menutext}>Settings</Text>
							  </View>
							  <View style={{marginLeft:20}}>
							       <Text style={styles.submenutext} onPress={() => Actions.checkpassword({pageName:'preferences'})}>Preferences</Text>
								   <Text style={styles.submenutext} onPress={() => Actions.addresses()}>Addresses</Text>
							  </View>
						  </View>
						  <View style={styles.rowHeight}>
							<Image
							  style= {styles.imageHeight}
							  source = {require('../../img/settings.png')}
							  />
							  <Text style={styles.menutext} onPress={() => Actions.logout()}>Sign Out</Text>
						  </View>
					</View>
			  </View>
			}
			openDrawerOffset={0.2}
			tapToClose={true}
			panOpenMask  ={0.1}
			panCloseMask={0.2}
			closedDrawerOffset={-3}
			styles={drawerStyles}
			tweenHandler={(ratio)=>({
			  main:{opacity:(2-ratio)/2}
			})}

			>
		  <Toolbar reference={this.openDrawer} title = {this.props.screentitle}/>
		  {this.props.data}
		</Drawer>
		);
    }
}
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity:1, shadowRadius: 3},
  main: {},
};
var styles = StyleSheet.create({
  toolbar: {
   backgroundColor: '#f37f58',
   height: 56,
  },
  menutext:{
    color:'#000',
    fontSize:18,
    marginLeft:25,
  },
  submenutext:{
    color:'#6e6f70',
    fontSize:17,
    marginLeft:35,
	marginTop:5,
	marginBottom:5
  },
  imageHeight:{
    height:16,
    width:16,
  },
  rowHeight:{
    flexDirection:'row',
     alignItems:'center',
     marginTop:20,
  },
  submenumain:{
     
     marginTop:10,
  },
 });