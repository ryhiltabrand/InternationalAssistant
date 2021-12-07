import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import Pic from "./picArea"
import EditProfile from "./EditScreen"
import { createStackNavigator } from "@react-navigation/stack";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pic: null,
      name: null,
    };
  }
  componentDidMount() {
    this.Profile();
  }
  componentWillUnmount() {}
  clearState = () => {
    this.setState({
      pic: null,
    });
  };

  Profile = async () => {
    const currentUser = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const doc = await currentUser.get();
    const profpic = doc.data().profilepicture;
    const name = doc.data().name;
    this.setState({
      pic: profpic,
      name: name,
    });
  };
  //<View style = { styles.container }></View>  
  //container: { flex: 1, backgroundColor: '#9FA8DA' // Set your own custom Color 
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ }}>
          <Pic />
        </ScrollView>
      </View>
    );
  }
}

const Nstack = createStackNavigator();
const NavStack = () => {
  return (
    <Nstack.Navigator initialRouteName="PROFSCREEN">
        <Nstack.Screen name="PROFSCREEN" component={Pic} options={{ headerShown: false}} />
        <Nstack.Screen name="EditProfileScreen" component={EditProfile} options={{ headerShown: false}} />
    </Nstack.Navigator>
  );
}

const PStack = createNativeStackNavigator();
const ProfileStackScreen = ({ navigation }) => (
  <PStack.Navigator
    screenOptions={{
      headerStyle: {
        //backgroundColor: "#ADD8E6",
        backgroundColor: "#202898",
      },
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <PStack.Screen
      name="ProfileScreen"
      component={NavStack}
      options={{
        title: "Profile",
        headerTitleAlign: "center",
        headerTitleStyle: {color:"white"},
        headerLeft: () => (
          <FontAwesome5.Button
            name="bars"
            size={25}
            color="white"
            backgroundColor="#202898"
            //color="#000000"
            //backgroundColor="#ADD8E6"
            onPress={() => navigation.openDrawer()}
          ></FontAwesome5.Button>
        ),
      }}
    />
  </PStack.Navigator>
);

export default ProfileStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  flag: {
    height: 197,
    width: 394,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
  },
  text: {
    color: "#52575D",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
});
