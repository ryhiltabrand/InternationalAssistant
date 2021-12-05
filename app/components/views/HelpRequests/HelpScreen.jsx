import * as React from "react";
import { Text, View, Button, SafeAreaView, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyRequest from "./MyRequest";
import AllRequest from "./AllRequests";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import IndividualRequest from './IndividualRequests'
import OthersRequests from "./OthersRequests";
import MessageScreen from "../Message/MessagingScreen";

const Stack = createStackNavigator();
function NavStack() {
    return (
      <Stack.Navigator initialRouteName="HelpScreen1">
         <Stack.Screen name="HelpScreen1" component={HelpScreen} options={{ headerShown: false }} />
         <Stack.Screen name="IndividualRequest" component={IndividualRequest} options={{ headerShown: false }} />
         <Stack.Screen name="OthersRequests" component={OthersRequests} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
const HelpScreen = () => {
  return (
      <MyTabs />
        
  );
};

const Tab = createMaterialTopTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Requests" component={MyRequest} />
      <Tab.Screen name="All Requests" component={AllRequest} />
    </Tab.Navigator>
  );
}

const HelpStack = createNativeStackNavigator();

const HelpStackScreen = ({ navigation }) => (
  <>
    <HelpStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#202898",
        },
        headerShown:true,
        headerTintColor: "#000000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HelpStack.Screen
        name="HelpScreen"
        component={NavStack}
        options={{
          title: "Help",
          headerTitleAlign: "center",
          headerTitleStyle: {color:"white"},
          headerLeft: () => (
            <FontAwesome5.Button
              name="bars"
              size={25}
              color="white"
              backgroundColor="#202898"
              onPress={() => navigation.openDrawer()}
            ></FontAwesome5.Button>
          ),
        }}
      />
      <HelpStack.Screen
      name="Message"
      component={MessageScreen}
      options={{headerShown: false}}
      />
    </HelpStack.Navigator>
  </>
);

export default HelpStackScreen;
