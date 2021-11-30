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
  Alert,
  ScrollView,
  LogBox,
  Touchable,
} from "react-native";
import firebase from "firebase";


export class MessageListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalVisible: false,
      modalData: [],
    };
  }
  componentDidMount() {
    this.DirectMessages();
  }
  componentWillUnmount() {}

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  clearState = () => {
    this.setState({
      data: [],
      modalData:[],
    });
  };
  

  DirectMessages = async() =>{
    OtherUser= []
    const currentUser = firebase.auth().currentUser.uid
    RecRef= await firebase.firestore().collection("DirectMessaging")
    .where("Users", 'array-contains', currentUser).get()
    RecRef.docs.map((doc) =>{
      for(i=0; i< doc.data().Users.length;i++){
        if(doc.data().Users[i] != currentUser){
          OtherUser.push(doc.data().Users[i])
        }
      }
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
  FriendListPuller = async () => {
    OtherUser=[];
    Userlist=[];
    const usersRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const doc = await usersRef.get();
    var fl = doc.data().FriendsList;
    var f1A = Object.keys(fl);
    const currentUser = firebase.auth().currentUser.uid
    RecRef= await firebase.firestore().collection("DirectMessaging")
    .where("Users", 'array-contains', currentUser).get()
    RecRef.docs.map((doc) =>{
      for(i=0; i< doc.data().Users.length;i++){
        if(doc.data().Users[i] != currentUser){
          OtherUser.push(doc.data().Users[i])
        }
      }
    })
    for (var i = 0; i < f1A.length; i++) {
      if(OtherUser.includes(f1A[i]) != true){
        if(Userlist.includes(f1A[i])!= true){
          Userlist.push(f1A[i])
        }
      }
    }
    if(Userlist.length ==0){
      Alert.alert("No more meesages can be added")
    }
    else {
      for (var i=0; i<Userlist.length;i++){
        Friendquery = await firebase
          .firestore()
          .collection("users")
          .where("UID", "==", Userlist[i])
          .get();
        Friendquery.docs.map((doc) => {
          const name = doc.get("name");
          const profpic = doc.get("profilepicture");
          let friend = { uid: Userlist[i], name: name, pic: profpic };
          this.setState({
            modalData: [...this.state.modalData, friend],
          });
        });
      }
    }
  };
  AddFriend = async (ouid) =>{
    Users=[ouid,firebase.auth().currentUser.uid]
    Users.sort()
    data = {
      Users: Users,
    }
    const add = await firebase.firestore().collection("DirectMessaging").add(data)
    console.log("Worked ", add.id)
  }


render(){
  const { modalVisible } = this.state;
    return (
      <View style={styles.body}>
        <TouchableOpacity 
        onPress={() => {
          this.FriendListPuller().then(() => this.setModalVisible(true));
        }}
        >
          <Text>Add</Text>
          </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
        <TouchableOpacity 
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          this.setModalVisible(!modalVisible)
          this.clearState()
          this.DirectMessages()
        }}
        >
          <Text>Back to Messages</Text>
          </TouchableOpacity>
          <FlatList
          styles={styles.container}
          enableEmptySections={true}
          data={this.state.modalData}
          keyExtractor={(item) => {
            return item.name;
          }}
          renderItem={({ item }) => {
            return(
              <TouchableOpacity onPress={() => this.AddFriend(item.uid)}>
                <View style={styles.box}>
                  <Image style={styles.image} source={{uri : item.pic}} />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              </TouchableOpacity>
              
              
              );
              
          }}
          />
              
          
          </Modal>
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
                uid: item.uid,
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