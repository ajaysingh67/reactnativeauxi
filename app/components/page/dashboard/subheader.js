import React, { Component } from 'react'
import { Globalstyleheet,View,Text,Button} from 'react-native'
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
	  <View style={Globalstyle.subheadercontainer}>
		     <Text style={Globalstyle.topheading}>Be Your Own Bank.</Text>
			  <View style={{flexDirection: 'row'}} >
			     <Text style={Globalstyle.currencytext}>0.0 BTC</Text>
				 <Text style={Globalstyle.currencytext}>USD 0.0</Text>
			  </View>
			  <View style={{flexDirection: 'row'}} >
						<View style={Globalstyle.banklinks}>
						   <Button 
							  onPress={() => Actions.sendpayment()}
							  title="Send"
						   />
					    </View>
					    <View style={Globalstyle.banklinks}>
						   <Button
							  onPress={() => Actions.home()}
							  title="Request"
							  style={{color:'red'}}
						   />
				       </View> 
			  </View>
	  </View>
    );
  }
}

