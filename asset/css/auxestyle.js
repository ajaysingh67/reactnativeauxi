import { StyleSheet } from 'react-native';
const auxestyle = StyleSheet.create({
  container: {flex: 1},
  heading:{fontSize:20,fontWeight:'bold',marginBottom:20},
  bodycontainer: {flex: 7,width:null,alignItems:'stretch',justifyContent:'center',backgroundColor:'#004a7c' },
  formcontainer:{margin:20,alignSelf:'stretch',borderWidth:1,backgroundColor:'#fff',padding:30},
  header:{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'},
  logo:{justifyContent:'center'},
  tokenmessage:{color:'#2dbc10',marginBottom:15,fontSize:17},
  recoverlink:{justifyContent:'flex-end',textAlign:'right',marginBottom:10},
  input:{height:40,backgroundColor: '#fff',padding:10,marginBottom:10,borderWidth:1,borderColor:'#ccc',fontSize:16},
  buttonContainer:{paddingVertical:10, backgroundColor: '#337ab7',alignSelf:'stretch'},
  buttonText:{textAlign:'center',color:'#ffffff',fontWeight:'bold',fontSize:20},
  errormessage:{textAlign:"center",color:"#e81414",marginBottom:7},
  
})

export default auxestyle;
