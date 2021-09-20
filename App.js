/**
 * f21-Blue
 * Created by Marquel
 *
 * 
 *
 */



import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import RootStackScreen from './Screens/RootStackScreen';

export default class App extends React.Component{
  render(){
    return(
        <NavigationContainer>
          <RootStackScreen/>
        </NavigationContainer>
    )
  }
}


