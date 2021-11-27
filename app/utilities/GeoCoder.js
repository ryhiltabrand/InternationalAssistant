import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Geocoder from 'react-native-geocoding';

/*Converts street names to latitude and longitude Coordinates */
export class CoordConverter extends Component {

  constructor(props) {
  super(props);
  this.state = {
    markerPosition: {
      latitude: 0,
      longitude: 0
    }
   };
  }

  //Converts an address to Coordinates
  ConvertCoords(value) {

    Geocoder.init("AIzaSyDmGQcOZNNjq6NFMES1ppUJkO0jVHnhCbI");
    Geocoder.from(value)
    .then(json => {
  
      var geometry = json.results[0].geometry;
  
      //Print out the location string
      console.log(geometry);
  
      //Convert the json to a float variable 
      var lat = parseFloat(geometry.location.lat);
      var long = parseFloat(geometry.location.lng);
      console.log("Latitude: ", lat);
      console.log("Longitude: ", long);
    
      //Store the variables in the markerPosition state for Converter
      this.state.markerPosition = {
        latitude: lat,
        longitude: long
      };   
    })
    .catch(error => console.warn(error));
   }  

   //Prints the Coordinates stored in markerPosition
   printlocation = () =>
   {
    console.log("--------------------- Print Coordinates ---------------------");
    console.log("Latitude: ", this.state.markerPosition.latitude);
    console.log("Longitude: ", this.state.markerPosition.longitude);
   }

   //Test the converter
   ConvertCoords_Test = () =>
   {
     Geocoder.init("AIzaSyDmGQcOZNNjq6NFMES1ppUJkO0jVHnhCbI");
     Geocoder.from("Colosseum")
       .then(json => {
         var location = json.results[0].geometry.location;
         console.log(location);
       })
       .catch(error => console.warn(error));
   }

   render() {
    this.ConvertCoords_Test();
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
       <Marker coordinate={this.state.markerPosition} />
  
       <Marker
          coordinate={this.state.markerPosition}
          title={"title"}
          description={"description"}
       />
  
        </View>
      )
    }
  
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});