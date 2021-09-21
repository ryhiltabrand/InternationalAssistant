import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { EventsScreen, HelpScreen, HomeScreen, LocationsScreen, QandAScreen } from "./../../components/views/index";
import Tabs from '../bottomNav/tabs'
import DrawerContent from "./drawerView";

const Drawer = createDrawerNavigator();

const DrawerN = () => {
    return (
      <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
          drawerContent = {props => <DrawerContent {...props}/>}
        >
          <Drawer.Screen name="Homes" component={Tabs} />
      </Drawer.Navigator>
    );
  };

export default DrawerN;