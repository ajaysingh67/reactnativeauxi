import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux'; 

export default class Splash extends Component<{}> {
	
	async componentDidMount() {
	  
	    var isLogin  = await AsyncStorage.getItem('isLogin') ;
		var jwtToken  = await AsyncStorage.getItem('jwtToken') ;
		console.log(isLogin);
		
		console.log(jwtToken);
		if((isLogin=='')||(isLogin==null)){ 
			Actions.index();
		} else { 
			Actions.home();
		}
  }
  render() {
    return (
      <View style={styles.container}>
           <Image source={require('../../../asset/images/bitcoin.jpg')} style={styles.backgroundimage} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1},
  backgroundimage: {flex: 6,width:null,alignItems:'stretch',justifyContent:'center'},  
});
