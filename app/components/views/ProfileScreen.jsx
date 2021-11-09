import React, {Component} from 'react';
import { View, ScrollView, TouchableOpacity, Image, TouchableHighlight, ImageEditor, Text } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "firebase"
import { LogBox } from 'react-native'
import { db } from './../../utilities/firebase'

const ProfileScreen = () => {
  
    return (
        <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          <View style={{alignItems:'center'}}>
            <Image source={require('../../assets/favicon.png')} 
            style={{width:120,height:120,borderRadius:100,marginTop:15}}></Image>
            <Text style={{fontSize:20, fontWeight:'bold',padding:10}}> </Text>
            <Text style={{fontSize:13, fontWeight:'bold',color:'grey'}}> 22, Male </Text>
          </View>
          <View style={{
                  alignSelf:'center',
                  flexDirection:'row',
                  justifyContent:'center',
                  backgroundColor:'#619BAC',
                  width:'90%',
                  padding:10, 
                  paddingBottom:22,
                  borderRadius:10, 
                  shadowOpacity:80, 
                  elevation:15,
                  marginTop:20
                  }}>
          <Text style={{fontSize:13, fontWeight:'bold',padding:10, marginLeft:10}}>
                      About Me: If you can speak chinese hit me up :)
          </Text>
          </View>
          <View style={{
                  alignSelf:'center',
                  flexDirection:'row',
                  justifyContent:'center',
                  backgroundColor:'#619BAC',
                  width:'90%',
                  padding:10, 
                  paddingBottom:22,
                  borderRadius:10, 
                  shadowOpacity:80, 
                  elevation:15,
                  marginTop:20
                  }}>
          <Text style={{fontSize:13, fontWeight:'bold',padding:10,}}>Languages: Chinese, English</Text>
          </View>
          <View style={{
                  alignSelf:'center',
                  flexDirection:'row',
                  justifyContent:'center',
                  backgroundColor:'#619BAC',
                  width:'90%',
                  padding:10, 
                  paddingBottom:22,
                  borderRadius:10, 
                  shadowOpacity:80, 
                  elevation:15,
                  marginTop:20,
                  }}>
          <Text style={{fontSize:13, fontWeight:'bold',padding:10,}}>Region: China</Text>
          </View>
          <TouchableOpacity style={{
                  alignSelf:'center',
                  flexDirection:'row',
                  justifyContent:'center',
                  backgroundColor:'#619BAC',
                  width:'90%',
                  padding:10, 
                  paddingBottom:22,
                  borderRadius:10, 
                  shadowOpacity:80, 
                  elevation:15,
                  marginTop:20,
                  marginBottom:40,
                  backgroundColor:'#000',
                  }}>
          <Text style={{fontSize:13, fontWeight:'bold',padding:10,color:'#fff'}}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
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
        title: "CHANGE TO DATABASE NAME",
        headerTitleAlign:"center",
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
