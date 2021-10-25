import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FriendsListScreen from "./FriendsList";
import FriendsSearchScreen from "./FriendSearch";


const FriendsScreen = () => {
  return (
      <Tabs> 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => console.log("hello")}
        title="Welcome to Firends"
      />    </View>
    </Tabs>
  )
}
  
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
            <Tab.Navigator
            //initialRouteName="FriendsList"
            screenOptions={({ route }) => ({
              /*tabBarIcon: ({ color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'Locations') {
                  iconName =  'search-location';
                } else if (route.name === 'Events') {
                  iconName =  'calendar-alt';
                } else if (route.name === 'Help') {
                  iconName =  'hands-helping';
                } else if (route.name === 'Q&A') {
                  iconName =  'question-circle';
                }
                
    
                // You can return any component that you like here!
                return <FontAwesome5 name={iconName} size={size} color={color} />;
              },
              tabBarStyle: { 
                              position: 'absolute',
                              bottom: 50,
                              left: 20,
                              right: 20,
                              elevation: 0,
                              height: 200,
                              borderRadius: 15
              },*/
              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'black',
              tabBarStyle: {position: 'absolute'},
              tabBarShowLabel: false,
              tabBarActiveBackgroundColor: '#1E90FF',
              tabBarInactiveBackgroundColor: '#ADD8E6',
              headerShown: false
            })}
            >
              {/*<Tab.Screen name="Home" component={HomeStackScreen} />
              <Tab.Screen name="Help" component={HelpStackScreen} />*/}
              <Tab.Screen name="FriendsList" component={FriendsListScreen} />
              <Tab.Screen name="FriendSearch" component={FriendsSearchScreen} />
          </Tab.Navigator>  
    );
  };


const FStack = createNativeStackNavigator();

const FriendsStackScreen = ({navigation}) => (
  <FStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#ADD8E6',
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <FStack.Screen name="FriendsScreen" component={FriendsScreen} options={{
          title:'Friends',
          headerTitleAlign:"center",
          headerLeft: () => (
              <FontAwesome5.Button name="bars" size={25} color="#000000" backgroundColor="#ADD8E6" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
          )
          }} />
  </FStack.Navigator>
  );
export default FriendsStackScreen;
