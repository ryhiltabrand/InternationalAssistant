import * as React from "react";
import { Text, View, Button, SafeAreaView, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyRequest from "./MyRequest";
import AllRequest from "./AllRequests";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const HelpScreen = () => {
  return (
      <MyTabs />
        
  );
};
/*
 <SafeAreaView style={styles.container}>
        <View style={styles.body}>
        <Tabs />
        </View>
      </SafeAreaView>
  );
  */
const Tab = createMaterialTopTabNavigator();

/*const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ position: "absolute" }}
      initialRouteName="MyRequest"
      screenOptions={({ route }) => ({
        tabBarIconStyle: { display: "none" },
        tabBarLabelStyle: {
          fontSize: 20,
          padding: 0,
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
      <Tab.Screen name="My Requests" component={MyRequest} />
      <Tab.Screen name="All Requests" component={AllRequest} />
    </Tab.Navigator>
  );
};*/


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
          backgroundColor: "#ADD8E6",
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
  </>
);
const styles = StyleSheet.create({
  container: {
    
    flexDirection: "column",
  },
  body: {
    flex:1,
    margin: 30
  }
});
export default HelpStackScreen;
