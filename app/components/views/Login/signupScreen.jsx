/**
 * f21-Blue
 * Created by Marquel
 *
 *
 *
 */

import React, { useState } from "react";
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
import bgImage from "./../../../assets/bgImage.jpg";
import { Component, useCallback } from "react";
import { KeyboardAvoidingView, Dimensions } from "react-native";
import firebase from "../../../utilities/firebase";
import { getCurrentUserUID } from "../../../utilities/currentUser";
import * as database from "../../../utilities/database";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import MultiSelect from "react-native-multiple-select";
export class signupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      behavior: "position",
      name: "",
      email: "",
      password: "",
      country: "",
      language: [],
      birthday: new Date(),
      school: "",
      native: "",
      isLoading: false,
      //dropdownStuff
      schoolOpen: false,
      schoolItem: [
        { label: "Virginia Tech", value: "Virginia Tech" },
        { label: "Old Dominion University", value: "Old Dominion University" },
        { label: "George Mason", value: "George Mason" },
        {
          label: "Norfolk State University",
          value: "Norfolk State University",
        },
        { label: "William and Mary", value: "William and Mary" },
      ],
      nativeOpen: false,
      nativeItem: [
        { label: "yes", value: "International" },
        { label: "no", value: "Native" },
      ],
      languageItem: [
        { id: "Arabic", name: "Arabic" },
        { id: "Cantonese", name: "Cantonese" },
        { id: "English", name: "English" },
        { id: "French", name: "French" },
        { id: "Gujarati", name: "Gujarati" },
        { id: "Hindi", name: "Hindi" },
        { id: "Italian", name: "Italian" },
        { id: "Japanese", name: "Japanese" },
        { id: "Korean", name: "Korean" },
        { id: "Mandarin", name: "Mandarin" },
        { id: "Portuguese", name: "Portuguese" },
        { id: "Russian", name: "Russian" },
        { id: "Spanish", name: "Spanish" },
      ],
      countryOpen: false,
      countryItem: [
        { label: "Algeria", value: "Algeria" },
        { label: "Brazil", value: "Brazil" },
        { label: "Canada", value: "Canada" },
        { label: "China", value: "China" },
        { label: "Egypt", value: "Egypt" },
        { label: "France", value: "France" },
        { label: "India", value: "India" },
        { label: "Italy", value: "Italy" },
        { label: "Japan", value: "Japan" },
        { label: "Mexico", value: "Mexico" },
        { label: "Portugal", value: "Portugal" },
        { label: "Russia", value: "Russia" },
        { label: "South Korea", value: "South Korea" },
        { label: "Spain", value: "Spain" },
        { label: "United Kingdom", value: "United Kingdom" },
        { label: "United States", value: "United States" },
      ],
      //dates
      showDatePicker: false,
    };

    this.setSchoolValue = this.setSchoolValue.bind(this);
    this.setNativeValue = this.setNativeValue.bind(this);
    this.setCountryValue = this.setCountryValue.bind(this);
  }
  //user inputs
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  //dropDown accessors and mutators

  //School Dropdown Menu
  setSchoolOpen = (schoolOpen) => {
    console.debug("opens school dropdown");
    this.setState({
      schoolOpen,
    });
    this.setState({
      countryOpen: false,
      nativeOpen: false,
      languageOpen: false,
    });
  };

  setSchoolValue(callback) {
    this.setState(
      (state) => (
        console.debug("the value being inputed is ", callback(state.value)),
        { school: callback(state.value) }
      )
    );
  }

  //Native Dropdown Menu
  setNativeOpen = (nativeOpen) => {
    console.debug("opens native dropdown");
    this.setState({
      nativeOpen,
    });
    this.setState({
      countryOpen: false,
      languageOpen: false,
      schoolOpen: false,
    });
  };

  setNativeValue(callback) {
    this.setState(
      (state) => (
        console.debug("the value being inputed is ", callback(state.value)),
        { native: callback(state.value) }
      )
    );
  }

  //language Dropdown Menu
  setLanguageValue = (language) => {
    console.debug("lang =: ", language);
    this.setState({ language });
    console.debug("language is: ", this.state.language);
  };

  //Country Dropdown Menu
  setCountryOpen = (countryOpen) => {
    console.debug("opens country dropdown");
    this.setState({
      countryOpen,
    });
    this.setState({
      languageOpen: false,
      nativeOpen: false,
      schoolOpen: false,
    });
    console.debug(this.state.countryOpen);
  };

  setCountryValue(callback) {
    this.setState(
      (state) => (
        console.debug("the value being inputed is ", callback(state.value)),
        { country: callback(state.value) }
      )
    );
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

    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signup!");
    } else if (this.state.email.endsWith(".edu") !== true) {
      Alert.alert("Emails must be school emails");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.sendEmailVerification();

          alert("Please Verify your Email");

          res.user.updateProfile({
            displayName: this.state.name,
          });
          console.log("User registered successfully!");

          //Apply attributes and create DB object
          newUser.setName(this.state.name);
          newUser.setDateofBirth(this.state.birthday);
          console.log("b4 getting email");
          newUser.setEmail(this.state.email);
          newUser.setLanguage(this.state.language);
          newUser.setCountry(this.state.country);
          newUser.setBio(
            "Hi! My name is " +
              this.state.name +
              ". I'm new to the app. Say hello!"
          );
          newUser.setProfilePicture(
            "https://kb.spinbackup.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
          );
          newUser.setSchool(this.state.school);
          console.log("b4 getting native");
          newUser.setNative(this.state.native);
          console.log("b4 getting current UID");
          newUser.setUID(getCurrentUserUID());
          newUser.createUserAccountInformation();
          console.log("add users to db");

          //clear previous entry?
          this.setState({
            isLoading: false,
            displayName: "",
            email: "",
            password: "",
            name: "",
            email: "",
            password: "",
            country: "",
            language: "",
            school: "",
            native: "",
            birthday: "",
          });
          console.log("clearing out and clearing state");
          this.props.navigation.navigate("Login");
          auth.signOut();
        })
        .catch((error) => this.setState({ errorMessage: error.message }));
    }
  };
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.bkimage}>
        <View style={styles.container}>
          <View style={styles.signupView}>
            <Text style={styles.signupText}>
              Sign up to find friends and connect with others.
            </Text>
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Name"
              placeholderTextColor="rgba(225, 225, 225, 1.0)"
              onChangeText={(val) => this.updateInputVal(val, "name")}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="rgba(225, 225, 225, 1.0)"
              onChangeText={(val) => this.updateInputVal(val, "email")}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="rgba(225, 225, 225, 1.0)"
              onChangeText={(val) => this.updateInputVal(val, "password")}
            />
          </View>

          {/*<View style={styles.birthdayView}>
            <TouchableOpacity onPress={this.setDateVisible}>
              <Text style={styles.birthDayText}> birthday </Text>
            </TouchableOpacity>
          </View>
          this.state.showDatePicker && (
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
            )*/}
          <View style={styles.drownDownSection}>
            <View styles={styles.multiSelect}>
              <MultiSelect
                hideTags
                items={this.state.languageItem}
                uniqueKey="id"
                ref={(component) => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.setLanguageValue}
                selectedItems={this.state.language}
                selectText="Select Languages"
                searchInputPlaceholderText="Search Languages..."
                onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
                styleMainWrapper={styles.multiSelect}
              />
            </View>

            <DropDownPicker
              style={styles.singleSelect}
              open={this.state.countryOpen}
              value={this.state.country}
              items={this.state.countryItem}
              setOpen={this.setCountryOpen}
              setValue={this.setCountryValue}
              dropDownContainerStyle={styles.singleSelectDropdown}
              placeholder="Country"
              zIndex={3000}
              zIndexInverse={1000}
              onOpen={this.onCountryOpen}
            />

            <DropDownPicker
              style={styles.singleSelect}
              open={this.state.schoolOpen}
              value={this.state.school}
              items={this.state.schoolItem}
              setOpen={this.setSchoolOpen}
              setValue={this.setSchoolValue}
              dropDownContainerStyle={styles.singleSelectDropdown}
              placeholder="University"
              zIndex={2000}
              zIndexInverse={2000}
            />
            <DropDownPicker
              style={styles.singleSelect}
              open={this.state.nativeOpen}
              value={this.state.native}
              items={this.state.nativeItem}
              setOpen={this.setNativeOpen}
              setValue={this.setNativeValue}
              dropDownContainerStyle={styles.singleSelectDropdown}
              placeholder="Are you an international student"
              zIndex={1000}
              zIndexInverse={3000}
            />
          </View>
          <View style={styles.signupBtn}>
            <TouchableOpacity onPress={() => this.registerUser()}>
              <Text style={styles.signupBtnText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginBtn}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles.loginText}>
                Already have an account? Sign In.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default signupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: 'center',
  },
  bkimage: {
    flex: 1,
    position: "absolute",
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
    padding: 20,
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
    color: "white",
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
    textAlign: "center",
  },
  signupBtn: {
    flex: 1,
    width: "80%",
    backgroundColor: "rgba(182, 32, 32, 0.7)",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  signupBtnText: {
    color: "white",
    fontSize: 15,
  },
  policy: {
    color: "white",
    fontSize: 15,
  },
  loginBtn: {
    width: "100%",
    //janky way to apply height
    height: "100%",
    backgroundColor: "rgba(94, 8, 203, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
    marginTop: 25,
    marginBottom: "100%",
    //paddingTop: 20
    flex: 1,
  },
  loginText: {
    justifyContent: "center",
    alignItems: "center",
    //bottom: 0,
    color: "black",
    fontSize: 20,
  },
  //Dropdown Styles
  drownDownSection: {
    flexDirection: "column",
    width: "80%",
    padding: 10,
  },
  singleSelect: {
    margin: 5,
    height: 40,
  },
  singleSelectDropdown: {
    position: "absolute",
    margin: 5,
  },
  multiSelect: {
    marginLeft: 7,
  },
});
