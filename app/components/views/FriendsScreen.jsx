import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FriendsListScreen from "./FriendsList";
import FriendsSearchScreen from "./FriendSearch";
import FriendsMatchScreen from "./FriendMatching";

const FriendsScreen = () => {
  return (
    <Tabs>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          onPress={() => console.log("hello")}
          title="Welcome to Firends"
        />{" "}
      </View>
    </Tabs>
  );
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      //initialRouteName="FriendsList"
      screenOptions={({ route }) => ({
        tabBarIconStyle: { display: "none" },
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 15,
          padding: 14,
          position: "absolute",
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
      <Tab.Screen
        name="FriendsList"
        component={FriendsListScreen}
      />
      <Tab.Screen name="FriendSearch" component={FriendsSearchScreen} />
      <Tab.Screen name="AutoMatching" component={FriendsMatchScreen} />
    </Tab.Navigator>
  );
};

const FStack = createNativeStackNavigator();

const FriendsStackScreen = ({ navigation }) => (
  <FStack.Navigator
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
    <FStack.Screen
      name="FriendsScreen"
      component={FriendsScreen}
      options={{
        title: "Friends",
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
  </FStack.Navigator>
);
export default FriendsStackScreen;
