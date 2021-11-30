/**
 * f21-Blue
 * 
 *
 */

import * as React from "react";
import { View, LogBox } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./app/components/views/loginScreen";
import signupScreen from "./app/components/views/signupScreen";
import ForgotScreen from "./app/components/views/forgotScreen";
import { NavigationContainer } from "@react-navigation/native";
import DrawerN from "./app/navigator/topNav/drawer";
import { EventRegister } from "react-native-event-listeners";
LogBox.ignoreLogs(['Warning: ...']);
const Stack = createStackNavigator();
function NavStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={signupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function Application() {
  return (
    <NavigationContainer>
      <DrawerN />
    </NavigationContainer>
  );
}


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      signedIn: null,
    };
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener("auth", (data) => {
      this.setState({
        signedIn : data
      });
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  render() {
    return this.state.signedIn == null ? (
      <>
        <NavStack />
      </>
    ) : (
      <>
        <Application />
      </>
    );
  }
}
