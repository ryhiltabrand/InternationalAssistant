/**
 * f21-Blue
 * Created by Marquel
 *
 * 
 *
 */

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import bgImage from '../../assets/bgImage.jpg';

const ForgotScreen = ({navigation}) => {
	
    const [email, setEmail] = useState();
	
    return (
	  <ImageBackground source={bgImage} style={styles.bkimage}>
      <View style={styles.container}>
		
	  <Image
	      style={{ width: 150, height: 150 }}
	      source={require('../../assets/lock.png')}
       />
	  <Text style={styles.header}>Trouble logging in?</Text>
        <Text style={styles.forgotText}>Enter your email and we'll send you a password reset link to get back into you account.</Text>
		
		<View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email" 
            placeholderTextColor='white'
            onChangeText={(userEmail) => setEmail(userEmail)}/>
        </View>
		
		<TouchableOpacity style={styles.linkBtn}>
          <Text style={styles.linkText}>Send Login Link</Text>
        </TouchableOpacity>
		
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot your login details? Get help signing in.</Text>
        </TouchableOpacity>
		
		<View style={{flex: 1, justifyContent: 'flex-end'}}>
		<TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.loginBtn}>
          <Text style={styles.loginText}>Back To Log In.</Text>
        </TouchableOpacity>
        </View>

  
      </View>
	   </ImageBackground>
    );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontWeight:"bold",
    fontSize:25,
    color:'black',
    marginBottom:40
  },
  bkimage:{
    flex: 1
  },
  forgotText:{
    color:"black",
	fontSize:15,
	padding:20
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"black",
    fontSize:15
  },
  linkBtn:{
    width:"80%",
    backgroundColor:'rgba(94, 8, 203, 0.7)',
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  linkText:{
    color:"black",
	fontSize:15
  },
  loginBtn:{
    width:1000,
    backgroundColor:'rgba(94, 8, 203, 0.7)',
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:0
  },
  loginText:{
	justifyContent: 'center', 
    alignItems: 'center',
    bottom: 0,
    color:"black",
	fontSize:15
  }
});