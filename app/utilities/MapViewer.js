
 import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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

export class MapViewer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            initialRegion: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
                error: null
            }
        };
    }
    
    componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        position => {
           this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null

          });
        },
        error => this.setState({ error: error.message }),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
      );
    }

    render() {
        return (
          <View style={{marginTop: 50, flex: 1}}>

          <GooglePlacesAutocomplete
            placeholder = "Search"
            fetchDetails={true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: "AIzaSyDmGQcOZNNjq6NFMES1ppUJkO0jVHnhCbI",
              language: "en"
            }}
            styles={{
              container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
              listView: { backgroundColor: "white" }
            }}

          />

          <MapView
             style={styles.map}
             region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
             }}
           />
          <Marker coordinate={this.state} />
          </View>
        );
      }



}

export default MapViewer;

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
  searchbox: {
    flex: 0,
    position: "absolute",
    width: "100%", 
    zIndex: 1,
    backgroundColor: "white"

  }
});