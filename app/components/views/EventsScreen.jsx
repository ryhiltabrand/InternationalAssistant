import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import eventRecommendation, { eventmatcher, getInfo, gettinguserinfo } from "./../../utilities/eventmatching"
import gettingeventinfo from "./../../utilities/eventmatching";
import FriendMatcher from "./../../utilities/eventmatching";
import EventMatcher from "./../../utilities/eventmatching";

const EventsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Events!</Text>
        <Button onPress = { EventMatcher } title = "event"/>
    </View>
  );
}

const EStack = createNativeStackNavigator();
  const EventStackScreen = ({navigation}) => (
    <EStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#ADD8E6',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <EStack.Screen name="EventScreen" component={EventsScreen} options={{
            title:'Events',
            headerTitleAlign:"center",
            headerLeft: () => (
                <FontAwesome5.Button name="bars" size={25} color="#000000" backgroundColor="#ADD8E6" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
            )
            }} />
    </EStack.Navigator>
    ); 

export default EventStackScreen;
