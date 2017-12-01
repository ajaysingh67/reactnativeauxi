import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,TouchableHighlight,TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux'; 

export default class Index extends Component<{}> {
	
	async onclickbtn(){
		  Actions.emailSignup();
	}
  render() {
    return (
      <View style={styles.container}>
	       <View style={styles.header}>
		      <Image source={require('../../../asset/images/logo.png')} style={styles.logo} />
		   </View>
           <Image source={require('../../../asset/images/bitcoin.jpg')} style={styles.backgroundimage} >
		      <View>
			     <TouchableHighlight style={styles.buttonContainer} onPress={this.onclickbtn} underlayColor={'#23527c'}>
				    <Text style={styles.buttonText}>Get Start</Text>
				 </TouchableHighlight>
			  </View>
		   </Image>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1},
  backgroundimage: {flex: 6,width:null,alignItems:'stretch',justifyContent:'center'},
  header:{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'},
  logo:{justifyContent:'center'},
  buttonContainer:{paddingVertical:15, backgroundColor: '#337ab7',alignSelf:'stretch',marginLeft:20,marginRight:20},
  buttonText:{textAlign:'center',color:'#ffffff',fontWeight:'bold',fontSize:20},
});
