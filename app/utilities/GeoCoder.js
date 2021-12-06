import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import * as Location from 'expo-location';

/*Converts street names to latitude and longitude Coordinates */
export class CoordConverter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,

      markerPosition: {
        latitude: 0,  //The latitude in degrees.
        longitude: 0, //The longitude in degrees.
      },

      Geocode: {
        name: null,  //The name of the placemark, for example, "Tower Bridge".
        country: null, //Localized country name of the address.
        city: null,  //City name of the address.
        street: null  //Street name of the address.
      }
    };
  }

  TestCoordinates = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    try {

      let location = await Location.geocodeAsync('baker street london');
      this.setState({ location });

      location.map((Coords) => (
        console.log("What is the latitude ", Coords.latitude),
        console.log("What is the latitude ", Coords.longitude),
        this.setState(this.state.markerPosition = {
          latitude: Coords.latitude,
          longitude: Coords.longitude,
        })
      ));
    } catch (e) {
      console.log(e);
    }
  };

  getCoordinates = async (value) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    try {
      let location = await Location.geocodeAsync(value);
      this.setState({ location });

      location.map((Coords) => (
        console.log("What is the latitude ", Coords.latitude),
        console.log("What is the latitude ", Coords.longitude),
        this.setState(this.state.markerPosition = {
          latitude: Coords.latitude,
          longitude: Coords.longitude,
        })
      ));
    } catch (e) {
      console.log(e);
    }
  };

  getAddress = async (Coords) => {
    let location = await Location.reverseGeocodeAsync(Coords)
    this.setState({ Geocode })

    location.map((Address) => (
      console.log("What is the name of the location ", Address.name),
      console.log("What is the street of the location ", Address.street),
      console.log("What is the city of the location ", Address.city),
      console.log("What is the country of the location ", Address.country),
      this.setState(this.state.Geocode = {
        name: Address.name,
        street: Address.street,
        city: Address.city,
        country: Address.country,
      })
    ));
  }

  //Prints the Coordinates stored in markerPosition
  printCoordinates = () => {
    console.log("--------------------- Print Coordinates ---------------------");
    console.log("Latitude: ", this.state.markerPosition.latitude);
    console.log("Longitude: ", this.state.markerPosition.longitude);
  }

  //Prints the Address information stored in Geocode
  printAddress = () => {
    console.log("--------------------- Print Address Information ---------------------");
    console.log("name: ", this.state.Geocode.name);
    console.log("street: ", this.state.Geocode.street);
    console.log("country: ", this.state.Geocode.country);
    console.log("city: ", this.state.Geocode.city);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});