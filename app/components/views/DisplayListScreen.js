
 import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Button,
  FlatList
} from "react-native";

import React, { Component } from 'react';
import firebase from "../../utilities/firebase";

import { ListItem, Divider } from 'react-native-elements';

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
  this.setState(prevState => ({
  locationList: prevState.locationList = locationList
  }));
  console.log(this.state.locationList);
}

getLocations = () => {

  var locationList = [];

  console.log('mounted')
  firebase.firestore().collection('Locations')
    .get()
    .then( snapshot => {

   snapshot.forEach((doc) => {
    locationList.push(doc.data());
    })

  this.onLocationsReceived(locationList);
  })
   .catch( error => console.log(error))
}

MatchLocations = (value1, value2) => {

  var locationList = [];

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
  this.getLocations();

  //Finds a matching location by defining the path to compare and defining the value for comparison
  //this.MatchLocations("name","a");
}

/*
render() {
  return this.state.locationList.length > 0 ?
    <SafeAreaView style={styles.container}>
    <View style={styles.btncontainer}>
        <TouchableOpacity style={styles.MapBtn} onPress={() => { this.props.navigation.navigate('MapViewer'); } }>
          <Image source={require("../../assets/mapicon.png")} style={styles.image} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={this.state.locationList}
        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item,index }) => {
          console.log("Check if the items are being passed to the list");
          console.log(item);
          return (
            <ListItem
              containerStyle={styles.listItem}
              title={item.name}
              subtitle={item.address}
              //subtitle={`name: ${item.name}`}
              //titleStyle={styles.titleStyle}
              //subtitleStyle={styles.subtitleStyle}
              //leftAvatar={{
              //  size: 'large',
             //   rounded: false,
             //   source: item.image && { uri: item.image }
             // }}
              onPress={() => {
                this.setState(prevState => ({ selectedIndex: prevState.selectedIndex = index }))
              }
              }
            />
          );
        }
        }
      />
    </SafeAreaView> :
    <View style={styles.textContainer}>
      <Text style={styles.emptyTitle}>No Locations found {console.log("Nothing was found")}</Text>
    </View>
}
}*/

render() {
  return (
    <><View style={styles.btncontainer}>
      <TouchableOpacity style={styles.MapBtn} onPress={() => { this.props.navigation.navigate('MapViewer'); } }>
        <Image source={require("../../assets/mapicon.png")} style={styles.image} />
      </TouchableOpacity>
    </View>
    <FlatList
        data={this.state.locationList}
        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          console.log(item.name);
          console.log(item.address);
          console.log(item.category);
          console.log(item.category);
          return (
            <ListItem
              title={item.name}
              subtitle={item.address}
              subtitle={item.category}
              subtitle={item.rating}
              subtitle={item.contributor}
              onPress={() => {
                this.setState(prevState => ({ selectedIndex: prevState.selectedIndex = index }));
              }} 
            />
          );
        } } /></>
    );
  }

}

const styles = StyleSheet.create({
container: {
  flex: 1
 // backgroundColor: "#fff",
  //paddingTop: 40
  //paddingHorizaontal: 20
},
btncontainer: {
  flex: 1
},
listItem: {
  marginTop: 8,
  marginBottom: 8
},
titleStyle: {
  fontSize: 30
},
subtitleStyle: {
  fontSize: 18
},
item: {
  marginTop: 24,
  padding: 30,
  backgroundColor: 'black',
  fontSize: 24,
  marginHorizontal: 10,
  marginTop: 24
},
MapBtn:{
  borderRadius: 20,
  padding: 1,
  alignSelf: 'flex-end',
  marginTop: 0,
  position: 'absolute'
},
image:{
    width: 50,
    height: 50,
    resizeMode: 'contain'
}
});