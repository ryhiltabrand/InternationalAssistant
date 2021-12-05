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
import { KeyboardAvoidingView, Dimensions } from 'react-native';
import firebase from "../../../utilities/firebase";
import { getCurrentUserUID } from '../../../utilities/currentUser';
import * as database from '../../../utilities/database';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "@react-native-community/datetimepicker";
export class signupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      behavior: 'position',
      name: '',
      email: '',
      password: '',
      country: '',
      language: '',
      birthday: new Date(),
      school: '',
      native: '',
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
      nativeOpen: false,
      nativeItem: [
        { label: 'yes', value: 'International' },
        { label: 'no', value: 'Native' }
      ],
      languageOpen: false,
      languageItem: [
        { label: 'English', value: 'english' },
        { label: 'Mandarin', value: 'mandarin' },
        { label: 'Spanish', value: 'spanish' },
        { label: 'Italian', value: 'italian' },
        { label: 'Hindi', value: 'hindi' },
        { label: 'French', value: 'french' },
        { label: 'Japanese', value: 'japanese' },
      ],
      showDatePicker: false,
    }
    this.setSchoolValue = this.setSchoolValue.bind(this);
    this.setNativeValue = this.setNativeValue.bind(this);
    this.setLanguageValue = this.setLanguageValue.bind(this);

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

  //Native Dropdown Menu
  setNativeOpen = (nativeOpen) => {
    console.debug('opens native dropdown')
    this.setState({
      nativeOpen
    });
    console.debug(this.state.nativeOpen)
  }

  setNativeValue(callback) {
    this.setState(state => (
      console.debug('the value being inputed is ', callback(state.value)),
      { native: callback(state.value) }
    )
    );
  }

  //language Dropdown Menu
  setLanguageOpen = (languageOpen) => {
    console.debug('opens language dropdown')
    this.setState({
      languageOpen
    });
  }

  setLanguageValue(callback) {
    this.setState(state => (
      console.debug('the value being inputed is ', callback(state.value)),
      { language: callback(state.value) }
    )
    );
  }

  onSchoolOpen() {
    signupScreen.setNativeOpen
    signupScreen.setLanguageOpen
  }

  //Birthday inputView
  setDateVisible = (visible) => {
    this.setState({ showDatePicker: visible });
  };
  setDateClose = (visible) => {
    this.setState({ showDatePicker: visible });
  };
  setDate(date) {
    this.setState({ birthday: date });
  }
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
          <View style={styles.signupView}>
            <Text style={styles.signupText}>Sign up to find friends and connect with others.</Text>
          </View>
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

          {/* <View style={styles.inputView} >
              <TextInput
                style={styles.inputText}
                placeholder="Birthday"
                placeholderTextColor="rgba(225, 225, 225, 1.0)"
                onChangeText={(val) => this.updateInputVal(val, 'birthday')} />
            </View> */}
          <View style={styles.birthdayView}>
            <TouchableOpacity onPress={this.setDateVisible}>
              <Text style={styles.birthDayText}> birthday </Text>
            </TouchableOpacity>
          </View>
          {this.state.showDatePicker && (
            <DateTimePicker
              value={this.state.birthday}
              display="default"
              onChange={(e, d) => {
                if (Platform.OS === "ios") {
                  this.setState({ Day: d });
                  onChange(d);
                } else {
                  this.setDateClose(false);
                  var Month = "";
                  if (Number(d.getMonth() + 1) < 11) {
                    Month = "0" + (d.getMonth() + 1);
                  } else {
                    Month = d.getMonth() + 1;
                  }
                  var Day = "";
                  if (Number(d.getDate()) < 10) {
                    Day = "0" + (d.getDate() + 1);
                  } else {
                    Day = d.getDate() + 1;
                  }
                  var Year = d.getFullYear();
                  var Date = Year + "-" + Month + "-" + Day;
                  this.setState({ birthday: Date });
                  // console.log(this.state.birthday)
                }
              }}
              style={{ backgroundColor: "white" }}
            />
          )}
          <View style={styles.drownDownSection}>

            <View style={styles.inputView} >
              <DropDownPicker
                style={styles.singleSelect}
                open={this.state.languageOpen}
                value={this.state.language}
                items={this.state.languageItem}
                setOpen={this.setLanguageOpen}
                setValue={this.setLanguageValue}
                dropDownContainerStyle={styles.singleSelectDropdown}
                placeholder="Language"
                zIndex={4000}
                zIndexInverse={5000}
              />
            </View>

            <View style={styles.inputView} >

              <DropDownPicker
                style={styles.singleSelect}
                open={this.state.schoolOpen}
                value={this.state.school}
                items={this.state.schoolItem}
                setOpen={this.setSchoolOpen}
                setValue={this.setSchoolValue}
                dropDownContainerStyle={styles.singleSelectDropdown}
                placeholder="University"
                zIndex={4000}
                zIndexInverse={3000}
                onOpen={this.onSchoolOpen}
              />
            </View>
            <View style={styles.inputView} >
              <DropDownPicker
                style={styles.singleSelect}
                open={this.state.nativeOpen}
                value={this.state.native}
                items={this.state.nativeItem}
                setOpen={this.setNativeOpen}
                setValue={this.setNativeValue}
                dropDownContainerStyle={styles.singleSelectDropdown}
                placeholder="Are you an international student"
                zIndex={5000}
                zIndexInverse={1000}
              />
            </View>
          </View>
          <View style={styles.signupBtn} >
            <TouchableOpacity onPress={() => this.registerUser()}>
              <Text style={styles.signupBtnText}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")} style={styles.loginBtn}>
            <Text style={styles.loginText}>Already have an account? Sign In.</Text>
          </TouchableOpacity>

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
    //justifyContent: 'center',
  },
  bkimage: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,

  },
  signupView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,

  },
  signupText: {
    color: "white",
    fontSize: 15,
    padding: 20
  },
  inputView: {
    flex: 1,
    backgroundColor: "#465881",
    height: 30,
    width: "80%",
    margin: 10,
    justifyContent: "center",
  },
  inputText: {
    height: 50,
    color: "white"
  },
  birthdayView: {
    flex: 1,
    backgroundColor: "#465881",
    height: 30,
    width: "80%",
    margin: 10,
    justifyContent: "center",
    borderRadius: 25,

  },
  birthDayText: {
    height: 50,
    color: "white",
    marginTop: 30,
    textAlign: "center"
  },
  signupBtn: {
    flex: 1,
    width: "80%",
    backgroundColor: 'rgba(182, 32, 32, 0.7)',
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
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
    width: '100%',
    //janky way to apply height
    height: 31,
    backgroundColor: 'rgba(94, 8, 203, 0.7)',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 140,
  },
  loginText: {
    justifyContent: 'center',
    alignItems: 'center',
    //bottom: 0,
    color: "black",
    fontSize: 15
  },
  //Dropdown Styles
  drownDownSection: {
    flexDirection: 'row',
  },
  singleSelect: {},
  singleSelectDropdown: {
  },
  multiSelect: {},
  multiSelectDropdown: {}
});