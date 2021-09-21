/**
 * RootStack
 * RootStack is a StackNavigator constuctor
 * This will help cycle through screens if needed
 *
 * Created by Marquel 
 * 
 * 
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

 import SignupScreen from './../views/signupScreen';
 import LoginScreen from './../views/loginScreen';
 import ForgotScreen from './../views/forgotScreen';

 const RootStack = createNativeStackNavigator();
 
 const RootStackScreen = ({navigation}) => (
     <RootStack.Navigator screenOptions={{headerShown: false,}}>
          <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
          <RootStack.Screen name="SignupScreen" component={SignupScreen}/>
          <RootStack.Screen name="ForgotScreen" component={ForgotScreen}/>
     </RootStack.Navigator>


 );

 export default RootStackScreen;
 