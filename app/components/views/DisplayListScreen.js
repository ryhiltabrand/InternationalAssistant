
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  Pressable
} from "react-native";

import React, { Component } from 'react';
import firebase from "../../utilities/firebase";

//libraries to import infinity scroll
import { ListItem, Divider } from 'react-native-elements';


//console.log("This is opening DisplayList");

export class DisplayList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationList: [],
    };
  }
  // set location list property to wat is defined
  onLocationsReceived = (locationList) => {
    console.log("The keys mason ", Object.keys(locationList))
    console.log("What is in locationList ", locationList)

    this.setState(prevState => ({
      locationList: prevState.locationList = locationList
    }));
    //console.log(this.state.locationList);
  }


  //go through the location collection and put it in an array
  getLocations = () => {

    var locationList = [];

    console.log('mounted')
    firebase.firestore().collection('Locations')
      .get()
      .then(snapshot => {

        snapshot.forEach((doc) => {
          locationList.push(doc.data());
        })

        this.onLocationsReceived(locationList);
      })
      .catch(error => console.log(error))
  }


  // Match category to location. Will be use for filtering
  //Finds a matching location by defining the path to compare and defining the value for comparison
  MatchLocations = (value1, value2) => {

    var locationList = [];

    console.log('mounted')
    firebase.firestore()
      .collection('Locations')
      .where(value1, '==', value2)
      .get()
      .then(snapshot => {

        snapshot.forEach((doc) => {
          locationList.push(doc.data());
        })

        this.onLocationsReceived(locationList);
      })
      .catch(error => console.log(error))
  }

  //rerender after mounting
  componentDidMount() {
    //Lists all locations
    this.getLocations();

    //this.MatchLocations("name","a");
  }




   locationCard = ({ item }) => (
    
    //crazy looking multi-layer ternary operation for backgroundColor
    
    <View style={styles.locationCard}>
    
      <Text style={styles.titleText}>
        {this.state.locationList[item].name}
      </Text>
    </View>
  )

  render() {
    //console.log(this.state.locationList[0].name)

    return this.state.locationList.length > 0 ?
      <SafeAreaView style={styles.mainContainer}>
        {/* Return to Map Viewer */}
        <View style={styles.topMenuBar}>

          <Pressable onPress={() => { this.getLocations() }}>
            <Text> All </Text>
          </Pressable>
          <Pressable onPress={() => { this.getLocations("category", "Resturant") }}>
            <Image source={require("../../assets/locations/chicken-leg.png")} style={styles.filterButton} />
          </Pressable>
          <Pressable onPress={() => { this.getLocations("category", "worship") }}>
            <Image source={require("../../assets/locations/pray.png")} style={styles.filterButton} />
          </Pressable>
          <Pressable onPress={() => { this.getLocations("category", "park"); }}>
            <Image source={require("../../assets/locations/park.png")} style={styles.filterButton} />
          </Pressable>
          <Pressable onPress={() => { this.getLocations("category", "communial") }}>
            <Image source={require("../../assets/locations/group.png")} style={styles.filterButton} />
          </Pressable>
          <Pressable onPress={() => { /* user input function */ }}>
            <Image source={require("../../assets/locations/magnifying-glass.png")} style={styles.mapButton} />
          </Pressable>
          <Pressable onPress={() => { this.props.navigation.navigate('MapViewer'); }}>
            <Image source={require("../../assets/locations/map.png")} style={styles.mapButton} />
          </Pressable>

        </View>

        {/* Define list of places */}
        <FlatList
          data={Object.keys(this.state.locationList)}
          renderItem={this.locationCard}
        //keyExtractor={place => place.name}
        />
      </SafeAreaView> :
      <View style={styles.textContainer}>
        <Text style={styles.emptyTitle}>No Locations found {console.log("Nothing was found")}</Text>
      </View>
  }
}

const styles = StyleSheet.create({
  /* Visual Deubgging */
  findme: {
    backgroundColor: '#bc1390ba',
    borderWidth: 2
  },
  /* Main Container where everything is put in */
  mainContainer: {
    //flex: 4,
    flexDirection: "column",
    backgroundColor: '#fff9e8ff'
  },
  /* Top Menu Bar Styles */
  topMenuBar: {
    padding: 3,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  filterButton: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    resizeMode: 'contain'
  },
  mapButton: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    resizeMode: 'contain'
  },
  /* Location Card Styles */
  locationCard: {
    //flex: 1,
    padding: 30,
    marginVertical: 12,
    marginHorizontal: 16,
    backgroundColor: '#cc0000ff',
    borderWidth: 2,
    //justifyContent: 'space-around'
  },
  title: {
    fontSize: 32
  },
  subtitle: {
    fontSize: 18
  }
});