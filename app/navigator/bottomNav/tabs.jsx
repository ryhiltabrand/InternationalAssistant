import * as React from "react";
import { Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { EventsScreen, HelpScreen, HomeScreen, LocationsScreen, QandAScreen } from "./../../components/views/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
          headerLeft: () => (
              <FontAwesome5.Button name="bars" size={25} color="#000000" backgroundColor="#ADD8E6" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
          )
          }} />
  </HStack.Navigator>
  );

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
            headerLeft: () => (
                <FontAwesome5.Button name="bars" size={25} color="#000000" backgroundColor="#ADD8E6" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
            )
            }} />
    </EStack.Navigator>
    ); 

  const LStack = createNativeStackNavigator();
  const LocationStackScreen = ({navigation}) => (
    <LStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#ADD8E6',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <LStack.Screen name="LocationScreen" component={LocationsScreen} options={{
            title:'Locations',
            headerLeft: () => (
                <FontAwesome5.Button name="bars" size={25} color="#000000" backgroundColor="#ADD8E6" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
            )
            }} />
    </LStack.Navigator>
    );

    const HelpStack = createNativeStackNavigator();
    const HelpStackScreen = ({navigation}) => (
    <HelpStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#ADD8E6',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <HelpStack.Screen name="HelpScreen" component={HelpScreen} options={{
            title:'Help',
            headerLeft: () => (
                <FontAwesome5.Button name="bars" size={25} color="#000000" backgroundColor="#ADD8E6" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
            )
            }} />
    </HelpStack.Navigator>
    ); 

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
            headerLeft: () => (
                <FontAwesome5.Button name="bars" size={25} color="#000000" backgroundColor="#ADD8E6" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
            )
            }} />
    </QAStack.Navigator>
    ); 

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
          <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
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
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'black',
            tabBarStyle: {position: 'absolute'},
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: '#ADD8E6',
            tabBarInactiveBackgroundColor: '#1E90FF',
            headerShown: false
          })}
          >
            <Tab.Screen name="Locations" component={LocationStackScreen} />
            <Tab.Screen name="Events" component={EventStackScreen} />
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Help" component={HelpStackScreen} />
            <Tab.Screen name="Q&A" component={QAStackScreen} />
        </Tab.Navigator>  
  );
};
export default Tabs;
