import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,TouchableHighlight,TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux'; 

export default class Test extends Component<{}> {
	
  render() {
    return (
      <View >
	       <View>
		      <Image source={require('../../../asset/images/logo.png')}  />
		   </View>
           <Image source={require('../../../asset/images/bitcoin.jpg')}  >
		      
		   </Image>
      </View>
    );
  }
}

