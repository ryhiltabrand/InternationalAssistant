import * as React from "react";
import ChatScreen from "./ChatScreen";
import GroupChat from "./GroupChat";
import { MessageListScreen } from "./MessageListScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
function NavStack() {
  return (
    <Stack.Navigator initialRouteName="MessageListScreen">
      <Stack.Screen
        name="MessageListScreen"
        component={MessageListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerTitleStyle: {color:"white"},
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerStyle: {backgroundColor: "#404A5A",}
        })}
      />
      <Stack.Screen
        name="GroupChat"
        component={GroupChat}
        options={({ route }) => ({
          title: route.params.name,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}

const MessageScreen = () => {
  return <NavStack />;
};

const MessageStack = createNativeStackNavigator();
const MessageStackScreen = ({ navigation }) => (
  <MessageStack.Navigator
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
    <MessageStack.Screen
      name="MessageScreen"
      component={MessageScreen}
      options={{
        title: "Messaging",
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
  </MessageStack.Navigator>
);
export default MessageStackScreen;
