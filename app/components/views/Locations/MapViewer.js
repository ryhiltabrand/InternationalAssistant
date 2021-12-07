import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  Button,
  ImageBackground,
} from "react-native";

import React, { Component, useEffect } from "react";

import MapView from "react-native-maps";

import { FontAwesome5, AntDesign } from "@expo/vector-icons";

import * as Location from "expo-location";

import BottomSheet from 'react-native-bottomsheet-reanimated';
import { SearchBar } from 'react-native-elements';

import firebase from "../../../utilities/firebase";
import { regionFlag } from "../../../utilities/regionFlagFinder";
import { TouchableOpacity, FlatList, RectButton } from "react-native-gesture-handler"
import SegmentedControl from "rn-segmented-control";

export class MapViewer extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    selectedIndex: 0,
    //Flatlist 
    locationList: [],
    selectedLocationCard: null,
    searchQuery: null,
    //------------------
    location: null,
    markerPosition: {
      latitude: 0,
      longitude: 0,
    },
    marker:
    {
      name: "",
      address: "",
      contributor: "",
      category: "",
      rating: 0,
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    },
    markers: [{
      title: '',
      coordinates: {
        latitude: 0,
        longitude: 0
      }
    }]
  };

  //Broken: only passes the previous params
  //When you press an item from the Displaylist for the first time this function returns it as a null.
  //If you press the item again it will display the marker.
  //If you press another item from the display list it will display it will pass the previous item. 
  //You will have to press that item again because this function only holds the previous params
  UNSAFE_componentWillReceiveProps()
  {
    //TESTER
    const data = this.props.route.params
    console.log("Show data: ", data);

    if(data != null) {
      this.getCoordinates(data.address);
      this.state.marker = {
        name: data.name,
        address: data.address,
        contributor: data.contributor,
        category: data.category,
        rating: data.rating
      }
    }
  
    console.log("------------ Items from the display list --------------------");
    console.log(this.state.marker.name);
    console.log(this.state.marker.address);
    console.log(this.state.marker.contributor);
    console.log(this.state.marker.category);
    console.log(this.state.marker.rating);
    console.log("----------- Print the converted coorinates from item --------------------");
    console.log("Latitude: ",this.state.markerPosition.latitude);
    console.log("Longitude: ", this.state.markerPosition.longitude);

  }

  //----------------------------------------------------------------------------------
  //Location converter and Print list

  //Converts street names to coordinates 
  getCoordinates = async (value) => {
    console.log("getCoordinates is being called");
    var location = await Location.geocodeAsync(value);
    this.setState({ location });
    location.map((Coords) => (
      console.log("What is the latitude ", Coords.latitude),
      console.log("What is the latitude ", Coords.longitude),
      this.setState(this.state.markerPosition = {
        latitude: Coords.latitude,
        longitude: Coords.longitude,
      })
    ));
};

  //Print the list of items
  PrintItem()
  {
    console.log("------------ Print Item --------------------");
    console.log("------------ Item from the list --------------------");
    console.log(this.state.marker.name);
    console.log(this.state.marker.address);
    console.log(this.state.marker.contributor);
    console.log(this.state.marker.category);
    console.log(this.state.marker.rating);

    console.log("----------- Print the converted coorinates from item --------------------");
    console.log("Latitude: ",this.state.markerPosition.latitude);
    console.log("Longitude: ", this.state.markerPosition.longitude);

  }

  //----------------------------------------------------------------------------------
  //matchLocations and searchlocations

  matchLocations = async (value1, value2) => {

    var locationList = [];

    console.log('mounted')
    const match = await firebase.firestore()
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

  searchLocations = async (value) => {

    var locationList = [];

    console.log('mounted')
    const Searchref = await firebase.firestore()
      .collection('Locations')
      .orderBy('name')
      .startAt(value)
      .endAt(value + '\uf8ff')
      .get()
      .then(snapshot => {

        snapshot.forEach((doc) => {
          locationList.push(doc.data());
        })
        this.onLocationsReceived(locationList);
      })
      .catch(error => console.log(error))
  }

  onLocationsReceived = (locationList) => {
    this.setState(prevState => ({
      locationList: prevState.locationList = locationList
    }));
  }

  //----------------------------------------------------------------------------------

  updateSearch = (searchQuery) => {
    this.setState({ searchQuery });
    this.searchLocation();
  };

  searchLocation = () => {
    this.searchLocations(this.state.searchQuery);
  };

 //----------------------------------------------------------------------------------

  LocationCard = ({ item }) => (
  
      // change when trying to figure out how to change bordercolor
      //      <Pressable onPress={() => { this.setSelectedLocation(item)}} styles={[styles.notSelectedLocationCard ,this.state.selectedLocationCard]}> */}
      //ANON: debugging
      <TouchableOpacity onPress={() => this.PlaceMarker(this.state.locationList[item])}>
        {/* crazy looking multi-layer ternary operation for backgroundColor */}
        <View
          style={[
            styles.locationCard,
            this.state.locationList[item].category === 'Restaurant' ? styles.restaurant :
              this.state.locationList[item].category === 'Park' ? styles.park :
                this.state.locationList[item].category === 'Communal' ? styles.communal :
                  this.state.locationList[item].category == 'Worship' ? styles.worship :
                    styles.unkown,
          ]}>
          <View style={styles.locationCardTop}>
            <View style={styles.locationTitleSection}>
              <Text style={styles.locationTitle}>
                {this.state.locationList[item].name}
              </Text>
            </View>
            <View style={styles.locatiotnRatingSection}>
              <ImageBackground source={require('./../../../assets/locations/locationCard/star.png')} style={styles.locationRatingStar}>
                {/* This needs to be the average of the ratings. Change function when created*/}
                <Text style={styles.locationRating}> {this.state.locationList[item].rating} </Text>
              </ImageBackground>
            </View>
            <View style={styles.locationRegionSection}>
              {/* Need function to grab user info base off name. database.js does have it but by UID*/}
              <Image source={regionFlag(this.state.locationList[item].user_country)} style={styles.locationRegion} />
            </View>
          </View>
          <View style={styles.locationCardBottom}>
            <View style={styles.locationContributorSection}>
              <Text style={styles.locationContributor}>Founded by {this.state.locationList[item].contributor}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
)

//-----------------------------------------------------------------

  handleTabsChange = (index) => {
    console.log("index: ", index)
    this.setState({ selectedIndex: index });

    if (this.state.selectedIndex == 0) {
      this.props.navigation.navigate("PostLocationScreen");
    } 
    if(this.state.selectedIndex == 1) {
      this.props.navigation.navigate("DisplayList");
    }
  }

 renderContent = () => (
  <><View
     style={{
       backgroundColor: '#fff9e8ff',
       padding: 16,
       height: 450,
     }}>

     <SearchBar
       searchIcon={{ size: 25 }}
       containerStyle={styles.searchbar}
       round
       onChangeText={text => this.updateSearch(text)}
       onClear={text => this.updateSearch('')}
       placeholder="Type Here to Search..."
       value={this.state.searchQuery} />

     {/*<SegmentedControl
       tabs={["Post location", "Display list"]}
       paddingVertical={6}
       containerStyle={{
         marginVertical: 20,
       }}
       //segmentedControlBackgroundColor="#fff9e8ff"
       //activeSegmentBackgroundColor="black"
       currentIndex={this.state.selectedIndex}
       onChange={this.handleTabsChange}
     //theme={theme}
      />*/}

      <FlatList
         data={Object.keys(this.state.locationList)}
         renderItem={this.LocationCard}
         keyExtractor={(item) => this.state.locationList[item].name}
         fadingEdgeLength={15} />
   </View></>
);

//-----------------------------------------------------------------

  PlaceMarker2()
  {
    //TESTER
    const data = this.props.route.params
    console.log("Show data: ", data);

    this.getCoordinates(data.address);
     this.state.marker = {
      name: data.name,
      address: data.address,
      contributor: data.contributor,
      category: data.category,
      rating: data.rating
    }
  
    console.log("------------ Items from the display list --------------------");
    console.log(this.state.marker.name);
    console.log(this.state.marker.address);
    console.log(this.state.marker.contributor);
    console.log(this.state.marker.category);
    console.log(this.state.marker.rating);
    console.log("----------- Print the converted coorinates from item --------------------");
    console.log("Latitude: ",this.state.markerPosition.latitude);
    console.log("Longitude: ", this.state.markerPosition.longitude);

  }

   PlaceMarker(item)
  {
    //Converts the address to coordinates
    //Set the coordinates to Markerposition and call it directly from the mapview marker
    this.getCoordinates(item.address);

    //Set the state for marker with variables from the item list
    this.state.marker = {
      name: item.name,
      address: item.address,
      contributor: item.contributor,
      category: item.category,
      rating: item.rating
    }

    //Prints the item from list saved in mapview state
    this.PrintItem();
  }

//Locationlist uses the map function to iterate throught the list
//getCoordinates converts the street address to coordnates
//setState creates a new state for markers state array
//and the function concat returns a new markers state array with the new marker.
AddLocations = () => {

    this.matchLocations("category", "Restaurant");
    this.state.locationList.map((location) => (
      console.log("What is the name of the location ", location.name ),
      console.log("What is the name of the location ", location.address ),
      this.setState(state => {
        this.getCoordinates(location.address),
        region = {
          title: location.name,
          address: location.address,
          contributor: location.contributor,
          category: location.category,
          rating: location.rating,
          coordinates: {
            latitude: this.state.markerPosition.latitude,
            longitude: this.state.markerPosition.longitude
          }
        }
        this.state.markers = this.state.markers.concat(region);
      })
    ));
   console.log("---------------- What's inside Marker array -------------------");
   this.state.markers.map( (marker) => ( console.log("Marker name: ", marker.title ), console.log("Marker Coordinates: ", this.state.markerPosition ) ));

};

//-----------------------------------------------------------------

render() {
    return (
      <>
        {<View>
          
          <MapView
          customMapStyle={[
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#242f3e"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#746855"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#242f3e"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#d59563"
                }
              ]
            },
            {
              "featureType": "poi",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#d59563"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#263c3f"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#6b9a76"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#38414e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#212a37"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9ca5b3"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#746855"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#1f2835"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#f3d19c"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#2f3948"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#d59563"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#17263c"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#515c6d"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#17263c"
                }
              ]
            }
          ]}
          userLocationFastestInterval = {5000}
          userLocationUpdateInterval ={5000}
            pitchEnabled = {false}
            moveOnMarkerPress = {true}
            //mapType={"default"}
            style={styles.map}
            initialRegion={{
              latitude: 36.88639,
              longitude: -76.31042,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}> 
           {<MapView.Marker title={this.state.marker.name} description={"Address:" + this.state.marker.address +" "+ "Contributor:" + this.state.marker.contributor} coordinate={this.state.markerPosition}/>}
           {/*this.state.markers.map(marker => ( <MapView.Marker coordinate={marker.coordinates} title={marker.title} />))*/}
          </MapView>

        </View>}

        {<View style={styles.btncontainer}>

          <Pressable
            style={styles.listBtn}
            onPress={() => {
              this.props.navigation.navigate("DisplayList");
            }}
          >
            <FontAwesome5 name={"list-alt"} size={50} color={"white"} />
          </Pressable>

          <Pressable
            style={styles.PostBtn}
            onPress={() => { this.props.navigation.navigate("PostLocationScreen"); }}
          >
            <AntDesign name={"addfile"} size={50} color={"white"} />
          </Pressable>

        </View>}
        <BottomSheet
          keyboardAware
          keyboardAwareExtraSnapHeight={50}
          bottomSheerColor="#fff9e8ff"
          ref="BottomSheet"
          initialPosition={'35%'} //200, 300
          snapPoints={[450, 250, 150]}
          //snapPoints={['50%', '100%']}
         // isBackDrop={true}
          isBackDropDismissByPress={true}
          isRoundBorderWithTipHeader={true}
          // backDropColor="red"
          // isModal
           containerStyle={{backgroundColor:'#fff9e8ff'}}
           tipStyle={{backgroundColor:"grey"}}
          // headerStyle={{backgroundColor:"red"}}
          // bodyStyle={{backgroundColor:"red",flex:1}}
          body={
            <this.renderContent/>
          }
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  btncontainer: {
    flex: 1,
  },
  listBtn: {
    borderRadius: 20,
    padding: 1,
    alignSelf: "flex-end",
    marginTop: -500,
    left:330,
    top:-150,
    position: "absolute",
  },
  PostBtn: {
    borderRadius: 20,
    padding: 1,
    alignSelf: "flex-end",
    marginTop: -500,
    right:330,
    top:-150,
    position: "absolute",
  },
  BtnText:{
    color:"white",
    fontSize:15,
    left: 20
  },
  //global styles
  restaurant: {
    backgroundColor: '#cc0000ff'
  },
  worship: {
    backgroundColor: '#3c78d8ff'
  },
  park: {
    backgroundColor: '#6aa84fff'
  },
  communal: {
    backgroundColor: '#674ea7ff',
  },
  unkown: {
    backgroundColor: 'white'
  },
   /* Location Card Styles */
   locationList: {
    flex: 10,
  },
  locationCard: {
    flex: 1,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    borderWidth: 2,
    height: 75,
  },
  locationCardTop: {
    flex: 1,
    flexDirection: 'row',
  },
  locationTitleSection: {
    flex: 2,
    alignItems: 'flex-start',
  },
  locationTitle: {
    fontSize: 17,
    color: 'white'
  },
  locationRatingSection: {
    flex: 1,
    alignItems: 'center',
  },
  locationRatingStar: {
    justifyContent: 'center',
    width: 45,
    height: 45,
  },
  locationRating: {
    //resizeMode: 'contain',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 5
  },
  locationRegionSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  locationRegion: {
    resizeMode: 'contain',
    width: 45,
    height: 45,
  },
  locationCardBottom: {
    flex: .3,
  },
  locationContributorSection: {
    //flex: 1,
    alignItems: 'flex-start',
  },
  locationContributor: {
    fontSize: 14,
    color: 'white',
  },
  //
  categoryBtn: {
    borderRadius: 20,
    padding: 1,
    alignSelf: "flex-end",
    marginTop: -500,
    right:330,
    position: "absolute",
  },
  categoryBtn2: {
    borderRadius: 20,
    padding: 1,
    alignSelf: "flex-end",
    marginTop: -500,
    right:100,
    position: "absolute",
  },
  image: {
    height:32,
    width: 32,
    borderRadius: 12
  },
  searchbar: {
    color: '#fff9e8ff',
    backgroundColor: '#fff9e8ff',
    borderColor: '#fff9e8ff',
    top: -10,
    //marginVertical:10
  }
});
