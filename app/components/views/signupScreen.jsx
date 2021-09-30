/**
 * f21-Blue
 * Created by Marquel
 *
 * 
 *
 */


import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import bgImage from '../../assets/bgImage.jpg';
import { Component } from 'react';
import firebase from "../../utilities/firebase";
export class signupScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      name: '',
      email: '',
      password: '',
      isLoading: false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  registerUser = () => {
    if((this.state.email === '' && this.state.password === '')) {
      Alert.alert('Enter details to signup!')
    } else if(this.state.email.endsWith('.edu') !== true){
      Alert.alert('Emails must be school emails')
      }
      else{
        this.setState({
          isLoading: true,
        })
        firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.name
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Login')
      })
      .catch(error => this.setState({ errorMessage: error.message })) 
      }    
    }
  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ImageBackground source={bgImage} style={styles.bkimage}>
          <View style={styles.container}>
          <Text style={styles.logo}>International Assistant</Text>
         <Text style={styles.signupText}>Sign up to find friends and connect with others.</Text>
            
         <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Name" 
                placeholderTextColor="white"
                onChangeText={(val) => this.updateInputVal(val, 'name')}/>
            </View>
        
        <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Email" 
                placeholderTextColor="white"
                onChangeText={(val) => this.updateInputVal(val, 'email')}/>
            </View>
        
            <View style={styles.inputView} >
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Password" 
                placeholderTextColor="white"
                onChangeText={(val) => this.updateInputVal(val, 'password')}/>
            </View>
        
        <TouchableOpacity onPress= {() => this.registerUser()} style={styles.signupBtn}>
              <Text style={styles.signupBtnText}>Sign up</Text>
            </TouchableOpacity>
          
          <Text style={styles.policy}>By signing up, you agree to our Terms & Privacy Policy.</Text>
        
         <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")} style={styles.loginBtn}>
              <Text style={styles.loginText}>Already have an account? Sign In.</Text>
            </TouchableOpacity>
           </View>
        
          </View>
        </ImageBackground>
        );
    };
  }

export default signupScreen;

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
    color:'rgba(225, 225, 225, 1.0)',
    marginTop: 60,
    marginBottom:40
  },
  signupText:{
    color:"white",
	fontSize:15,
	padding:20
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    height:30,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  signupBtn:{
    width:"80%",
    backgroundColor:'rgba(182, 32, 32, 0.7)',
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  signupBtnText:{
    color:"white",
	fontSize:15
  },
  policy:{
    color:"white",
    fontSize:15,

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
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});