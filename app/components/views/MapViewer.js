
 import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Button,
  Dimensions
} from "react-native";
  
import React, { Component } from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import useState from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class MapViewer extends Component{

  state = {
    location: null,
    loadingMap: false,
    errorMessage: null,
    positionState: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    },
    searchPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA, //0
      longitudeDelta: LONGITUDE_DELTA //0
    },
    markerPosition: {
      latitude: 0,
      longitude: 0
    }
   };

   componentDidUpdate()
   {
    if (this.state.positionState.latitude!=='0'){
      this.state.loadingMap = true; 
      }  
   }

   componentDidMount() {
       this.getLocation();
   }

   getLocation = async() => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
        
    if (status !== 'granted'){
      console.log('Permission not granted!');

      this.setstate({errorMessage: 'Permission not granted'});

    }

    const location = await Location.getCurrentPositionAsync();

    this.setState({location, errorMessage: 'Permission granted'});

    var lat = parseFloat(location.coords.latitude);
    var long = parseFloat(location.coords.longitude);

    var region = {
      latitude: lat,
      longitude: long,
      latitudeDelta: LATITUDE_DELTA, //0
      longitudeDelta: LONGITUDE_DELTA //0
    };

      this.setState({ positionState: region });
      this.setState({ markerPosition: region });
   };
render() {
    return (
      <><View style={{ marginTop: 10, flex: 1 }}>

        {this.state.loadingMap && <MapView
          style={styles.map}
          initialRegion={this.state.positionState} />}
        <Marker coordinate={this.state.markerPosition} />

        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            var region = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA //0
            };

            this.setState({ searchPosition: region });
          } }
          query={{
            key: "AIzaSyDmGQcOZNNjq6NFMES1ppUJkO0jVHnhCbI",
            language: "en",
            components: "country:us"
          }}
          styles={{
            container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
            listView: { backgroundColor: "white" }
          }} />
        <Marker coordinate={this.state.searchPosition} />

      </View><View style={styles.btncontainer}>
          <TouchableOpacity style={styles.listBtn} onPress={() => {this.props.navigation.navigate('DisplayList')}}>
            <Image source={require("../../assets/icon2.png")} style={styles.Listimage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.PostBtn} onPress={() => {this.props.navigation.navigate('PostLocationScreen')}}>
            <Image source={require("../../assets/icon2.png")} style={styles.Listimage} />
          </TouchableOpacity>
        </View></>
    );
  }
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#fff",
alignItems: "center",
justifyContent: "center"
},
map: {
width: Dimensions.get("window").width,
height: Dimensions.get("window").height
},
btncontainer: {
  flex: 1
},
listBtn:{
borderRadius: 20,
padding: 1,
alignSelf: 'flex-end',
marginTop: -250,
position: 'absolute'
},
PostBtn:{
  borderRadius: 20,
  padding: 1,
  marginTop: 20
},
Listimage:{
  width: 50,
  height: 50,
  resizeMode: 'contain'
}
});