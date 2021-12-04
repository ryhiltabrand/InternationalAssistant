import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Image,
  Dimensions,
  Pressable,
  ImageBackground
} from "react-native";

import React, { Component } from "react";

import MapView from "react-native-maps";
import Marker from "react-native-maps";

import useState from "react";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

import * as Location from "expo-location";

import { CoordConverter } from "../../../utilities/GeoCoder";

import BottomSheet from 'reanimated-bottom-sheet';
import { SearchBar } from 'react-native-elements';

import firebase from "../../../utilities/firebase";
import { regionFlag } from "../../../utilities/regionFlagFinder";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler"

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class MapViewer extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    //Flatlist 
    locationList: [],
    selectedLocationCard: null,
    searchQuery: null,
    //------------------
    location: null,
    loadingMap: false,
    errorMessage: null,
    positionState: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
    searchMarker: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA, //0
      longitudeDelta: LONGITUDE_DELTA, //0
    },
    markerDescription:
    {
      name: "",
      address: "",
      contributor: "",
      category: "",
      rating: "",
      rating: 0
    },
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
      rating: "",
      rating: 0,
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    },
    markers: [{
      title: 'hello',
      coordinates: {
        latitude: 0,
        longitude: 0
      }
    }]
  };

  componentDidUpdate() {
    if (this.state.positionState.latitude !== "0") {
      this.state.loadingMap = true;
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  //Print the list of items
  PrintItem()
  {
    console.log("------------ Print Item --------------------");
    console.log("------------ Item from the list --------------------");
    console.log(this.state.markerDescription.name);
    console.log(this.state.markerDescription.address);
    console.log(this.state.markerDescription.contributor);
    console.log(this.state.markerDescription.category);
    console.log(this.state.markerDescription.rating);

    console.log("----------- Print the converted coorinates from item --------------------");
    console.log("Latitude: ",this.state.markerPosition.latitude);
    console.log("Longitude: ", this.state.markerPosition.longitude);

  }

  //Converts the address string to coordinates
  AddresstoCoordinates() {
    let Coord = new CoordConverter();

    Coord.ConvertCoords(this.state.markerDescription.address);

    this.state.markerPosition = {
      latitude: Coord.state.markerPosition.latitude,
      longitude: Coord.state.markerPosition.longitude
    };
   }  

  getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      this.setstate({ errorMessage: "Permission not granted" });
    }

    let location = await Location.getLastKnownPositionAsync();

    this.setState({ location, errorMessage: "Permission granted" });

    var lat = parseFloat(location.coords.latitude);
    var long = parseFloat(location.coords.longitude);

    var region = {
      latitude: lat,
      longitude: long,
      latitudeDelta: LATITUDE_DELTA, //0
      longitudeDelta: LONGITUDE_DELTA, //0
    };

    this.setState({ positionState: region });
    this.setState({ markerPosition: region });
  };

  //----------------------------------------------------------------------------------

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

  searchLocations = (value) => {

    var locationList = [];

    console.log('mounted')
    firebase.firestore()
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
    console.log(this.state.locationList);
  }

  //----------------------------------------------------------------------------------

  setSearchQuery = (query) => {
    this.setState({ 
      searchQuery: query
    })
    this.searchLocation();
  }

  updateSearch = (searchQuery) => {
    this.setState({ searchQuery });
    this.searchLocation();
  };

  searchLocation = () => {
    console.debug('inside search locations the searchQuery is ', this.state.searchQuery)
    //this.matchLocations('name', this.state.searchQuery)
    this.searchLocations(this.state.searchQuery);
  };

  PlaceMarker(item)
  {
    //Moves data to the map viewer state
    this.state.markerDescription = {
      name: item.name,
      address: item.address,
      contributor: item.contributor,
      category: item.category,
      rating: item.rating
    };

    //Converts the address to coordinates
    this.AddresstoCoordinates();

    //Prints the item from list saved in mapview state
    this.PrintItem();
  }

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
 renderContent = () => (
  <><View
     style={{
       backgroundColor: '#fff9e8ff',
       padding: 16,
       height: 450,
     }}
   >
     {<TouchableOpacity onPress= { () => { this.props.navigation.navigate("PostLocationScreen"); }} style={styles.TabBtn1}>
              <Text style={styles.BtnText}>Post location</Text>
    </TouchableOpacity>}

     {<TouchableOpacity onPress= { () => { this.props.navigation.navigate("DisplayList"); }} style={styles.TabBtn2}>
              <Text style={styles.BtnText}>Display List</Text>
  </TouchableOpacity>}

     <SearchBar
       searchIcon={{ size: 25 }}
       round
       onChangeText={text => this.updateSearch(text)}
       onClear={text => this.updateSearch('')}
       clearIcon={true}
       placeholder="Type Here to Search..."
       value={this.state.searchQuery} />
       <FlatList
         data={Object.keys(this.state.locationList)}
         renderItem={this.LocationCard}
         keyExtractor={(item) => this.state.locationList[item].name}
         fadingEdgeLength={15} />
   </View></>
);


//-----------------------------------------------------------------

render() {
    return (
      <>
        {<View>
          
          <MapView
            style={styles.map}
            region={{
              latitude: 36.88639,
              longitude: -76.31042,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}> 
           {<MapView.Marker coordinate={{latitude: 36.88639, longitude: -76.31042}}/>}
          </MapView>
          
          <Marker
            coordinate={this.state.markerPosition}
            //debug
            title={"title"}
            description={"description"}

            // title={this.state.markerDescription.name}
            //description={"description"}
         />

        </View>}

        <View style={styles.btncontainer}>


         {/* <TouchableOpacity onPress={() => {this.Selector()}}>
          <Image style={ styles.image } source={require("../../assets/chicken-leg.png")}/>
          </TouchableOpacity>*/}

    
        </View>
        {<BottomSheet
        snapPoints={[450, 300, 230]}
        borderRadius={10}
        renderContent={this.renderContent}
        />}
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
  //Slider
   TabBtn1:{
      width:"35%",
      backgroundColor:'rgba(182, 32, 32, 0.7)',
      borderRadius:15,
      height:25,
  },
   //Slider
   TabBtn2:{
    width:"35%",
    backgroundColor:'rgba(182, 32, 32, 0.7)',
    borderRadius:15,
    height:25,
  },
  listBtn: {
    borderRadius: 20,
    padding: 1,
    alignSelf: "flex-end",
    marginTop: -250,
    position: "absolute",
  },
  PostBtn: {
    borderRadius: 20,
    padding: 1,
    marginTop: 20,
    position: "absolute",
  },
  BtnText:{
    color:"white",
    fontSize:15,
    left: 20
  },
  image: {
    height:32,
    width: 32,
    borderRadius: 12
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
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
