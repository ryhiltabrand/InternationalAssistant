import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "../../utilities/firebase";
import { EventRegister } from "react-native-event-listeners";
import { render } from "react-dom";

export default class DrawerCustom extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      UID: "",
      Name: "",
      Picture:
        "data:image/jpeg;base64,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",
      Email: "",
    };
  }
  Name = async () => {
    var uid = firebase.auth().currentUser.uid;
    const usersRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const doc = await usersRef.get();
    var name = doc.data().name;
    var pic = doc.data().profilepicture;
    var email = doc.data().email;
    this.setState({ UID: uid, Name: name, Picture: pic, Email: email });
  };
  componentDidMount() {
    
      this.Name();
   
  }
  componentWillUnmount() {}

  clearState = () => {
    this.setState({
      UID: "",
      Name: "",
      Picture:
        "data:image/jpeg;base64,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",
      Email: "",
      
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.student_image}
              onPress={() => {
                this.props.navigation.navigate("Profile", {
                  UID: this.state.UID,
                });
              }}
            >
              <Image
                style={styles.student_image}
                source={{
                  uri: this.state.Picture,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 150, marginTop: 25 }}
              onPress={() => {
                this.props.navigation.navigate("Settings");
              }}
            >
              <Text>
                <FontAwesome5 name={"cog"} size={30} color={"white"} />
              </Text>
            </TouchableOpacity>
            <View
              style={{ marginLeft: 15, flexDirection: "column", marginTop: 65 }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>
                {this.state.Name}
              </Text>
              <Text style={{ marginTop: 0 }}>{this.state.Email}</Text>
            </View>
          </View>
          <View style={{}}>
            <DrawerItem
              label="Message"
              labelStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              onPress={() => {
                this.props.navigation.navigate("Messager");
              }}
            />
            <DrawerItem
              label="Home"
              labelStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              label="Friends"
              labelStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              onPress={() => {
                this.props.navigation.navigate("Friends");
              }}
            />
            <DrawerItem
              label="Events"
              labelStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              onPress={() => {
                this.props.navigation.navigate("Events");
              }}
            />
            <DrawerItem
              label="Locations"
              labelStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              onPress={() => {
                this.props.navigation.navigate("Locations");
              }}
            />
            <DrawerItem
              label="Help"
              labelStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              onPress={() => {
                this.props.navigation.navigate("Help");
              }}
            />
            <DrawerItem
              label="Q&A"
              labelStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              onPress={() => {
                this.props.navigation.navigate("Q&A");
              }}
            />
            <TouchableOpacity
              style={{ marginLeft: 150, marginTop: 25 }}
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    EventRegister.emit("auth", null);
                  })
                  .catch((error) => {
                    console.log("this dont work");
                  });
              }}
            >
              <Text>
                <FontAwesome5 name={"fingerprint"} size={30} color={"white"} />
              </Text>
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  toppading: {
    height: 80,
    width: 400,
    backgroundColor: "#8CAFC0",
    position: "absolute",
  },

  downpading: {
    height: 80,
    width: 400,
    backgroundColor: "#8CAFC0",
    position: "absolute",
    bottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    top: 30,
  },
  student_image: {
    position: "absolute",
    width: 90,
    height: 90,
    top: 13,
    left: "3%",
    borderRadius: 70,
  },

  friends_image: {
    position: "absolute",
    width: 40,
    height: 40,
    top: 13,
    left: "55%",
  },
  message_image: {
    position: "absolute",
    width: 40,
    height: 40,
    top: 13,
    left: "65%",
  },

  setting_image: {
    position: "absolute",
    width: 40,
    height: 40,
    top: 13,
    left: "75%",
  },

  map_image: {
    position: "absolute",
    width: 40,
    height: 40,
    bottom: 10,
  },

  event_image: {
    position: "absolute",
    width: 40,
    height: 40,
    bottom: 10,
    left: "20%",
  },

  home_image: {
    position: "absolute",
    width: 40,
    height: 40,
    bottom: 10,
    left: "40%",
  },

  help_image: {
    position: "absolute",
    width: 40,
    height: 40,
    bottom: 10,
    left: "60%",
  },

  question_image: {
    position: "absolute",
    width: 40,
    height: 40,
    bottom: 10,
    left: "80%",
  },
});
