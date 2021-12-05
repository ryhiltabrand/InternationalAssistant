import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  ProfileStackScreen,
  SettingsStackScreen,
  FriendsStackScreen
} from "./../../components/views/index";
import Tabs from "../bottomNav/tabs";
import DrawerCustom from "./drawerView";
import LoginScreen from "../../components/views/Login/loginScreen";
import MessageStackScreen from "../../components/views/Message/MessagingScreen";
import firebase from "firebase"

const Drawer = createDrawerNavigator();

class DrawerN extends React.Component {
  //var profileName = "TEMP";
  //var profileEmail = "TEMP";
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentWillUnmount() {}
  
  render() { 
    console.log(this.state)
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#202898",
          width: 200,
          
        }        
      }}
      drawerContent={(props) => (
        <DrawerCustom
          {...props}
         
        />
      )}
    >
      <Drawer.Screen name="Homes" component={Tabs} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      <Drawer.Screen name="Settings" component={SettingsStackScreen} />
      <Drawer.Screen name="Friends" component={FriendsStackScreen} />
      <Drawer.Screen name="Messager" component={MessageStackScreen} />
    </Drawer.Navigator>
  );
}};

export default DrawerN;
