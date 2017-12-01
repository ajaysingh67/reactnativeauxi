import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,TextInput,TouchableHighlight,ScrollView,AsyncStorage} from 'react-native';
import Drawers from './drawer';
import { Actions } from 'react-native-router-flux'; 
import Globalstyle from '../../../../asset/css/global_style';
import Camera from 'react-native-camera';

export default class Qrcodecamara extends Component<{}> {
	
		constructor(){
			super();
			
			
		}
		async onSubmitBtn(code){
			var qrCode = code.data ;
			Actions.sendpayment({qrCode:qrCode});
			// alert();
			
		}
		
		
		render() {
			let scanArea = null
				scanArea = (
				  <View style={styles.rectangleContainer}>
					<View style={styles.rectangle} />
				  </View>
				)
			  
			  return (
				<Camera
				  ref={(cam) => {
					this.camera = cam;
				  }}
				  style={styles.preview}
				  onBarCodeRead={(code) =>this.onSubmitBtn(code)}
				  aspect={Camera.constants.Aspect.fill}>
				     {scanArea}
				</Camera>
			  )
		
		  }
}
const styles = StyleSheet.create({
 container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
   camera: {
    flex: 1
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rectangle: {
    height: 300,
    width: 300,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  }
});

