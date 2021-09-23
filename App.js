/**
 * f21-Blue
 * Created by Marquel
 *
 *
 *
 */

import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./app/components/views/loginScreen";
import RoostStackScreen from "./app/navigator/RootNav/RootStackScreen";
import signupScreen from "./app/components/views/signupScreen";
import ForgotScreen from "./app/components/views/forgotScreen";
import { View } from "react-native";



/*
export default class App extends React.Component{
  render(){
    return(
        <NavigationContainer>
          <RootStackScreen/>
        </NavigationContainer>
    )
  }
}

*/


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



export default function App() {
  return(
    <NavigationContainer>
    <NavStack />
  </NavigationContainer>
  )
}


