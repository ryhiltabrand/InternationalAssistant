/**
 * f21-Blue
 * Created by Marquel
 *
 *
 *
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get("window");

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

/*Get user location */
export class GeoFinder extends Component {

  state = {
    location: null,
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

    this.setState({location, errorMessage: null});

    var lat = parseFloat(location.coords.latitude);
    var long = parseFloat(location.coords.longitude);

    var region = {
      latitude: lat,
      longitude: long,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

      this.setState({ positionState: region });
      this.setState({ markerPosition: region });
   };

   render() {
    let text = JSON.stringify(this.state.location); 
     console.log(text)
    return (  
        <>

        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.positionState} />
          <Marker coordinate={this.state.markerPosition}/></>
      
    );
  }
}

export default GeoFinder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});