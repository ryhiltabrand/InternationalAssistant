import React, {Component} from 'react';
import { View, ScrollView, TouchableOpacity, Image, TouchableHighlight, ImageEditor, Text } from 'react-native';



const ProfileScreen = () => {
  
    return (
        <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          <View style={{alignItems:'center'}}>
            <Image source={require('../../assets/favicon.png')} 
            style={{width:120,height:120,borderRadius:100,marginTop:15}}></Image>
            <Text style={{fontSize:20, fontWeight:'bold',padding:10}}> Eric Lin </Text>
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

export default ProfileScreen;
