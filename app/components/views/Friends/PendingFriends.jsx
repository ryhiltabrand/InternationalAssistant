import {
  Modal,
  Text,
  View,
  Pressable,
  TextInput,
  Button,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React, { TouchableOpacity, useState, useEffect } from "react";
import firebase from "firebase";

export default function PendingFriends({ route, navigation }) {
  /* 2. Get the param */
  const [modalVisible, setModalVisible] = useState(false);
  const [RequestedFriends, setRequested] = useState([]);
  const [PendingFriends, setPending] = useState([]);
  const [List, setList] = useState("Requested");

  const { Pending, Requested } = route.params;
  console.log("On Pending Screens: ", Pending, Requested);
  useEffect(() => {
    PendingFriendsQ();
    RequestedFriendsQ();
  }, []);

  var PendingFriendsQ = async () => {
    setPending([]);
    var PendingFriendsKeys = Object.keys(Pending);
    for (var i = 0; i < PendingFriendsKeys.length; i++) {
      var Friendquery = await firebase
        .firestore()
        .collection("users")
        .where("UID", "==", PendingFriendsKeys[i])
        .get();
      Friendquery.docs.map((doc) => {
        const name = doc.get("name");
        const profpic = doc.get("profilepicture");
        let friend = { uid: PendingFriendsKeys[i], name: name, pic: profpic };
        setPending((Data) => [...Data, friend]);
      });
    }
  };
  var RequestedFriendsQ = async () => {
    setRequested([]);
    var ReqFriendsKeys = Object.keys(Requested);
    for (var i = 0; i < ReqFriendsKeys.length; i++) {
      var Friendquery = await firebase
        .firestore()
        .collection("users")
        .where("UID", "==", ReqFriendsKeys[i])
        .get();
      Friendquery.docs.map((doc) => {
        const name = doc.get("name");
        const profpic = doc.get("profilepicture");
        let friend = { uid: ReqFriendsKeys[i], name: name, pic: profpic };
        setRequested((Data) => [...Data, friend]);
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Button
          title="Back to all requests"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
          flexDirection: "row",
          flex: 2,
        }}
      >
        <View
          style={{
            flex: 1,
            marginRight: 3,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Pressable style={styles.button} onPress={() => setList("Requested")}>
            <Text style={styles.text}>Friend Requests</Text>
          </Pressable>
        </View>
        <View style={{ flex: 1 }}>
          <Pressable style={styles.button} onPress={() => setList("Pending")}>
            <Text style={styles.text}>Pending Friends</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ flex: 20 }}>
        {List === "Requested" && (
          <FlatList
            style={styles.container}
            enableEmptySections={true}
            data={RequestedFriends}
            keyExtractor={(item) => {
              return item.name;
            }}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => {
                    console.log(`Hi`);
                  }}
                >
                  <View style={styles.boxA}>
                    <View style={{ flexDirection: "row" }}>
                      <Image style={styles.image} source={{ uri: item.pic }} />
                      <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <View style={{ paddingLeft: 10, paddingTop: 5, flex: 1 }}>
                      <Pressable
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          paddingVertical: 13,
                          //paddingHorizontal: 32,
                          borderRadius: 4,
                          elevation: 3,
                          backgroundColor: "teal",
                        }}
                        onPress={() => {
                          console.log(`you approved this bitch ${item.uid}`);
                        }}
                      >
                        <Text>Approve</Text>
                      </Pressable>
                    </View>
                    <View style={{ paddingLeft: 10, paddingTop: 5, flex: 1 }}>
                      <Pressable
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 13,
                        //paddingHorizontal: 32,
                        borderRadius: 4,
                        elevation: 3,
                        backgroundColor: "teal",
                      }}
                        onPress={() => {
                          console.log(`you denied this bitch ${item.uid}`);
                        }}
                      >
                        <Text>Deny</Text>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        )}
        {List === "Pending" && (
          <FlatList
            style={styles.container}
            enableEmptySections={true}
            data={PendingFriends}
            keyExtractor={(item) => {
              return item.name;
            }}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => {
                    console.log(`Hi`);
                  }}
                >
                  <View style={styles.boxA}>
                    <Image style={styles.image} source={{ uri: item.pic }} />
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                </Pressable>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#008B8B",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  body: {
    flexDirection: "column",
  },
  image: {
    width: 60,
    height: 60,
  },
  SumbitBtn: {
    width: "80%",
    backgroundColor: "blue",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginLeft: 30,
  },
  SumbitBtnText: {
    color: "white",
    fontSize: 15,
  },
  boxA: {
    padding: 8,
    marginTop: 5,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 3,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: "#ADD8E6",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
    width: 380,
  },
  box: {
    padding: 8,
    marginTop: 5,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 3,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: "#ADD8E6",
    flexDirection: "column",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
    width: 380,
  },
  firstLine: {
    marginTop: 1,

    flexDirection: "row",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 3,
  },
  secondLine: {
    margin: 1,
  },
  thirdLine: {
    flexDirection: "row",
  },
  forthLine: {
    flexDirection: "row",
  },
  fifthLine: {
    flexDirection: "row",
  },
  name: {
    color: "#000000",
    fontSize: 18,
    paddingTop: 15,
    paddingLeft: 10,
  },
  time: {
    color: "gray",
    fontSize: 16,
    paddingTop: 15,
    paddingLeft: 10,
    textAlign: "right",
  },
  request: {
    color: "#000000",
    fontSize: 14,
    //marginTop: 3,
    //marginRight: 0,
    //marginLeft: 0,
    //marginBottom: 0,
    width: 350,
    textAlign: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 3,
    position: "relative",
  },
  remove: {
    color: "#000000",
    fontSize: 14,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    height: 30,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
});
