/**
 * f21-Blue
 * Created by Marquel
 *
 *
 *
 */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Component } from "react";
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
import firebase from "../../../utilities/firebase";
import "firebase/auth";
import { EventRegister } from "react-native-event-listeners";
//import Loc from '../../shardedComponents/userProfile'


const user = firebase.auth().currentUser;
export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState();
  };

  userLogin = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              
              if(!user.emailVerified) {
                alert("Your email has not been confirmed.")
                EventRegister.emit('auth', user.uid)
                
              }else {
                EventRegister.emit('auth', user.uid)
              }
              
            } else {
              // User not logged in or has just logged out.
              
            }
          });
          //console.log(Object.keys(res))
          
        })
        /*.then((res) => {
          this.authStateListener();
          console.log(res);
          console.log("User logged-in successfully!");
          this.setState({
            email: "",
            password: "",
          });
        })*/
        .catch((error) => this.setState({ errorMessage: error.message }));
    }
  };
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.bkimage}>
        <View style={styles.container}>
          <Text style={styles.logo}>International Assistant</Text>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="white"
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

          <TouchableOpacity
            onPress={() => {
              this.userLogin();
            }}
            style={styles.loginBtn}
          >
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Forgot");
            }}
          >
            <Text style={styles.forgot}>
              Forgot your login details? Get help signing in.
            </Text>
          </TouchableOpacity>

          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
              style={styles.signupBtn}
            >
              <Text style={styles.signupText}>
                Don't have an account? Sign up.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bkimage: {
    flex: 1,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
    marginTop: 60,
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "black",
    fontSize: 15,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "rgba(94, 8, 203, 0.7)",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "black",
    fontSize: 15,
  },
  signupBtn: {
    width: 1000,
    backgroundColor: "rgba(94, 8, 203, 0.7)",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 0,
  },
  signupText: {
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    color: "black",
    fontSize: 15,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
