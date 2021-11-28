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
import updatefriends from '../../shardedComponents/Friends/Addfriends'

class FriendsMatchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      
    };
  }
  componentDidMount() {
    this.Recomendations()
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
        console.log(results[i])
        this.data(results[i]);
      }
    });
  };

  render() {
   
    return (
        
      <View style={styles.body}>
          <TouchableOpacity
          onPress={() => {
            this.setState({data: []})
            this.Recomendations();
            if (this.state.data.length == 0){
              alert("No More")
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
            return item.name;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <View style={styles.box}>
                  <Image style={styles.image} source={{ uri: item.pic }} />
                  <Text style={styles.name}>{item.name}</Text>
                  <TouchableOpacity onPress={() => {
                      updatefriends(item.uid)
                    }}><Text>Add</Text></TouchableOpacity>
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

export default FriendsMatchScreen;
