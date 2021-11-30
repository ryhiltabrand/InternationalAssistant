import * as React from "react";
import ChatScreen from "./ChatScreen";
import {useState} from 'react';
import { MessageListScreen } from "./MessageListScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();
function NavStack(){
  return(
    <Stack.Navigator initialRouteName="MessageListScreen">
         <Stack.Screen name="MessageListScreen" component={MessageListScreen} options={{ headerShown: false }} />
         <Stack.Screen name="ChatScreen" component={ChatScreen} options={({route}) => ({
           title: route.params.name,
           headerTitleAlign: "center",
           headerBackTitleVisible: false,
         })} />
         </Stack.Navigator>
    );
}

const MessageScreen = () =>{
  return(
    <NavStack />
    );
}

  const MessageStack = createNativeStackNavigator();
  const MessageStackScreen = ({navigation}) => (
  <MessageStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#ADD8E6',
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <MessageStack.Screen name="MessageScreen" component={MessageScreen} options={{
          title:'Messaging',
          headerTitleAlign:"center",
          headerLeft: () => (
              <FontAwesome5.Button name="bars" size={25} color="#000000" backgroundColor="#ADD8E6" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
          )
          }} />
  </MessageStack.Navigator>
  ); 
export default MessageStackScreen;
