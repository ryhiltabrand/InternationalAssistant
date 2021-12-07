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
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import firebase from "firebase";
import { deletefriends } from "../../shardedComponents/Friends/FriendRequest";

//import {navigation} from '@react-navigation/native'
LogBox.ignoreLogs(["Setting a timer"]);

class FriendsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this._unsubscribe;
    this.state = {
      data: [],
      pendingFriends: {},
      RequestedFriends: {},
    };
  }
  componentDidMount() {
    this.clearState();
    //this.Loc();
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.clearState();
      this.Loc();
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  clearState = () => {
    this.setState({
      data: [],
    });
  };

  Loc = async () => {
    const usersRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    const doc = await usersRef.get();
    var fl = doc.data().FriendsList;

    var f1A = Object.keys(fl);
    var f1V = Object.values(fl);
    var TrueFriends = Object.keys(fl).reduce((o, key) => {
      fl[key] === "Friends" && (o[key] = fl[key]);
      return o;
    }, {});
    var PendingFriends = Object.keys(fl).reduce((o, key) => {
      fl[key] === "Pending" && (o[key] = fl[key]);
      return o;
    }, {});
    var RequestedFriends = Object.keys(fl).reduce((o, key) => {
      fl[key] === "Requested" && (o[key] = fl[key]);
      return o;
    }, {});
    this.setState({
      pendingFriends: PendingFriends,
      RequestedFriends: RequestedFriends,
    });
    var TrueFriendsKeys = Object.keys(TrueFriends);
    for (var i = 0; i < TrueFriendsKeys.length; i++) {
      var Friendquery = await firebase
        .firestore()
        .collection("users")
        .where("UID", "==", TrueFriendsKeys[i])
        .get();
      Friendquery.docs.map((doc) => {
        const name = doc.get("name");
        const profpic = doc.get("profilepicture");
        let friend = { uid: TrueFriendsKeys[i], name: name, pic: profpic };
        this.setState({
          data: [...this.state.data, friend],
        });
      });
    }
  };
  render() {
    return (
      <View style={styles.body}>
        <View style={{ width: 150, marginTop:10, justifyContent:'center',alignSelf:"center" }}>
        <TouchableOpacity
          style={{backgroundColor:'white',
          //alignItems: "flex-end",
          justifyContent: "center",
          paddingVertical: 13,
          //paddingHorizontal: 32,
          borderRadius: 4,
          borderColor: "#FFFFFF",
          elevation: 3,
          backgroundColor: "#404A5A",}}
          onPress={() => {
            this.clearState();
            this.Loc();
            this.props.navigation.navigate("PendingFriends", {
              Pending: this.state.pendingFriends,
              Requested: this.state.RequestedFriends,
            });
          }}
        >
          <Text style={{fontSize: 18, paddingLeft: 6, paddingRight: 6, color: 'white', textAlign:"center"}}>Pending Friends</Text>
        </TouchableOpacity>
        </View>
        <FlatList
          style={styles.container}
          enableEmptySections={true}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.uid;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("Profile", {
                  UID: item.uid
                });
              }}>
                <View style={styles.boxA}>
                  <View style={{ flexDirection: "row" }}>
                    <Image style={styles.image} source={{ uri: item.pic }} />
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                  <View
                    style={{
                      paddingLeft: 280,
                      paddingTop: 13,
                      position: "absolute"
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "center",
                        paddingVertical: 13,
                        //paddingHorizontal: 32,
                        borderRadius: 4,
                        borderColor: "#FFFFFF",
                        elevation: 3,
                        backgroundColor: "#404A5A",
                      }}
                      onPress={() => {
                        deletefriends(item.uid);
                      }}
                    >
                      <Text style={{fontSize: 18, paddingLeft: 6, paddingRight: 6, color: 'white'}}>Remove</Text>
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
/*const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },

  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  name: {
    color: "#20B2AA",
    fontSize: 22,
    alignSelf: "center",
    marginLeft: 10,
    textAlign: "center",
  },
});*/
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
    flex: 1,
    marginBottom: 50
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
export default FriendsListScreen;
