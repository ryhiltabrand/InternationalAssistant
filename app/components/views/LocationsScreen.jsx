import * as React from "react";
import { Text, View, TextInput, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { MapViewer } from "../views/MapViewer";
import { DisplayList } from "../views/DisplayListScreen";
import { GeoFinder } from "../../utilities/GeoFinder";
import { PostLocationScreen } from "../views/PostLocationScreen";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
function NavStack() {
    return (
      <Stack.Navigator initialRouteName="Login">
         <Stack.Screen name="MapViewer" component={MapViewer} options={{ headerShown: false }} />
         <Stack.Screen name="DisplayList" component={DisplayList} options={{ headerShown: false }} />
         <Stack.Screen name="PostLocationScreen" component={PostLocationScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }


const LocationsScreen = () => {
    return (
        <><NavStack>

        </NavStack></>

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
