import React, { Component } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Image, 
  Text,
  StyleSheet,
} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from 'firebase';

class ProfileScreen extends Component{
  constructor(props){
    super(props)
    this.state={
      pic:null,
      name:null,
    }
  }
  componentDidMount() {
    this.Profile()
  }
  componentWillUnmount() {

  }
  clearState = () =>{
    this.setState({
      pic:null,
    })
  }

  Profile = async() =>{
    const currentUser = firebase.firestore().collection("users")
    .doc(firebase.auth().currentUser.uid)
    const doc = await currentUser.get()
    const profpic = doc.data().profilepicture
    const name =  doc.data().name
    this.setState({
      pic:profpic,
      name:name,
    })

  }
  render(){
    return(
      <View>
      <View style={{alignSelf:'center'}}>
      <View style={styles.profileImage}>
        <Image style={styles.image} source={{uri: this.state.pic}}/>
      </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.text,{fontWeight:"200", fontSize:36}]}>
          {this.state.name}
        </Text>
      </View>
      </View>
        )
  }
}

const PStack = createNativeStackNavigator();
const ProfileStackScreen = ({ navigation }) => (
  <PStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#ADD8E6",
      },
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <PStack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        title: "Profile",
        headerTitleAlign: "center",
        headerLeft: () => (
          <FontAwesome5.Button
            name="bars"
            size={25}
            color="#000000"
            backgroundColor="#ADD8E6"
            onPress={() => navigation.openDrawer()}
          ></FontAwesome5.Button>
        ),
      }}
    />
  </PStack.Navigator>
);


export default ProfileStackScreen;

const styles= StyleSheet.create({
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  profileImage:{
    width:200,
    height:200,
    borderRadius:200,
    overflow: "hidden"
  },
  text: {
    color: "#52575D"
  },
infoContainer: {
  alignSelf: "center",
  alignItems: "center",
  marginTop: 16
  },
})