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
	    <View style={{height:60,backgroundColor:'#004a7c',padding:10}}>
		   <View style={{marginTop:10,flex:1,flexDirection:'row',}}>
			   <View style={{flex:1,flexDirection:'column'}}>
			        <TouchableHighlight onPress={this.props.reference} underlayColor={'#23527c'}>
						<Text><Image source={require('../../img/drawer.png')} style={{width:150}} /></Text>
					 </TouchableHighlight>
			   </View>
				<View style={{flex:4}}>
				  <Text style={{textAlign:'center'}}><Image source={require('../../img/logo.png')} style={{width:500}}/></Text>
			   </View>
				<View style={{flex:1}}>
				    <TouchableHighlight onPress={() => Actions.qrcodecamara()} underlayColor={'#23527c'}>
						<Text><Image source={require('../../img/drawer.png')} style={{width:150}} /></Text>
					 </TouchableHighlight>
			   </View>
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
