import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons'

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}
function LocationsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Locations!</Text>
    </View>
  );
}
function EventsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Events!</Text>
    </View>
  );
}
function HelpScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Help Is Here!</Text>
    </View>
  );
}
function QandAScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>You got Questions!</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        
          <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {position: 'absolute'},
            tabBarShowLabel: true,
            tabBarActiveBackgroundColor: '#ADD8E6',
            tabBarInactiveBackgroundColor: '#1E90FF'
          })}
          >
            <Tab.Screen name="Locations" component={LocationsScreen} />
            <Tab.Screen name="Events" component={EventsScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Help" component={HelpScreen} />
            <Tab.Screen name="QandA" component={QandAScreen} />
          </Tab.Navigator>
        
      );
}
export default Tabs;