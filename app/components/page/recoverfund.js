import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,TextInput,TouchableHighlight} from 'react-native';
import { Actions } from 'react-native-router-flux'; 

export default class Recoverfund extends Component<{}> {
	 onclickbtn(){
		  Actions.logintoken();
	}
	onBack(){
		  Actions.emailSignup();
	}
	
  render() {
    return (
     <View style={styles.container}>
	       <View style={styles.header}>
		      <Image source={require('../../../asset/images/logo.png')} style={styles.logo} />
		   </View>
		      <View style={styles.bodycontainer} >
			      <View style={styles.formcontainer} >
				      <Text style={styles.heading}>Recover Funds</Text>
					  <Text style={styles.title1} >Recover bitcoins from your lost wallet</Text>
					  <Text style={styles.title2} >Step 1 of 2: Enter 16 word passphrase</Text>
					  <Text style={styles.title3} >You should always pair login if you have access to your Wallet ID and password. Recovering your funds will create a new Wallet ID.</Text>
                      <Text style={styles.label} >Your Recovery Passphrase</Text>
					  <Text style={styles.message} >Enter your 16 recovery words with spaces to recover your funds & transactions</Text>					  
					  <TextInput style={styles.input}   placeholderTextColor='#ccc' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({email: text}) }/>
					  <TouchableHighlight onPress={this.onBack}>	
							<Text style={styles.goback} >Go Back</Text>
					  </TouchableHighlight>
					 <TouchableHighlight style={styles.buttonContainer} onPress={this.onclickbtn} underlayColor={'#23527c'}>
						<Text style={styles.buttonText}>Continue</Text>
					 </TouchableHighlight>
				 </View>
			  </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1},
  heading:{fontSize:20,fontWeight:'bold',marginBottom:10,color:'#564f4f'},
  bodycontainer: {flex: 6,width:null,alignItems:'stretch',justifyContent:'center',backgroundColor:'#004a7c' },
  formcontainer:{margin:20,alignSelf:'stretch',borderWidth:1,backgroundColor:'#fff',padding:30},
  header:{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'},
  logo:{justifyContent:'center'},
  title1:{color:'#564f4f',marginBottom:10},
  title2:{color:'#564f4f',marginBottom:10,borderBottomWidth:1,borderColor:'#ccc',paddingBottom:10},
  title3:{color:'#F26C57',marginBottom:10},
  label:{color:'#564f4f',marginBottom:10,fontSize:16,fontWeight:'bold'},
  message:{color:'#564f4f',marginBottom:10},
  goback:{justifyContent:'flex-end',textAlign:'right',marginBottom:10},
  input:{height:40,backgroundColor: '#fff',padding:10,marginBottom:10,borderWidth:1,borderColor:'#ccc',fontSize:16},
  buttonContainer:{paddingVertical:10, backgroundColor: '#337ab7',alignSelf:'stretch'},
  buttonText:{textAlign:'center',color:'#ffffff',fontWeight:'bold',fontSize:20},
});
