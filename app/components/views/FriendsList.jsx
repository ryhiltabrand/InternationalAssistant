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

LogBox.ignoreLogs(["Setting a timer"]);

class FriendsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.Loc();
  }
  componentWillUnmount() {
    
  }

  Loc = async () => {
    /*const usersRef = firebase
      .firestore()
      .collection("users")
      .where("UID", "==", "0xxKyF55NpVIvZ8Zq2WchryNQSY2")
      .get();*/
    const usersRef = firebase.firestore().collection("users").where('UID', '==', firebase.auth().currentUser.uid).get();
    (await usersRef).forEach((doc) => {
      var fl = doc.get("FriendsList");
      var f1A = Object.keys(fl);
      for (var i = 0; i < f1A.length; i++) {
        firebase
          .firestore()
          .collection("users")
          .where("UID", "==", f1A[i])
          .get()
          .then((snapshot) => {
            snapshot.docs.map((doc) => {
              const name = doc.get("name");
              const profpic = doc.get("profilepicture");
              let friend = { name: name, pic: profpic };
              this.setState({
                data: [...this.state.data, friend],
              });
            });
          });
      }
    });
  };
  render() {
    return (
      <View style={styles.body}>
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
  image:{
    width: 60,
    height: 60,
  },
  
  box: {
    padding:5,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2,

  },
  name:{
    color: "#20B2AA",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10,
    textAlign:'center'
  }
});

export default FriendsListScreen;
