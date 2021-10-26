
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

getLocations = async(locationsRetreived) => {

  var locationList = [];

  var snapshot = await firebase.firestore()
    .collection('Locations')
    .get()

  snapshot.forEach((doc) => {
    const locationItem = doc.data();
    locationItem.id = doc.id;
    locationList.push(locationItem);
  });

  locationsRetreived(locationList);
}

componentDidMount() {
  this.getLocations(this.onLocationsReceived);
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