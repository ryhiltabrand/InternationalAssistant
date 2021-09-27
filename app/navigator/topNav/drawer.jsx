import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  ProfileStackScreen,
  SettingsStackScreen,
} from "./../../components/views/index";
import Tabs from "../bottomNav/tabs";
import DrawerCustom from "./drawerView";
import landingScreen from "../LandingScreen";
import LoginScreen from "../../components/views/loginScreen";

const Drawer = createDrawerNavigator();

const DrawerN = () => {
  var profileName = "TEMP";
  var profileEmail = "TEMP";

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
      drawerContent={(props) => (
        <DrawerCustom
          profileName={profileName}
          profileEmail={profileEmail}
          {...props}
        />
      )}
    >
      <Drawer.Screen name="Homes" component={Tabs} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      <Drawer.Screen name="Settings" component={SettingsStackScreen} />
      <Drawer.Screen name="Signout" component={LoginScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerN;
