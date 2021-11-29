import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import React, { Component } from "react";

import MapView from "react-native-maps";
import Marker from "react-native-maps";

import useState from "react";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

import * as Location from "expo-location";

import Geolocation from 'react-native-geolocation-service';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class MapViewer extends Component {
  state = {
    location: null,
    loadingMap: false,
    errorMessage: null,
    positionState: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
    searchPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA, //0
      longitudeDelta: LONGITUDE_DELTA, //0
    },
    markerPosition: {
      latitude: 0,
      longitude: 0,
    },
  };

  componentDidUpdate() {
    if (this.state.positionState.latitude !== "0") {
      this.state.loadingMap = true;
    }
  }

  componentDidMount() {
    this.getLocation();
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
    console.log(lat, long, "nishil is a bitch")

    var region = {
      latitude: lat,
      longitude: long,
      latitudeDelta: LATITUDE_DELTA, //0
      longitudeDelta: LONGITUDE_DELTA, //0
    };

    this.setState({ positionState: region });
    this.setState({ markerPosition: region });
  };
  render() {
    let text = JSON.stringify(this.state.location);
    let error = JSON.stringify(this.state.errorMessage);
    console.log(text);
    console.log(error);
    return (
      <>
        <View style={{ marginTop: 10, flex: 1 }}>
          <MapView
            style={styles.map}
            region={{
              latitude: 36.88639,
              longitude: -76.31042,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          ></MapView>

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
                latitudeDelta: LATITUDE_DELTA, //0
                longitudeDelta: LONGITUDE_DELTA, //0
              };

              this.setState({ searchPosition: region });
            }}
            query={{
              key: "AIzaSyDmGQcOZNNjq6NFMES1ppUJkO0jVHnhCbI",
              language: "en",
              components: "country:us",
            }}
            styles={{
              container: {
                flex: 0,
                position: "absolute",
                width: "100%",
                zIndex: 1,
              },
              listView: { backgroundColor: "white" },
            }}
          />

          <Marker coordinate={this.state.searchPosition} />
        </View>
        <View style={styles.btncontainer}>
          <TouchableOpacity
            style={styles.listBtn}
            onPress={() => {
              this.props.navigation.navigate("DisplayList");
            }}
          >
            <FontAwesome5 name={"list-alt"} size={50} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PostBtn}
            onPress={() => {
              this.props.navigation.navigate("PostLocationScreen");
            }}
          >
            <AntDesign name={"addfile"} size={50} color={"black"} />
          </TouchableOpacity>
        </View>
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
    marginTop: -250,
    position: "absolute",
  },
  PostBtn: {
    borderRadius: 20,
    padding: 1,
    marginTop: 20,
    position: "absolute",
  },
});
