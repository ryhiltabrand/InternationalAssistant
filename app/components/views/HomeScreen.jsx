import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import updatefriends from "../shardedComponents/Addfriends";


const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => console.log("hello")}
        title="you are home"
      />
      <Button
        onPress={()=> updatefriends("cm0IF5KopLgxnJTUtfi403kJuMl2")}
        title= "fake"/>
        
    </View>
  )
}

const HStack = createNativeStackNavigator();
const HomeStackScreen = ({navigation}) => (
  <HStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#ADD8E6',
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <HStack.Screen name="HomeScreen" component={HomeScreen} options={{
          title:'Home',
          headerTitleAlign:"center",
          headerLeft: () => (
              <FontAwesome5.Button name="bars" size={25} color="#000000" backgroundColor="#ADD8E6" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
          )
          }} />
  </HStack.Navigator>
  );
export default HomeStackScreen;
