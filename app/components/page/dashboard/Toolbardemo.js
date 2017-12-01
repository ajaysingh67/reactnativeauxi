import React, { Component } from 'react'
import { ToolbarAndroid,StyleSheet,View,Text,TouchableHighlight,Image} from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class Toolbar extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
        title: this.props.title,
    };
  }
  render(){
    return(
	    <View style={{flexDirection:'row',height:40,backgroundColor:'#e1e1e1',flex:.4}}>
		   <View style={{flex:1}}>
		      <Text>test<Image source={require('../../img/drawer.png')} /></Text>
		   </View>
		    <View style={{flex:4}}>
		      <Text>123<Image source={require('../../img/drawer.png')} /></Text>
		   </View>
		    <View style={{flex:1}}>
		      <Text>abc<Image source={require('../../img/drawer.png')} /></Text>
		   </View>
		</View>
     
    );
  }
}

var styles = StyleSheet.create({
  toolbar: {
   backgroundColor: '#004a7c',
   height: 56,
   flex:0,
  },
 });
