import React, { Component, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundImage } from "react-native-elements/dist/config";

export default function Profiles({ route, navigation }) {
  /* 2. Get the param */
  const [modalVisible, setModalVisible] = useState(false);
  const [pic, setPic] = useState(null);
  const [name, setName] = useState(null);
  const [country, setCountry] = useState(null);
  const [language, setLanguage] = useState([]);
  const [bio, setBio] = useState(null);
  const [type, setType] = useState(null);
  useEffect(() => {
    Profile();
  }, []);
  const { UID } = route.params;

  var Profile = async () => {
    const currentUser = firebase.firestore().collection("users").doc(UID);
    const doc = await currentUser.get();
    const profpic = doc.data().profilepicture;
    const name = doc.data().name;
    const country = doc.data().country;
    const language = doc.data().language;
    const bio = doc.data().bio;
    const type = doc.data().native;
    setPic(profpic);
    setName(name);
    setCountry(country);
    setLanguage(language);
    setBio(bio);
    setType(type);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView>
        <View>
          <Button
            title="Back to all requests"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View>
          <View style={styles.container1}>
            <View>
              <LinearGradient
                colors={["transparent", "#191970", "black", "transparent"]}
                start={[0, 0]}
                end={[1, 1]}
              >
                <View style={{ marginHorizontal: 0, paddingVertical: 0 }}>
                  <View
                    style={{
                      height: 150,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        alignSelf: "center",
                        paddingTop: 25,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontSize: 30,
                        }}
                      >
                        {name}
                      </Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.container2}>
              <LinearGradient
                colors={[
                  
                  "transparent",
                  "#191970",
                  "black",
                  "transparent",
                ]}
                start={[0, 0]}
                end={[1, 1]}
              >
                <View style={{ marginHorizontal: 0, paddingVertical: 230 }}>
                  <View
                    style={{ position: "absolute", top: 110, paddingLeft: 10 }}
                  >
                    <Text style={{ color: "white", fontSize: 18 }}>
                      {type} Student
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
                        {language.map((item, key) => (
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
                          {country}
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
                      style={{
                        textAlign: "center",
                        color: "gray",
                        fontSize: 14,
                      }}
                    >
                      {bio}
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
                    <View style={styles.profileImage}>
                      <Image style={styles.image} source={{ uri: pic }} />
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#000000",
    margin: 20,
    overlayColor: "blue",
    position: "relative",
  },
  container2: {
    flex: 1,
    backgroundColor: "#000000",
    marginTop: 20,
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
