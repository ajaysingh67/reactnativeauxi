import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux'; 

export default class Logout extends Component<{}> {
	
	async componentDidMount() {
	  
	    var isLogin  = await AsyncStorage.getItem('isLogin') ;
		var jwtToken  = await AsyncStorage.getItem('jwtToken') ;
		AsyncStorage.removeItem('jwtToken')
		if(AsyncStorage.removeItem('isLogin')){
			Actions.index();
		} 
  }
  render() {
    return (
      <View>
           
      </View>
    );
  }
}

