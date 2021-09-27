import * as React from "react";


import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../components/views/loginScreen";
import signupScreen from "../components/views/signupScreen";
import ForgotScreen from "../components/views/forgotScreen";
import { NavigationContainer } from '@react-navigation/native';
import DrawerN from './topNav/drawer';
import firebase from "../utilities/firebase";
import "firebase/auth";

const user=firebase.auth().currentUser;
const Stack = createStackNavigator();
function NavStack() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="Register" component={signupScreen} options={{headerShown:false}} />
        <Stack.Screen name="Forgot" component={ForgotScreen} options={{headerShown:false}} />
      </Stack.Navigator>
    );
  }

  export default function landingScreen() {
    if(user)
    {
        return(
        <NavigationContainer>
            <DrawerN/>
        </NavigationContainer>
        )
    }
    else{
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
              <Stack.Screen name="Register" component={signupScreen} options={{headerShown:false}} />
              <Stack.Screen name="Forgot" component={ForgotScreen} options={{headerShown:false}} />
            </Stack.Navigator>
            </NavigationContainer>
          ); 
    }
  }