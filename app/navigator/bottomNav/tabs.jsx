import * as React from "react";
import { Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { EventsScreen, HelpScreen, HomeScreen, LocationsScreen, QandAScreen } from "./../../components/views/index";
//import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HStack = createNativeStackNavigator();
//const Drawer = createDrawerNavigator();

const HomeStackScreen = ({navigation}) => (
  <HStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <HStack.Screen name="Home" component={HomeScreen} options={{
          title:'Overview',
          headerLeft: () => (
              <FontAwesome5.Button name="bars" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
          )
          }} />
  </HStack.Navigator>
  );
  

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
              } else if (route.name === 'QandA') {
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
            tabBarActiveBackgroundColor: '#ADD8E6',
            tabBarInactiveBackgroundColor: '#1E90FF',
            headerShown: false
          })}
          >
            <Tab.Screen name="Locations" component={LocationsScreen} />
            <Tab.Screen name="Events" component={EventsScreen} />
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Help" component={HelpScreen} />
            <Tab.Screen name="QandA" component={QandAScreen} />
        </Tab.Navigator>  
  );
};
export default Tabs;
