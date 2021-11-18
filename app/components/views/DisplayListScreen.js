
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
import DropDownPicker from 'react-native-dropdown-picker';

//console.log("This is opening DisplayList");

export class DisplayList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationList: [],
      //Drop down for SortBy
      sortBy: null,
      open: false,
      value: 'distance',
      items: [
        { label: 'Distance', value: 'distance' },
        { label: 'Name', value: 'name' },
        { label: 'Rating', value: 'rating' }
      ]
    };
    this.setValue = this.setValue.bind(this);
  }

  //dropdown options
  //check if dropdown is touch
  setOpen = (open) => {
    console.debug('opens dropdown')
    this.setState({
      open
    });
  }

  //shows what property is being sorted by in dropdown 
  setValue = (callback) => {
    console.debug('set Value')
    this.setState(state => (
      console.debug('the value being inputed is ', callback(state.value)),
      { value: callback(state.value) }
    )
    );
    /* setFilter(callback) */
  }

  //not needed due to not changing what inside of dropdown
  // setItems = (callback) => {
  //   console.debug('set Item')
  //   this.setState(state => ({
  //     items: callback(state.items)
  //   }));
  // }

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
  matchLocations = (value1, value2) => {

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

  setSortBy = (property) => {
    console.debug('the property given ', property);
    console.debug('Before dropdown change:  ', this.state.sortBy);
    this.setState({ sortBy: property }, () => {
      console.debug('Inside setState ', this.state.sortBy);
    });
  }

  //rerender after mounting
  componentDidMount() {
    //Lists all locations
    this.getLocations();

    //this.MatchLocations("name","a");
  }




  locationCard = ({ item }) => (

    //crazy looking multi-layer ternary operation for backgroundColor
    <View style={[
      styles.locationCard, 
      this.state.locationList[item].category === 'Restaurant' ? styles.restaurantLocationCard :
      this.state.locationList[item].category === 'Park' ? styles.parkLocationCard :
      this.state.locationList[item].category === 'Communal' ? styles.communalLocationCard :
      this.state.locationList[item].category == 'Worship' ? styles.worshipLocationCard :
      styles.unkownLocationCard
    ]}>
      <Text style={styles.titleText}>
        {this.state.locationList[item].name}
      </Text>
    </View>
  )

  render() {
    //console.log(this.state.locationList[0].name)
    return (
      <View style={styles.mainContainer}>
        {/* Return to Map Viewer */}
        <View style={styles.topMenuBar}>
          <View style={styles.categoryBarSection}>
            <Pressable onPress={() => { this.getLocations() }}>
              <Text style={styles.filterButton}> All </Text>
            </Pressable>
            <Pressable onPress={() => { this.matchLocations("category", "Restaurant") }}>
              <Image source={require("../../assets/locations/chicken-leg.png")} style={styles.filterButton} />
            </Pressable>
            <Pressable onPress={() => { this.matchLocations("category", "Worship") }}>
              <Image source={require("../../assets/locations/pray.png")} style={styles.filterButton} />
            </Pressable>
            <Pressable onPress={() => { this.matchLocations("category", "Park"); }}>
              <Image source={require("../../assets/locations/park.png")} style={styles.filterButton} />
            </Pressable>
            <Pressable onPress={() => { this.matchLocations("category", "Communial") }}>
              <Image source={require("../../assets/locations/group.png")} style={styles.filterButton} />
            </Pressable>
            <Pressable onPress={() => { /* user input function */ }}>
              <Image source={require("../../assets/locations/magnifying-glass.png")} style={styles.filterButton} />
            </Pressable>
          </View>
          <View style={styles.mapSection}>
            <Pressable onPress={() => { this.props.navigation.navigate('MapViewer'); }}>
              <Image source={require("../../assets/locations/map.png")} style={styles.mapButton} />
            </Pressable>
          </View>
        </View>
        {/* <View style={styles.sortBy}> */}
        <DropDownPicker
          style={styles.sortBy}
          open={this.state.open}
          value={this.state.value}
          items={this.state.items}
          setOpen={this.setOpen}
          setValue={this.setValue}
          setItems={this.setItems}
          dropDownContainerStyle={styles.sortByDropdown}
        />
        {/* </View> */}
        {/* Define list of places */}
        <View style={styles.locationList}>
          <FlatList
            data={Object.keys(this.state.locationList)}
            renderItem={this.locationCard}
            fadingEdgeLength={15}
            keyExtractor={place => place.name}
          />
        </View>
      </View>
    )
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
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff9e8ff'
  },
  /* Top Menu Bar Styles */
  topMenuBar: {
    flex: 1,
    //padding: 1,
    //marginBottom: 30,
    //height: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  categoryBarSection: {
    flex: 2,
    padding: 3,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  filterButton: {
    flex: 1,
    width: 25,
    height: 25,
    resizeMode: 'contain',
    alignSelf: 'flex-start'
  },
  mapSection: {
    flex: 1,
    padding: 3,
    width: 50,
    height: 50,
    alignItems: 'flex-end',
  },
  mapButton: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  /* Sort By Dropdown Styles */
  sortBy: {
    //flex: 1,
    height: 20,
    width: 107
  },
  sortByDropdown: {
    //flex: 1,
    width: 107
  },
  /* Location Card Styles */
  locationList: {
    flex: 10,
    //padding: 2,
    //marginTop: 5,
  },
  locationCard: {
    //flex: 1,
    padding: 30,
    marginVertical: 12,
    marginHorizontal: 16,
    // backgroundColor: '#cc0000ff',
    borderWidth: 2,
    //justifyContent: 'space-around'
  },
  restaurantLocationCard: {
    backgroundColor: '#cc0000ff'
  },
  worshipLocationCard: {
    backgroundColor: '#3c78d8ff'
  },
  parkLocationCard: {
    backgroundColor: '#6aa84fff'
  },
  communalLocationCard: {
    backgroundColor: '#674ea7ff'
  },
  unkownLocationCard: {
    backgroundColor: '#ffffffff'
  },
  title: {
    fontSize: 32
  },
  subtitle: {
    fontSize: 18
  }
});