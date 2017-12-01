import React, { Component } from 'react'
import { Globalstyleheet,View,Text,Button,Image,TouchableOpacity,WebView,ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Globalstyle from '../../../../asset/css/global_style';

export default class Toolbar extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
        title: this.props.title,
		transactionId:'',
		isLoading:true,
		
    };
  }
  
   componentDidMount() {
	    this.getTheData();  
   }
   
   async getTheData() {
	      let transactionId  = this.props.transactionId ;
		  this.setState({
				transactionId:transactionId,
				isLoading:false,
		  })
	   
   }
  
  render(){
	  
	  let Url = 'https://blockchain.info/tx/'+this.state.transactionId;
    return(
		<WebView source={{uri: Url}} />
    );
  }
}

