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
  TouchableOpacity,
} from "react-native";
import React, {  useEffect, useState } from "react";
import ApplyForRequest from "./../../shardedComponents/Help/ApplyForRequest";
import firebase from "firebase";
import { FontAwesome } from "@expo/vector-icons";

export default function OthersQuestion({ route, navigation }) {
  /* 2. Get the param */
  const { Name, Pic, Answers, Question, DocID } = route.params;

  const [replys, setreplys] = useState([]);
  const [answers, setanswers] = useState(null);
  const [likes, setlikes] = useState(null);
  const [donwvotes, setdownvotes] = useState(null);
  const [total, settotal] = useState(null)
  //const [text, onChangeText]
  useEffect(() => {
    puller();
  },[]);

  var Upvoter = async(ID,Rater) =>{
    var RaterA = Object.keys(Rater)
    var RaterV = Object.values(Rater)
    var Likes = Object.keys(Rater).reduce((o,key) =>{
      Rater[key]  === "Like" && (o[key] = Rater[key])
      return o;
    }, {});
    if(Likes[firebase.auth().currentUser.uid] !== "Like"){
      const updater = await firebase.firestore().collection("Questions and Answers")
      .doc(DocID)
      .collection("Answers")
      .doc(ID)
      .update({
        [`Rater.${firebase.auth().currentUser.uid}`] : 'Like'
      })
      const checker = await firebase.firestore().collection("Questions and Answers")
      .doc(DocID)
      .collection("Answers")
      .doc(ID)
      .get()
      const V2= checker.data().Rater;
      var RaterA = Object.keys(V2)
      var RaterV = Object.values(V2)
      var Likes = Object.keys(V2).reduce((o,key) =>{
      V2[key]  === "Like" && (o[key] = V2[key])
      return o;
    }, {});
      setlikes(Object.keys(Likes).length)
      settotal((likes-donwvotes))
      puller();
      console.log(total)
    }

  }
  var Downvoter = async(ID,Rater) =>{
    var RaterA = Object.keys(Rater)
    var RaterV = Object.values(Rater)
    var Dislikes = Object.keys(Rater).reduce((o,key) =>{
      Rater[key]  === "Dislike" && (o[key] = Rater[key])
      return o;
    }, {});
    if(Dislikes[firebase.auth().currentUser.uid] !== "Dislike"){
      const updater = await firebase.firestore().collection("Questions and Answers")
      .doc(DocID)
      .collection("Answers")
      .doc(ID)
      .update({
        [`Rater.${firebase.auth().currentUser.uid}`] : 'Dislike'
      })
      const checker = await firebase.firestore().collection("Questions and Answers")
      .doc(DocID)
      .collection("Answers")
      .doc(ID)
      .get()
      const V2= checker.data().Rater;
      var RaterA = Object.keys(V2)
      var RaterV = Object.values(V2)
      var Dislikes = Object.keys(V2).reduce((o,key) =>{
      V2[key]  === "Dislike" && (o[key] = V2[key])
      return o;
    }, {});
      setdownvotes(Object.keys(Dislikes).length)
      settotal((likes-donwvotes))
      puller();
      console.log(total)
    }
  }

  async function puller() {
    setreplys([])
    const replyref = await firebase
      .firestore()
      .collection("Questions and Answers")
      .doc(DocID)
      .collection("Answers")
      .get();

    replyref.docs.map((doc) => {
      var name = doc.data().Name
      var pic = doc.data().Pic
      var text = doc.data().Text
      var id = doc.id
      var Rater = doc.data().Rater;
      var size = replyref.size
      var RaterA = Object.keys(Rater)
      var RaterV = Object.values(Rater)
      var Likes = Object.keys(Rater).reduce((o,key) =>{
      Rater[key]  === "Like" && (o[key] = Rater[key])
      return o;
      }, {});
      var RaterA = Object.keys(Rater)
      var RaterV = Object.values(Rater)
      var Dislikes = Object.keys(Rater).reduce((o,key) =>{
        Rater[key]  === "Dislike" && (o[key] = Rater[key])
        return o;
      }, {});

      settotal((Object.keys(Likes).length) - (Object.keys(Dislikes).length))
      
      let reply = {
        Name: name,
        Pic: pic,
        Text: text,
        ID: id,
        //e: dislike,
        //Like: like,
        Rater: Rater,
      }
      setanswers(size)
      setreplys((replys) => [...replys, reply]);
    });
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
        </View>

        <View style={styles.secondLine}>
          <Text style={styles.request}>{Question}</Text>
        </View>
        <View style={styles.thirdLine}>
          <Text>Answers: {answers}</Text>
        </View>
      </View>
      <Text style={{ fontSize: 30 }}>Answers:</Text>

      <FlatList
        style={styles.scrollView}
        enableEmptySections={true}
        data={replys}
        keyExtractor={(item) => {
          return item.ID;
        }}
        renderItem={({ item }) => {
          return (
            <View style={styles.box}>
              <View style={styles.firstLine}>
                <Image style={styles.image} source={{ uri: item.Pic }} />
                <Text style={styles.name}>{item.Name}</Text>
                <TouchableOpacity 
                style={styles.name}
                onPress={() => Upvoter(item.ID,item.Rater)}>
                  <FontAwesome name="thumbs-up" size={22} color='black'/>
                </TouchableOpacity>
                <View style={{borderColor:'black', alignItems:'center', paddingTop:11, marginLeft:10,}}>
                <Text style={{fontSize:22}} onChange={settotal}>{total}</Text>
                </View>
                <TouchableOpacity 
                style={styles.name}
                onPress={() => Downvoter(item.ID,item.Rater)}>
                  <FontAwesome name="thumbs-down" size={22} color='black'/>
                </TouchableOpacity>
              </View>
              <View style={styles.secondLine}>
                <Text style={styles.request}>{item.Text}</Text>
              </View>
            </View>
          );
        }}
      />

      {/* 
      <View style={styles.box}>
        <View style={styles.firstLine}>
          <Image style={styles.image} source={{ uri: RPic }} />
          <Text style={styles.name}>{RName}</Text>
        </View>

      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flexDirection: "column",
    marginBottom: 60
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
