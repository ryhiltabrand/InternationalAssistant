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
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './app/navigator/bottomNav/tabs'
import { NavigationContainer } from '@react-navigation/native';
import DrawerN from './app/navigator/topNav/drawer';




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


import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './app/navigator/bottomNav/tabs'
import { NavigationContainer } from '@react-navigation/native';
import DrawerN from './app/navigator/topNav/drawer';

export default function App() {
  return(
    <NavigationContainer>
      <DrawerN/>
    </NavigationContainer>
  )
}


