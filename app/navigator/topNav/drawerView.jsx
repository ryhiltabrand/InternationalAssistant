import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from '../../utilities/firebase';
import { EventRegister } from "react-native-event-listeners";

export default function DrawerCustom(props) {
     
  // console.log("the routes ", route)
  // console.log("the navigation ", navigation)
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.student_image}
            onPress={() => {
                props.navigation.navigate("Profile", {
                  UID: '8XnTipS1iBhyvzBE7CwX9BM59bP2'
                });
            }}>
            <Image
              style={styles.student_image}
              source={{uri: 'https://res.cloudinary.com/teepublic/image/private/s--rh264MCI--/t_Preview/b_rgb:484849,c_limit,f_jpg,h_630,q_90,w_630/v1517893785/production/designs/2341977_3.jpg'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 150, marginTop: 25 }}
            onPress={() => {
              props.navigation.navigate("Settings");
            }}
          >
            <Text>
              <FontAwesome5 name={"cog"} size={30} color={"black"} />
            </Text>
          </TouchableOpacity>
          <View style={{ marginLeft: 15, flexDirection: "column", marginTop: 65 }}>
            <Text style={{fontSize:20}}>Nishil</Text>
            <Text style={{marginTop:0}}>nshah001@odu.edu</Text>
          </View>
        </View>
        <View style={{}}>
        <DrawerItem
            label="Message"
            onPress={() => {
              props.navigation.navigate("Messager");
            }}
          />
          <DrawerItem
            label="Home"
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
          <DrawerItem
            label="Friends"
            onPress={() => {
              props.navigation.navigate("Friends");
            }}
          />
          <DrawerItem
            label="Events"
            onPress={() => {
              props.navigation.navigate("Events");
            }}
          />
          <DrawerItem
            label="Locations"
            onPress={() => {
              props.navigation.navigate("Locations");
            }}
          />
          <DrawerItem
            label="Help"
            onPress={() => {
              props.navigation.navigate("Help");
            }}
          />
          <DrawerItem
            label="Q&A"
            onPress={() => {
              props.navigation.navigate("Q&A");
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
              <FontAwesome5 name={"fingerprint"} size={30} color={"black"} />
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
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
