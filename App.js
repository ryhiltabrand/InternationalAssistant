/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * 
 *
 */

import React from 'react';
import { Text, View } from 'react-native';
import Tabs from './app/navigator/bottomNav/tabs'
import { NavigationContainer } from '@react-navigation/native';

const HelloWorldApp = () => {
  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  )
}
export default HelloWorldApp;
