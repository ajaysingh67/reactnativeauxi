import React, { Component } from 'react'
import { Globalstyleheet,View,Text,Button,Image,TouchableOpacity} from 'react-native'
import { Actions } from 'react-native-router-flux';
import Globalstyle from '../../../../asset/css/global_style';

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
	  <View style={Globalstyle.footermaincontainer}>
	        <View style={Globalstyle.footernav}>
			   <TouchableOpacity onPress={() => Actions.sendpayment()}>
					<Text style={Globalstyle.footernavicon} ><Image style={{width:80,height:80}} source = {require('../../img/settings.png')} /></Text>
					<Text style={Globalstyle.footernavtext}>Send</Text>
				</TouchableOpacity>
			</View>
			<View style={Globalstyle.footernav}>
			     <TouchableOpacity onPress={() => Actions.home()}>
					<Text style={Globalstyle.footernavicon} ><Image style={{width:80,height:80}} source = {require('../../img/settings.png')} /></Text>
					<Text style={Globalstyle.footernavtext}>Home</Text>
				 </TouchableOpacity>
			</View>
			<View style={Globalstyle.footernav}>
			    <TouchableOpacity onPress={() => Actions.recievedpayment()}>
					<Text style={Globalstyle.footernavicon} ><Image style={{width:80,height:80}} source = {require('../../img/settings.png')} /></Text>
					<Text style={Globalstyle.footernavtext}>Receive</Text>
				</TouchableOpacity>
			</View>
	  </View>
    );
  }
}

