import * as React from "react";
import { Text, View, Button, SafeAreaView, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventMatcher from "../../shardedComponents/IAEvents/eventmatching";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { StackRouter } from "react-navigation";
import MyEvents from "./MyEvents";
import CampusEvents from "./CampusEvents"
import LocalEvents from "./LocalEvents";

const Nstack = createStackNavigator();
const NavStack = () => {
  return (
    <Nstack.Navigator initialRouteName="EventScreen1">
        <Nstack.Screen name="EventScreen1" component={EventsScreen} options={{ headerShown: false}} />
    </Nstack.Navigator>
  );
}
const EventsScreen = () => {
  return (
    <EventTabs />
  );
}

const Tab = createMaterialTopTabNavigator(); 

function EventTabs () {
  return(
    <Tab.Navigator>
      <Tab.Screen name="Recommended Events" component={MyEvents}/>
      <Tab.Screen name="Campus Events" component={CampusEvents}/>
      <Tab.Screen name="Local Events" component={LocalEvents}/>
    </Tab.Navigator>
  );
}

const EventStack = createNativeStackNavigator();

const EventStackScreen = ({ navigation }) => (
  <>
    <EventStack.Navigator
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
      <EventStack.Screen
        name="EventScreen"
        component={NavStack}
        options={{
          title: "Events",
          headerTitleAlign: "center",
          headerTitleStyle: {color:"white"},
          headerLeft: () => (
            <FontAwesome5.Button
              name="bars"
              size={25}
              color="#000000"
              backgroundColor="#202898"
              onPress={() => navigation.openDrawer()}
            ></FontAwesome5.Button>
          ),
        }}
      />
    </EventStack.Navigator>
  </>
);

export default EventStackScreen; 
