import * as React from "react";
import { Text, View, TextInput, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { MapViewer } from "./MapViewer";
import { DisplayList } from "./DisplayListScreen";
import { PostLocationScreen } from "./PostLocationScreen";
const Stack = createStackNavigator();
function NavStack() {
  return (
    <Stack.Navigator initialRouteName="MapViewer">
      <Stack.Screen
        name="MapViewer"
        component={MapViewer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DisplayList"
        component={DisplayList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostLocationScreen"
        component={PostLocationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const LocationsScreen = () => {
  return <NavStack />;
};

const LStack = createNativeStackNavigator();
const LocationStackScreen = ({ navigation }) => (
  <LStack.Navigator
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
    <LStack.Screen
      name="LocationScreen"
      component={LocationsScreen}
      options={{
        title: "Locations",
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
  </LStack.Navigator>
);
export default LocationStackScreen;
