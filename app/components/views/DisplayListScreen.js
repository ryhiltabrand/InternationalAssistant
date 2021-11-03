
 import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Button,
  FlatList
} from "react-native";
  
import React, { Component } from 'react';
import firebase from "../../utilities/firebase";

export class DisplayList extends Component{

  constructor(props) {
    super(props);
    this.state = {
      locationList: [],
      location_name: '',
      location_address: '',
      location_contributor: '',
      location_rating: '',
    };
}

onLocationsReceived = (locationList) => {
  console.log(locationList);
  this.setState(prevState => ({
  locationList: prevState.locationList = locationList
  }));
}

getLocations = () => {

  var locationList = [];

  console.log('Non-async getLocations()')
  console.log('mounted')
  firebase.firestore().collection('Locations')
    .get()
    .then( snapshot => {

   snapshot.forEach((doc) => {
    const locationItem = doc.data();
    locationItem.id = doc.id;
    locationList.push(locationItem);
    })

  this.onLocationsReceived(locationList);
  })
   .catch( error => console.log(error))
}

FindMatchingLocations = (value) => {

  var locationList = [];

  console.log('Non-async FindMatchingLocations()')
  console.log('mounted')
  firebase.firestore()
    .collection('Locations')
    .where("category", '==', value )
    .get()
    .then( snapshot => {

   snapshot.forEach((doc) => {
    const locationItem = doc.data();
    locationItem.id = doc.id;
    locationList.push(locationItem);
    })

  this.onLocationsReceived(locationList);
  })
   .catch( error => console.log(error))
}

MatchLocations = (value1, value2) => {

  var locationList = [];

  console.log('Non-async MatchLocations()')
  console.log('mounted')
  firebase.firestore()
    .collection('Locations')
    .where(value1, '==', value2 )
    .get()
    .then( snapshot => {

   snapshot.forEach((doc) => {
    const locationItem = doc.data();
    locationItem.id = doc.id;
    locationList.push(locationItem);
    })

  this.onLocationsReceived(locationList);
  })
   .catch( error => console.log(error))
}

componentDidMount() {
  //Lists all locations
  //this.getLocations();

  //Finds a matching location with the path to compare being hardcoded then define the value for comparison
  //category is currently hardcoded for the path to compare
  //this.FindMatchingLocations("a");

  //Finds a matching location by defining the path to compare and defining the value for comparison
  this.MatchLocations("name","a");
}

render() {
  return (
    <View style={styles.container}>
    <FlatList
      data={this.state.locationList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        <Text style={styles.item}>{item.name}</Text>
      } }
    />
  </View>
  );
}
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#fff",
  paddingTop: 40
  //paddingHorizaontal: 20
},
item: {
  marginTop: 24,
  padding: 30,
  backgroundColor: 'black',
  fontSize: 24,
  marginHorizontal: 10,
  marginTop: 24
}
});