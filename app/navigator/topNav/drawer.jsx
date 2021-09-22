import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ProfileScreen, SettingsScreen } from "./../../components/views/index";
import Tabs from "../bottomNav/tabs";
import DrawerContent from "./drawerView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Drawer = createDrawerNavigator();

const PStack = createNativeStackNavigator();
const ProfileStackScreen = ({ navigation }) => (
  <PStack.Navigator
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
    <PStack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        title: "CHANGE TO DATABASE NAME",
        headerTitleAlign:"center",
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
  </PStack.Navigator>
);

const SStack = createNativeStackNavigator();
const SettingsStackScreen = ({ navigation }) => (
  <SStack.Navigator
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
    <SStack.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={{
        title: "Settings",
        headerTitleAlign:"center",
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
  </SStack.Navigator>
);
const DrawerN = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#ADD8E6",
          width: 200,
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Homes" component={Tabs} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      <Drawer.Screen name="Settings" component={SettingsStackScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerN;
