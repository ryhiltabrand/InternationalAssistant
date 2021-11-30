import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Image, TouchableHighlight, ImageEditor, Text } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigationState } from '@react-navigation/core';
import { FontAwesome5 } from "@expo/vector-icons";
import { getCurrentUserUID } from '../../utilities/currentUser';
import * as database from '../../utilities/database';


// console.log("the routes in profile screen", route)
// console.log("the navigation in profile screen", navigation)
//console.log(useNavigationState)
//const { UID } = route.params;
const currentUser = new database.UsersCollection();
var currentUserInfo = {
  name: 'N/A',
  dateofbirth: 'N/A',
  currentUser: 'N/A',
  bio: 'N/A',
  language: 'N/A',
  country: 'N/A'
}


//console.log(currentUserInfo);

// function userInfo({ route }) {
//   console.log(route.params.UID)
currentUser.getAccountInformation("yVHnHIqhsOYbVbWOM6TbjpU4N3x1").then((result) => {
  currentUserInfo = result;
});
//}
//userInfo()

//var stuff = userInfo
function getName() {
  return currentUserInfo.name;
}

function getBirthday() {
  return currentUserInfo.dateofbirth
}

function getBiography() {
  return currentUserInfo.bio
}

function getLanguages() {
  return currentUserInfo.language
}

function getCountry() {
  return currentUserInfo.country
}

function getProfilePicture() { 
  return currentUserInfo.profilepicture
}
//}

//console.log("Print waht inside profilescreen ", currentUserInfo);

const ProfileScreen = () => {


  //console.log("Print waht inside profilescreen ", currentUserInfo);
  return (
    <View>
      

        <View style={{ alignItems: 'center' }}>
          <Image source={{uri: getProfilePicture()}}
            style={{ width: 120, height: 120, borderRadius: 100, marginTop: 15 }}></Image>
          <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}> {getName()} </Text>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'grey' }}> {getBirthday()} </Text>
        </View>
        <View style={{
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#619BAC',
          width: '90%',
          padding: 10,
          paddingBottom: 22,
          borderRadius: 10,
          shadowOpacity: 80,
          elevation: 15,
          marginTop: 20
        }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', padding: 10, marginLeft: 10 }}>
            {"About Me: " + getBiography()}
          </Text>
        </View>
        <View style={{
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#619BAC',
          width: '90%',
          padding: 10,
          paddingBottom: 22,
          borderRadius: 10,
          shadowOpacity: 80,
          elevation: 15,
          marginTop: 20
        }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', padding: 10, }}>{"Languages: " + getLanguages()} </Text>
        </View>
        <View style={{
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#619BAC',
          width: '90%',
          padding: 10,
          paddingBottom: 22,
          borderRadius: 10,
          shadowOpacity: 80,
          elevation: 15,
          marginTop: 20,
        }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', padding: 10, }}>{"Country: " + getCountry()} </Text>
        </View>
      
    </View>

  );

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
