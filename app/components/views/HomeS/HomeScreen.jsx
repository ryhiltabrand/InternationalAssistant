import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigationState } from "@react-navigation/core";

//console.log(useNavigationState)

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor:"#003057" }}>
      <Button onPress={() => console.log("hello")} title="you are home" />
    </View>
  );
};

const HStack = createNativeStackNavigator();
const HomeStackScreen = ({ navigation }) => (
  <HStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#202898",
      },
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        title: "Home",
        headerTitleAlign: "center",
        headerTitleStyle: {color:"white"},
        headerLeft: () => (
          <FontAwesome5.Button
            name="bars"
            size={25}
            color="white"
            backgroundColor="#202898"
            onPress={() => navigation.openDrawer()}
          ></FontAwesome5.Button>
        ),
      }}
    />
  </HStack.Navigator>
);
export default HomeStackScreen;
