import * as React from "react";
import { Component } from "react";
import { 
  Text, 
  View, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  LogBox,
} from "react-native";
import firebase from "firebase";

export class MessageListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.DirectMessages();
  }
  componentWillUnmount() {}

  clearState = () => {
    this.setState({
      data: [],
    });
  };

  DirectMessages = async() =>{
    OtherUser= []
    const currentUser = firebase.auth().currentUser.uid
    RecRef= await firebase.firestore().collectionGroup("DirectMessaging")
    .where("RecieverID", "==", currentUser).get()
    RecRef.docs.map((doc) =>{
      OtherUser.push(doc.data().SenderID)
    })
    SenRef = await firebase.firestore().collectionGroup("DirectMessaging")
    .where("SenderID", "==", currentUser).get()
    SenRef.docs.map((doc) =>{
      OtherUser.push(doc.data().RecieverID)
    })
    for (var i =0; i<OtherUser.length; i++){
      DMquery= await firebase.firestore().collection("users")
      .where("UID", "==", OtherUser[i])
      .get()
      DMquery.docs.map((doc)=> {
        const name = doc.get("name");
        const profpic = doc.get("profilepicture");
        let user = { uid: OtherUser[i], name: name, pic: profpic};
        this.setState({
          data: [...this.state.data, user],
        })
      })
    }
  }



render(){
    return (
      <View style={styles.body}>
        <FlatList
          styles={styles.container}
          enableEmptySections={true}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.name;
          }}
          renderItem={({ item }) => {
            return(
              <TouchableOpacity onPress={() => this.props.navigation.navigate("ChatScreen",{
                name : item.name,
              })}>
                <View style={styles.box}>
                  <Image style={styles.image} source={{uri : item.pic}} />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              </TouchableOpacity>
              
              
              );
              
          }}
          />
      </View>
    )
}
/*
  render(){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          onPress={() => console.log("hello")}
          title="Welcome to Messages"
        />{" "}
      </View>
    );
  }
  */
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
  MessageName: {
    color: "#000000",
    fontSize: 22,
    alignSelf: "center",
    marginLeft: 10,
    textAlign: "center",
  },
  button: {
    textAlignVertical: "center",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});