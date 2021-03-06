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
import React, { TouchableOpacity, useState,useEffect } from "react";
import firebase from "firebase";

export default function Questionview({ route, navigation }) {
  /* 2. Get the param */
  const { Name, Pic, Answers, Question,DocID } = route.params;
  const [replys, setreplys] = useState([]);
  const [answers, setanswers] = useState(null);

  useEffect(() => {
    puller();
  },[]);

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
      //var Rater = doc
      //var like = doc.data().Like
      //var dislike = doc.data().Dislike
      var size = replyref.size
      
      let reply = {
        Name: name,
        Pic: pic,
        Text: text,
        ID: id,
        //Dislike: dislike,
        //Like: like,
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
        <View style={styles.fifthLine}>
          <Text>Answers:: {answers}</Text>
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
              </View>

              <View style={styles.secondLine}>
                <Text style={styles.request}>{item.Text}</Text>
              </View>
              
              {/* <View
          style={{
            flex: 1,
            marginRight: 3,
            justifyContent: "center",
            alignContent: "center",
            marginTop: 3
          }}
        >
          <Pressable style={styles.button}>
            <Text style={styles.text}>Like: {item.Like}</Text>
          </Pressable>
        </View>
        <View style={{ flex: 1,
            marginRight: 3,
            marginTop: 3,
            justifyContent: "center",
            alignContent: "center", }}>
          <Pressable style={styles.button}>
            <Text style={styles.text}>DisLike: {item.Dislike}</Text>
          </Pressable>
        </View> */}

            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flexDirection: "column",
  },
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
