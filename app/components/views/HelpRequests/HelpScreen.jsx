import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyRequest from "./MyRequest";
import AllRequest from "./AllRequests";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const HelpScreen = () => {
  return (
    
      <View style={{ flex: 10, justifyContent: "center", alignItems: "center" }}>
        <Tabs>
        <Text>Help Is Here!</Text>
        </Tabs>
      </View>
    
  );
};

const Tab = createMaterialTopTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      //initialRouteName=""
      screenOptions={({ route }) => ({
        tabBarIconStyle: { display: "none" },
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 15,
          padding: 20,
          
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { position: "absolute" },
        tabBarShowLabel: true,
        tabBarActiveBackgroundColor: "#1E90FF",
        tabBarInactiveBackgroundColor: "#ADD8E6",
        headerShown: false,
      })}
    >
      <Tab.Screen name="MyRequests" component={MyRequest} />
      <Tab.Screen name="AllRequests" component={AllRequest} />
    </Tab.Navigator>
  );
};

const HelpStack = createNativeStackNavigator();

const HelpStackScreen = ({ navigation }) => (
  <HelpStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#ADD8E6",
      },
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HelpStack.Screen
      name="HelpScreen"
      component={HelpScreen}
      options={{
        title: "Help",
        headerTitleAlign: "center",
        headerLeft: () => (
          <FontAwesome5.Button
            name="bars"
            size={25}
            color="#000000"
            backgroundColor="#ADD8E6"
            onPress={() => navigation.openDrawer()}
          ></FontAwesome5.Button>
        ),
      }}
    />
  </HelpStack.Navigator>
);

export default HelpStackScreen;
