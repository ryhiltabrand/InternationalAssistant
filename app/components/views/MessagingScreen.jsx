import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const MessageScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>SendMessages!</Text>
      </View>
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
          <MessageStack.Screen name="LocationScreen" component={MessageScreen} options={{
          title:'Messaging',
          headerTitleAlign:"center",
          headerLeft: () => (
              <FontAwesome5.Button name="bars" size={25} color="#000000" backgroundColor="#ADD8E6" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
          )
          }} />
  </MessageStack.Navigator>
  ); 
export default MessageStackScreen;
