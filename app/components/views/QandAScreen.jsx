import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const QandAScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>You got Questions!</Text>
      </View>
    );
  }
  const QAStack = createNativeStackNavigator();
  const QAStackScreen = ({navigation}) => (
  <QAStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#ADD8E6',
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <QAStack.Screen name="LocationScreen" component={QandAScreen} options={{
          title:'Q&A',
          headerTitleAlign:"center",
          headerLeft: () => (
              <FontAwesome5.Button name="bars" size={25} color="#000000" backgroundColor="#ADD8E6" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
          )
          }} />
  </QAStack.Navigator>
  ); 
export default QAStackScreen;
