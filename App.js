import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './app/navigator/bottomNav/tabs'
import { NavigationContainer } from '@react-navigation/native';
import DrawerN from './app/navigator/topNav/drawer';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerN/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
