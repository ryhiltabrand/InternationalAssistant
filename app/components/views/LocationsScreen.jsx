import * as React from "react";
import { Text, View, TextInput, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapViewer } from "../../utilities/MapViewer";
/*import { MapClass } from "../../utilities/algorithms";*/


import MapView from 'react-native-maps';
import useState from 'react';


const LocationsScreen = () => {
  
    return (
        
        <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        />
    );
  
}

const LStack = createNativeStackNavigator();
  const LocationStackScreen = ({navigation}) => (
    <LStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#ADD8E6',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <LStack.Screen name="LocationScreen" component={LocationsScreen} options={{
            title:'Locations',
            headerTitleAlign:"center",
            headerLeft: () => (
                <FontAwesome5.Button name="bars" size={25} color="#000000" backgroundColor="#ADD8E6" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
            )
            }} />
    </LStack.Navigator>
    );
export default LocationStackScreen;
