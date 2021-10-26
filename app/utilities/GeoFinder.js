/**
 * f21-Blue
 * Created by Marquel
 *
 *
 *
 */

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import MapView from 'react-native-maps';
import Marker from 'react-native-maps';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

/*Get user location */
export class GeoFinder extends Component {

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
    let text = JSON.stringify(this.state.location);
    let error = JSON.stringify(this.state.errorMessage);
    console.log(text)
    console.log(error)

    return (  
        <>

        {this.state.loadingMap && <><MapView
          style={styles.container}
          initialRegion={this.state.positionState} /><Marker coordinate={this.state.markerPosition} /></>}</>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});