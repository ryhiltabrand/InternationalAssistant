import * as React from "react";
import { Text, View, Button, SafeAreaView, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyQuestion from "./Myquestions";
import AllQuestion from "./allQuestion";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import IndividualRequest from "../HelpRequests/IndividualRequests";
import Questionview from "../QandA/individualQuestion";
import OthersRequests from "../HelpRequests/OthersRequests";

const Stack = createStackNavigator();
function NavStack() {
    return (
      <Stack.Navigator initialRouteName="HelpScreen1">
         <Stack.Screen name="HelpScreen1" component={HelpScreen} options={{ headerShown: false }} />
         <Stack.Screen name="IndividualQuestion" component={Questionview} options={{ headerShown: false }} />
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
      <Tab.Screen name="My Questions" component={MyQuestion} />
      <Tab.Screen name="All Questions" component={AllQuestion} />
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
        name="QandAScreen"
        component={NavStack}
        options={{
          title: "Q&A",
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

export default HelpStackScreen;
