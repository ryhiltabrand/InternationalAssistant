import FriendMatcher from "../../shardedComponents/Friends/friendmatch";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  LogBox,
  Modal,
} from "react-native";
import firebase from "firebase";
import updatefriends from "../../shardedComponents/Friends/Addfriends";

class FriendsMatchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.Recomendations();
  }
  componentWillUnmount() {}

  data = async (Uid) => {
    userRef = firebase.firestore().collection("users").doc(Uid);
    const doc = await userRef.get();
    //console.log(doc.data())
    var name = doc.data().name;
    var profpic = doc.data().profilepicture;
    let friend = { uid: Uid, name: name, pic: profpic };
    this.setState({
      data: [...this.state.data, friend],
    });
  };

  Recomendations = async () => {
    FriendMatcher().then((results) => {
      for (var i = 0; i < results.length; i++) {
        //console.log(results[i]);
        this.data(results[i]);
      }
    });
  };

  render() {
    return (
      <View style={{flexDirection: "column", flex: 1, backgroundColor: "#003057"}}>
        <TouchableOpacity
          onPress={() => {
            this.setState({ data: [] });
            this.Recomendations();
            if (this.state.data.length == 0) {
              alert("No More");
            }
          }}
        >
          <Text>Retry</Text>
        </TouchableOpacity>
        <FlatList
          style={styles.container}
          enableEmptySections={true}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.uid;
          }}
          renderItem={({ item }) => {
            
            return (
              <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Profile", {
                  UID: item.uid
                });
              }}>
                <>{/*console.log(this.state.data)*/}</>
                <View style={styles.boxA}>
                  <View style={{ flexDirection: "row" }}>
                    <Image style={styles.image} source={{ uri: item.pic }} />
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                  <View
                    style={{
                      paddingLeft: 280,
                      paddingTop: 13,
                      position: "absolute",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        updatefriends(item.uid);
                      }}
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "center",
                        paddingVertical: 13,
                        //paddingHorizontal: 32,
                        borderRadius: 4,
                        elevation: 3,
                        backgroundColor: "#404A5A",
                      }}
                    >
                      <Text style={{fontSize: 18, paddingLeft: 6, paddingRight: 6}}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
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
    textAlign: "center",
  },
  body: {
    flexDirection: "column",
    backgroundColor: "#003057",
    flex: 1
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
    borderColor: "#0A192D",
    borderStyle: "solid",
    borderWidth: 3,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: "#98C5EA",
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
    color: "black",
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

export default FriendsMatchScreen;
