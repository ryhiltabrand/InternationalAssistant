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
import deletefriends from "../../shardedComponents/Friends/removefriends";

LogBox.ignoreLogs(["Setting a timer"]);

class FriendsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pendingFriends: {},
      RequestedFriends:{},
    };
  }
  componentDidMount() {
    this.Loc();
  }
  componentWillUnmount() {}

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
      fl[key] === 'Friends' && (o[key] = fl[key]);
      return o;
    }, {});
    var PendingFriends = Object.keys(fl).reduce((o, key) => {
      fl[key] === 'Pending' && (o[key] = fl[key]);
      return o;
    }, {});
    var RequestedFriends = Object.keys(fl).reduce((o, key) => {
      fl[key] === 'Requested' && (o[key] = fl[key]);
      return o;
    }, {});
    this.setState({
      pendingFriends: PendingFriends,
      RequestedFriends:  RequestedFriends
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
        <TouchableOpacity
          onPress={() => {
            this.clearState();
            this.Loc();
          }}
        >
          <Text>Refresh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.clearState();
            this.Loc();
            this.props.navigation.navigate("PendingFriends", {
              Pending: this.state.pendingFriends,
              Requested: this.state.RequestedFriends
            });
          }}
        >
          <Text>Pending Friends</Text>
        </TouchableOpacity>
        
        <FlatList
          style={styles.container}
          enableEmptySections={true}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.name;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <View style={styles.box}>
                  <Image style={styles.image} source={{ uri: item.pic }} />
                  <Text style={styles.name}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      deletefriends(item.uid);
                    }}
                  >
                    <Text>Remove</Text>
                  </TouchableOpacity>
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
});

export default FriendsListScreen;
