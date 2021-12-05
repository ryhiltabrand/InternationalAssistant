import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundImage } from "react-native-elements/dist/config";
import { SvgXml } from "react-native-svg";

import ImagePickerExample from './imageSelect'

import FSVG from "./images/fi.svg";
import USA from "./images/us.png";
import INDIA from "./images/in.png";
import FINLAND from "./images/fi.png";
import CHINA from "./images/cn.png";

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class Pic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pic: null,
      name: null,
      country: null,
      language: [],
      bio: null,
      type: null,
    };
  }
  componentDidMount() {
    this.Profile();
  }
  componentWillUnmount() {}
  clearState = () => {
    this.setState({
      pic: null,
    });
  };

  Profile = async () => {
    const currentUser = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const doc = await currentUser.get();
    const profpic = doc.data().profilepicture;
    const name = doc.data().name;
    const country = doc.data().country;
    const language = doc.data().language;
    const bio = doc.data().bio;
    const type = doc.data().native;

    this.setState({
      pic: profpic,
      name: name,
      country: country,
      language: language,
      bio: bio,
      type: type,
    });
  };
  //<View style = { styles.container }></View>
  //container: { flex: 1, backgroundColor: '#9FA8DA' // Set your own custom Color
  render() {
    return (
      <View style={{}}>
        <View style={styles.container}>
          <LinearGradient
            colors={["transparent", "#191970", "black", "transparent"]}
            start={[0, 0]}
            end={[1, 1]}
          >
            <View style={{ marginHorizontal: 0, paddingVertical: 0 }}>
            <Text style={{textAlign: "right"}}> <ImagePickerExample/> </Text>
            
              <View
                style={{
                  height: 150,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <View
                style={{ position: "absolute", alignSelf: "center", paddingTop: 25 }}
              >
                <Text
                  style={{ textAlign: "center", color: "white", fontSize: 30 }}
                >
                  {this.state.name}
                </Text>
              </View>
                {/* <Image style={styles.flag} source={CHINA}/>
                <Image style={styles.flag} source={USA} />
                 <Image style={styles.flag} source={INDIA}/>*/}
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.container}>
          <LinearGradient
            colors={["transparent", "#191970", "black", "transparent"]}
            start={[0, 0]}
            end={[1, 1]}
          >
            <View style={{ marginHorizontal: 0, paddingVertical: 230 }}>
              
              <View style={{ position: "absolute", top: 110, paddingLeft: 10 }}>
                <Text style={{ color: "white", fontSize: 18 }}>
                  {this.state.type} Student
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Language:
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    {this.state.language.map((item, key) => (
                      <Text
                        key={key}
                        style={{
                          color: "white",
                          fontSize: 16,
                          textAlignVertical: "center",
                        }}
                      >
                        {" "}
                        {item}
                      </Text>
                    ))}
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Country:
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        textAlignVertical: "center",
                      }}
                    >
                      {" "}
                      {this.state.country}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View
                style={{
                  position: "absolute",
                  top: 180,
                  alignSelf: "center",
                  padding: 10,
                }}
              >
                <Text
                  style={{ textAlign: "center", color: "gray", fontSize: 14 }}
                >
                  {this.state.bio}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "#000000",
                  borderRadius: 100,
                  //alignContent: "center",
                  //alignItems: "center",
                  alignSelf: "center",
                  position: "absolute",
                  top: -100,
                }}
              >
                
                <TouchableOpacity
                  onPress={() => {
                    
                  }}
                >
                  <View style={styles.profileImage}>
                    <Image
                      style={styles.image}
                      source={{ uri: this.state.pic }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    margin: 20,
    overlayColor: "blue",
    position: "relative",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  flag: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: "contain",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    margin: 9,
    //alignSelf: "center",
    //alignContent: "center",
    //position: "relative",
  },
  text: {
    color: "#52575D",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
});
