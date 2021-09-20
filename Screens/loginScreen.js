/**
 * f21-Blue
 * Created by Marquel
 *
 * 
 *
 */


import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import bgImage from './../Assets/bgImage.jpg';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
    return (
	  <ImageBackground source={bgImage} style={styles.bkimage}>
      <View style={styles.container}>
	  
        <Text style={styles.logo}>International Assistant</Text>
		
		<View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email" 
            placeholderTextColor='white'
            onChangeText={(userEmail) => setEmail(userEmail)}/>
        </View>
		
		 <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password" 
            placeholderTextColor='rgba(225, 225, 225, 1.0)'
            onChangeText={(userPassword) => setPassword(userPassword)}/>
        </View>
		
		<TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
		
        <TouchableOpacity onPress={() => navigation.navigate('ForgotScreen')}>
          <Text style={styles.forgot}>Forgot your login details? Get help signing in.</Text>
        </TouchableOpacity>
		
		<View style={{flex: 1, justifyContent: 'flex-end'}}>
		<TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} style={styles.signupBtn}>
          <Text style={styles.signupText}>Don't have an account? Sign up.</Text>
        </TouchableOpacity>
        </View>

  
      </View>
	   </ImageBackground>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bkimage:{
    flex: 1
  },
  logo:{
    fontWeight:"bold",
    fontSize:25,
    color:"black",
    marginBottom:40
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
  loginBtn:{
    width:"80%",
    backgroundColor:'rgba(94, 8, 203, 0.7)',
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"black",
	fontSize:15
  },
  signupBtn:{
    width:1000,
    backgroundColor:'rgba(94, 8, 203, 0.7)',
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:0
  },
  signupText:{
	justifyContent: 'center', 
    alignItems: 'center',
    bottom: 0,
    color:"black",
	fontSize:15
  }
});