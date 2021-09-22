import * as React from "react";
import { Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { EventStackScreen, HelpStackScreen, HomeStackScreen, LocationStackScreen, QAStackScreen } from "./../../components/views/index";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
          <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Locations') {
                iconName =  'search-location';
              } else if (route.name === 'Events') {
                iconName =  'calendar-alt';
              } else if (route.name === 'Help') {
                iconName =  'hands-helping';
              } else if (route.name === 'Q&A') {
                iconName =  'question-circle';
              }
              
  
              // You can return any component that you like here!
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            },
            tabBarStyle: { 
                            position: 'absolute',
                            bottom: 50,
                            left: 20,
                            right: 20,
                            elevation: 0,
                            height: 200,
                            borderRadius: 15
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'black',
            tabBarStyle: {position: 'absolute'},
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: '#1E90FF',
            tabBarInactiveBackgroundColor: '#ADD8E6',
            headerShown: false
          })}
          >
            <Tab.Screen name="Locations" component={LocationStackScreen} />
            <Tab.Screen name="Events" component={EventStackScreen} />
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Help" component={HelpStackScreen} />
            <Tab.Screen name="Q&A" component={QAStackScreen} />
        </Tab.Navigator>  
  );
};
export default Tabs;
