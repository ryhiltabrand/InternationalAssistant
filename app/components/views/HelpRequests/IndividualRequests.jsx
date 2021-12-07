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
import {
  AcceptApplicant,
  DenyApplicant,
} from "./../../shardedComponents/Help/updateHelper";
import firebase from "firebase";
import AddChat from "../../shardedComponents/Help/createMessage.js";

export default function IndividualRequest({ route, navigation }) {
  /* 2. Get the param */
  const [modalVisible, setModalVisible] = useState(false);
  const [Data, setData] = useState([]);
  const [current, setCurrent] = useState(null);
  const [CorDate, setCorDate] = useState(new Date());
  const {
    Name,
    Pic,
    AmountRequested,
    Applicants,
    Campus,
    Comments,
    Description,
    HelpersUID,
    Language,
    Doc,
    date,
  } = route.params;

 
  useEffect(() => {
    setCorDate(new Date(date));
  },[]);


  var ApplicantsInfo = async () => {
    setData([]);
    for (var i = 0; i < Applicants.length; i++) {
      const ApplicantQuery = await firebase
        .firestore()
        .collection("users")
        .where("UID", "==", Applicants[i])
        .get();
      ApplicantQuery.docs.map((doc) => {
        const name = doc.get("name");
        const profpic = doc.get("profilepicture");
        let applicant = { uid: Applicants[i], name: name, pic: profpic };
        setData((Data) => [...Data, applicant]);
      });
    }
  };
  var HelperInfo = async () => {
    setData([]);
    for (var i = 0; i < HelpersUID.length; i++) {
      const HelperQuery = await firebase
        .firestore()
        .collection("users")
        .where("UID", "==", HelpersUID[i])
        .get();
      HelperQuery.docs.map((doc) => {
        const name = doc.get("name");
        const profpic = doc.get("profilepicture");
        let helper = { uid: HelpersUID[i], name: name, pic: profpic };
        setData((Data) => [...Data, helper]);
      });
    }
  };
  return (
    <View style={styles.body}>
      <View style>
        <Button
          title="Back to all requests"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.box}>
        <View style={styles.firstLine}>
          <Image style={styles.image} source={{ uri: Pic }} />
          <Text style={styles.name}>{Name}</Text>
          <Text style={styles.time}>
            { 
            CorDate.getMonth() +
              "-" +
              CorDate.getDate() +
              " @ " +
              CorDate.getHours() +
              ":" +
            CorDate.getMinutes()}
          </Text>
        </View>

        <View style={styles.secondLine}>
          <Text style={styles.request}>{Description}</Text>
        </View>
        <View style={styles.thirdLine}>
          <Text>Prefered Language: {Language}</Text>
        </View>
        <View style={styles.forthLine}>
          <Text>Campus: {Campus}</Text>
        </View>
        <View style={styles.fifthLine}>
          <Text>Requested Helpers: {AmountRequested}</Text>
          <Text style={{ paddingLeft: 5 }}>
            Applicants: {Applicants.length}
          </Text>
        </View>
        <View style={styles.fifthLine}>
          <Text>Comments: {Object.keys(Comments).length}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          title=" Show Helpers"
          onPress={() => {
            setCurrent("Helper");
            HelperInfo();
          }}
        />
        <Text> </Text>
        <Button
          title=" Show Applicants"
          onPress={() => {
            setCurrent("Applicant");
            ApplicantsInfo();
          }}
        />
      </View>
      <View>
        {current == "Applicant" && (
          <FlatList
            style={styles.container}
            enableEmptySections={true}
            data={Data}
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
                    <Pressable
                      onPress={() => {
                        AcceptApplicant(Doc, item.uid);
                        ApplicantsInfo();
                      }}
                    >
                      <Text style={{ paddingRight: 5 }}>Approve</Text>
                    </Pressable>
                    <Pressable onPress={() => {}}>
                      <Text>Deny</Text>
                    </Pressable>
                  </View>
                </Pressable>
              );
            }}
          />
        )}
        {current == "Helper" && (
          <FlatList
            style={styles.container}
            enableEmptySections={true}
            data={Data}
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

                    <Pressable
                      onPress={() => {
                        console.log(`MESSAGE STUFF HERE`);
                        console.log(item.uid);
                        AddChat(item.uid);
                        navigation.navigate("Messager", {
                          screen: "ChatScreen",
                          param: {
                            name : "Help Request: " + item.name,
                            uid: item.uid,
                            Help: true,
                          },

                        });
                      }}
                    >
                      <Text>Start a message</Text>
                    </Pressable>
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
