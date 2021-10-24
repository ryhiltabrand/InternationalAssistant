/**
 * f21-Blue
 * Created by Marquel
 *
 *
 *
 */

 import * as React from "react";


 import { createStackNavigator } from "@react-navigation/stack";
 import LoginScreen from "./app/components/views/loginScreen";
 import signupScreen from "./app/components/views/signupScreen";
 import ForgotScreen from "./app/components/views/forgotScreen";
 import { NavigationContainer } from '@react-navigation/native';
 import DrawerN from './app/navigator/topNav/drawer';
 import LandingScreen from "./app/navigator/LandingScreen";
 
 
 
 
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
 /*
 
 const user = firebase.auth().currentUser;
 if(user) {
  Alert.alert("User is logged in")
 }
 else{
   Alert.alert("User is not logged in")
 }
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
 */
 export default function App() {
   return(
     <LandingScreen/>
   )
 }
 
 
 