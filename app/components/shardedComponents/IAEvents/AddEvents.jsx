import firebase from "firebase";
import * as Location from "expo-location";
const geofire= require('geofire-common');
export default function AddEvent(Description, language, Campus, Name, Country, Street, City, States, Zip, Date) {


  const event = async () => {
    // get current users uid
    const Uid = firebase.auth().currentUser.uid;
    const usersRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const doc = await usersRef.get();
    var name = doc.data().name;
    var Address = Street + ", " +City + ", " + States + " " + Zip;
    let coords = await Location.geocodeAsync(Address)
    const hash = geofire.geohashForLocation([coords[0].latitude,coords[0].longitude])
    firebase.firestore().collection('Events').add({
      Address: Address,
      Campus: Campus,
      Description: Description,
      Name: Name,
      Country: Country,
      dislikes: 0,
      language: language,
      likes: 0,
      Date: Date,
      geohash: hash,
      lat: coords[0].latitude,
      lng: coords[0].longitude,
    })
  };
  event();
}