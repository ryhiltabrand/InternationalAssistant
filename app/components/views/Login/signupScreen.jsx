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
import bgImage from './../../../assets/bgImage.jpg';
import { Component, useCallback } from 'react';
import firebase from "../../../utilities/firebase";
import { getCurrentUserUID } from '../../../utilities/currentUser';
import * as database from '../../../utilities/database';
import DropDownPicker from 'react-native-dropdown-picker';
export class signupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      country: '',
      language: '',
      birthday: '',
      school: 'Old Dominion University',
      native: 'Native',
      isLoading: false,
      //dropdownStuff
      schoolOpen: false,
      schoolItem: [
        { label: 'Virginia Tech', value: 'Virginia Tech' },
        { label: 'Old Dominion University', value: 'Old Dominion University' },
        { label: 'George Mason', value: 'George Mason' },
        { label: 'Norfolk State University', value: 'Norfolk State University' },
        { label: 'William and Mary', value: 'William and Mary' }
      ],
    }
    this.setSchoolValue = this.setSchoolValue.bind(this);
  }
  //user inputs
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  //dropDown accessors and mutators

  //School Dropdown Menu
  setSchoolOpen = (schoolOpen) => {
    console.debug('opens school dropdown')
    this.setState({
      schoolOpen
    });
  }

  setSchoolValue(callback) {
    this.setState(state => (
      console.debug('the value being inputed is ', callback(state.value)),
      { school: callback(state.value) }
    )
    );
  }
  //Birthday inputView

  registerUser = () => {

    var newUser = new database.UsersCollection();

    if ((this.state.email === '' && this.state.password === '')) {
      Alert.alert('Enter details to signup!')
    } else if (this.state.email.endsWith('.edu') !== true) {
      Alert.alert('Emails must be school emails')
    }
    else {
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

          //Apply attributes and create DB object
          newUser.setName(this.state.name)
          newUser.setDateofBirth(this.state.birthday)
          console.log('b4 getting email')
          newUser.setEmail(this.state.email)
          newUser.setLanguage([this.state.language])
          newUser.setCountry(this.state.country)
          newUser.setBio('Hi! My name is' + this.state.name + '. I\'m new to the app. Say hello!')
          newUser.setProfilePicture('https://res.cloudinary.com/teepublic/image/private/s--rh264MCI--/t_Preview/b_rgb:484849,c_limit,f_jpg,h_630,q_90,w_630/v1517893785/production/designs/2341977_3.jpg')
          newUser.setSchool(this.state.school)
          console.log('b4 getting native')
          newUser.setNative(this.state.native)
          console.log('b4 getting current UID')
          newUser.setUID(getCurrentUserUID())
          newUser.createUserAccountInformation()
          console.log('add users to db')

          //clear previous entry?
          this.setState({
            isLoading: false,
            displayName: '',
            email: '',
            password: '',
            name: '',
            email: '',
            password: '',
            country: '',
            language: '',
            school: '',
            native: '',
            birthday: ''
          }
          )
          console.log('clearing out and clearing state')
          this.props.navigation.navigate('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))

    }
  }
  render() {

    return (
      <ImageBackground source={bgImage} style={styles.bkimage}>
        <View style={styles.container}>
          <Text style={styles.logo}>International Assistant</Text>
          <Text style={styles.signupText}>Sign up to find friends and connect with others.</Text>

          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Name"
              placeholderTextColor="rgba(225, 225, 225, 1.0)"
              onChangeText={(val) => this.updateInputVal(val, 'name')} />
          </View>

          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="rgba(225, 225, 225, 1.0)"
              onChangeText={(val) => this.updateInputVal(val, 'email')} />
          </View>

          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="rgba(225, 225, 225, 1.0)"
              onChangeText={(val) => this.updateInputVal(val, 'password')} />
          </View>

          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Country"
              placeholderTextColor="rgba(225, 225, 225, 1.0)"
              onChangeText={(val) => this.updateInputVal(val, 'country')} />
          </View>

          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Language"
              placeholderTextColor="rgba(225, 225, 225, 1.0)"
              onChangeText={(val) => this.updateInputVal(val, 'language')} />
          </View>

          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Birthday"
              placeholderTextColor="rgba(225, 225, 225, 1.0)"
              onChangeText={(val) => this.updateInputVal(val, 'birthday')} />
          </View>

          {/* <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="School"
              placeholderTextColor="rgba(225, 225, 225, 1.0)"
              onChangeText={(val) => this.updateInputVal(val, 'school')} />
          </View> */}
          <DropDownPicker
            // style={styles.singSelect}
            open={this.state.schoolOpen}
            value={this.state.school}
            items={this.state.schoolItem}
            setOpen={this.setSchoolOpen}
            setValue={this.setSchoolValue}
          //dropDownContainerStyle={styles.singleSelectDropdown}
          // zIndex={3000}
          // zIndexInverse={1000}
          />

          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Are you an international or native student"
              placeholderTextColor="rgba(225, 225, 225, 1.0)"
              onChangeText={(val) => this.updateInputVal(val, 'native')} />
          </View>

          <TouchableOpacity onPress={() => this.registerUser()} style={styles.signupBtn}>
            <Text style={styles.signupBtnText}>Sign up</Text>
          </TouchableOpacity>

          <Text style={styles.policy}>By signing up, you agree to our Nonexistence Terms & Privacy Policy.</Text>

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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
  bkimage: {
    flex: 1
  },
  logo: {
    fontWeight: "bold",
    fontSize: 25,
    color: 'rgba(225, 225, 225, 1.0)',
    marginBottom: 40
  },
  signupText: {
    color: "white",
    fontSize: 15,
    padding: 20
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    height: 30,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  signupBtn: {
    width: "80%",
    backgroundColor: 'rgba(182, 32, 32, 0.7)',
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  signupBtnText: {
    color: "white",
    fontSize: 15
  },
  policy: {
    color: "white",
    fontSize: 15,

  },
  loginBtn: {
    width: 1000,
    backgroundColor: 'rgba(94, 8, 203, 0.7)',
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 0
  },
  loginText: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    color: "black",
    fontSize: 15
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
  },
  //Dropdown Styles
  singSelect: {},
  singleSelectDropdown: {},
  multiSelect: {},
  multiSelectDropdown: {}
});