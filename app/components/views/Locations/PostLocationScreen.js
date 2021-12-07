/**
 * f21-Blue
 * Created by Marquel
 *
 * 
 *
 */


import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import { Component } from 'react';
import firebase from "../../../utilities/firebase";
import DropDownPicker from 'react-native-dropdown-picker';
import { getCurrentUserCountry } from '../../../utilities/currentUser'

export class PostLocationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location_name: '',
      location_address: '',
      location_contributor: '',
      location_category: '',
      location_rating: '',
      location_description: '',
      user_country: '',
      open: false,
      value: null,
      items: [
        { label: 'Restaurant', value: 'Restaurant' },
        { label: 'Park', value: 'Park' },
        { label: 'Communal', value: 'Communal' },
        { label: 'Worship', value: 'Worship' }
      ]
    };
    this.setValue = this.setValue.bind(this);
  }

  getUserInfo = async () => {
    const currentUser = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const doc = await currentUser.get();
    const name = doc.data().name;
    const country = doc.data().country;
    this.setState({
      location_contributor: name,
      user_country: country
    });
  }

  componentDidMount(){this.getUserInfo();}

  setOpen = (open) => {
    this.setState({ open });
  }

  setValue(callback) {
    this.setState(state => ({ location_category: callback(state.value) }));
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  uploadLocation = () => {
    firebase.firestore().collection('Locations')
      .add({
        name: this.state.location_name,
        address: this.state.location_address,
        contributor: this.state.location_contributor,
        category: this.state.location_category, //Resturant
        rating: this.state.location_rating, //1-5 stars
        description: this.state.location_description,
        uid: firebase.auth().currentUser.uid,
        user_country: this.state.user_country
      })
      this.props.navigation.goBack();
  }

  CustomRatingBar = () => {
    const [defaultRating, setdefaultRating] = useState(2);
    const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
    const starImgFilled = './../../../assets/star_filled.png';
    const starImgCorner = './../../../assets/star_corner.png';
    this.state.location_rating = defaultRating;
    return (
      <View style={styles.customRatingBarStyle} >
        {
          maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => setdefaultRating(item)}
              >

                <Image
                  style={styles.starImgStyle}
                  source={
                    item <= defaultRating
                      ? require(starImgFilled)
                      : require(starImgCorner)
                  }
                />
              </TouchableOpacity>
            )
          })
        }
        <Text>
          {/*Debugging*/}
          {/*defaultRating + ' / ' + maxRating.length}
          {console.log(defaultRating)*/}
        </Text>
      </View>
    )
  }
  render() {
    //const [value, onChangeText] = React.useState(this.state.location_contributor);
    return (
      <ScrollView style={styles.container}>

        <Text style={styles.titleText}>Enter a location to share with others.</Text>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Name"
            placeholderTextColor="black"
            onChangeText={(val) => { this.updateInputVal(val, 'location_name') }} />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Address"
            placeholderTextColor="black"
            onChangeText={(val) => this.updateInputVal(val, 'location_address')} />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Contributor"
            placeholderTextColor="black"
            onChangeText={(val) => this.updateInputVal(val, 'location_contributor')}/>
        </View>

        <View style={styles.inputCommentView} >
          <TextInput
            style={styles.inputComment}
            placeholder="Comment"
            placeholderTextColor="black"
            onChangeText={(val) => this.updateInputVal(val, 'location_description')}
            multiline
            maxLength={500}/>
        </View>

        <DropDownPicker
          open={this.state.open}
          value={this.state.location_category}
          items={this.state.items}
          setOpen={this.setOpen}
          setValue={this.setValue}
          setItems={this.setItems}
          placeholder="Select a Category"
          style={styles.ScrollView}
          dropDownContainerStyle={styles.sortByDropdown}
        />

        <this.CustomRatingBar />

        <TouchableOpacity onPress={() => this.uploadLocation()} style={styles.SumbitBtn}>
          <Text style={styles.SumbitBtnText}>Submit</Text>
        </TouchableOpacity>

        <View style={styles.mapSection}>
          <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
            <Image source={require("./../../../assets/locations/categoryBar/map.png")} style={styles.mapBtn} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#fff9e8ff'
  },
  titleText: {
    fontSize: 15,
    color: "black",
    marginLeft: 39,
    padding: 30
  },
  inputView: {
    width: "80%",
    height: 30,
    borderColor: "orange",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: 39,
    justifyContent: "center",
    padding: 20,
  },
  inputCommentView: {
    width: "80%",
    height: 30,
    borderColor: "orange",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: 39,
    justifyContent: "center",
    padding: 30,
  },
  ScrollView: {
    width: "80%",
    backgroundColor: "#fff9e8ff",
    height: 40,
    borderColor: "orange",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: 39,
    justifyContent: "center",
  },
  sortByDropdown: {
    width: "80%",
    backgroundColor: "#fff9e8ff",
    borderColor: "orange",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: 39,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 15,
    height: 50,
    color: "black"
  },
  inputComment: {
    fontSize: 15,
    height: 50,
    color: "black"
  },
  SumbitBtn: {
    width: "80%",
    backgroundColor: 'rgba(182, 32, 32, 0.7)',
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 39,
  },
  SumbitBtnText: {
    color: "white",
    fontSize: 15
  },
  backBtn: {
    width: 1000,
    backgroundColor: 'rgba(94, 8, 203, 0.7)',
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 0
  },
  backText: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    color: "white",
    fontSize: 15
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover'
  },
  mapSection: {
    flex: 1,
    top: 20,
    right: 10,
    alignSelf: 'flex-end',
    position: 'absolute', // add if dont work with above
  },
  mapBtn: {
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
