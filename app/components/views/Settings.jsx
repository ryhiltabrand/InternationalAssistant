import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => console.log("1")}
        title="Change some things"
      />
    </View>
  )
}

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
export default SettingsStackScreen;
