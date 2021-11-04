/**
 * f21-Blue
 * Created by Marquel
 *
 * 
 *
 */


 import React, { useState } from 'react';
 import {
   StyleSheet,
   Text,
   View,
   TextInput,
   TouchableOpacity,
   Image
 } from "react-native";
 import { Component } from 'react';
 import firebase from "../../utilities/firebase";

 export class PostLocationScreen extends Component {

  constructor(props){
    super(props);
    this.state={
      location_name: '',
      location_address: '',
      location_contributor: '',
      location_category: '',
      location_rating: ''
    }
  }

  componentDidMount() {
    console.log('mounted')
    firebase.firestore().collection('Locations')
      .get()
      .then( snapshot => {
     const locations = []
     snapshot.forEach( doc => {
       const data = doc.data()
       locations.push(data) 
     })
     this.setState({ locations: locations })
     })
     .catch( error => console.log(error))
  } 

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  uploadLocation = () => {
    firebase.firestore().collection('Locations')
      .add({
       name: this.state.location_name,
       address: this.state.location_address,
       contributor: this.state.location_contributor,
       category: this.state.location_category,
       rating: this.state.location_rating
      })
  }

   CustomRatingBar = () => {
    const [defaultRating, setdefaultRating] = useState(2);
    const [maxRating, setmaxRating] = useState([1,2,3,4,5]);
    const starImgFilled = '../../assets/star_filled.png';
    const starImgCorner = '../../assets/star_corner.png';
    return (
      <View style={styles.customRatingBarStyle} >
        {
          maxRating.map((item, key) => {
            return(
              <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setdefaultRating(item)}
              >

              <Image
                style={styles.starImgStyle}
                source={
                  item <= defaultRating
                    ? require(starImgFilled)
                    : require(starImgCorner)
                }
              />
              </TouchableOpacity>
            )
          })
        }
        <Text style={styles.TextStyle}>
          {defaultRating + ' / ' + maxRating.length}
          {console.log(defaultRating)}
        </Text>
    </View>
    )
  }

  render(){ 
    return (
       <View style={styles.container}>  
         <Text style={styles.titleText}>Enter a location to share with others.</Text> 
         <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Name" 
                placeholderTextColor="white"
                onChangeText={(val) => this.updateInputVal(val, 'location_name')}/>
         </View>
        
          <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Address" 
                placeholderTextColor="white"
                onChangeText={(val) => this.updateInputVal(val, 'location_address')}/>
          </View>
        
          <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Contributor" 
                placeholderTextColor="white"
                onChangeText={(val) => this.updateInputVal(val, 'location_contributor')}/>
          </View>

          <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Category" 
                placeholderTextColor="white"
                onChangeText={(val) => this.updateInputVal(val, 'location_category')}/>
          </View>

          <this.CustomRatingBar/>
        
          <TouchableOpacity onPress= {() => this.uploadLocation()} style={styles.SumbitBtn}>
              <Text style={styles.SumbitBtnText}>Sumbit</Text>
          </TouchableOpacity>
        
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("MapViewer")} style={styles.backBtn}>
              <Text style={styles.backText}>Back to MapViewer</Text>
          </TouchableOpacity>
          </View>
       </View>
        );
    };
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    titleText:{
      color:"black",
      padding:30
    },
    inputView:{
      width:"80%",
      backgroundColor:"#465881",
      height:30,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"white"
    },
    SumbitBtn:{
      width:"80%",
      backgroundColor:'rgba(182, 32, 32, 0.7)',
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    SumbitBtnText:{
      color:"white",
    fontSize:15
    },
    backBtn:{
      width:1000,
      backgroundColor:'rgba(94, 8, 203, 0.7)',
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:0
    },
    backText:{
    justifyContent: 'center', 
      alignItems: 'center',
      bottom: 0,
      color:"black",
    fontSize:15
    },
    customRatingBarStyle:{
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 30
    },
    starImgStyle: {
      width: 40,
      height: 40,
      resizeMode: 'cover'
    }
  });