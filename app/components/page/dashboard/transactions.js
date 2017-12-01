import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,TextInput,TouchableHighlight} from 'react-native';
import Drawers from './drawer';
import Subheader from './subheader'
import { Actions } from 'react-native-router-flux'; 
import Globalstyle from '../../../../asset/css/global_style';

export default class Transactions extends Component<{}> {
	
  render() {
   
     var contents =(
	 
	  <View style={Globalstyle.maincontainer}>
	          <Subheader />
			  <View style={Globalstyle.subcontainer} >
				  <View>
					  <Text style={Globalstyle.heading2}>Send</Text>
					  <Text>Send Bitcoin to any Bitcoin Address</Text>
				   </View>
			   </View>
      </View>
     );
	 return (<Drawers data={contents} screentitle={'Home'}/>);
  }
}

