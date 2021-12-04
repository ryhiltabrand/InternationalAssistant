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
import { StatusBar } from "expo-status-bar";


export class MessageListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalVisible: false,
      modalvisible: false,
      modalData: [],
      gData: [],
      id:null,
    };
  }
  componentDidMount() {
    this.DirectMessages();
    this.GroupChats();
  }
  componentWillUnmount() {}

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  setModalvisible = (visible) => {
    this.setState({ modalvisible: visible });
  };

  clearState = () => {
    this.setState({
      data: [],
      modalData:[],
      gData:[],
      id:null,
    });
  };
  

  DirectMessages = async() =>{
    OtherUser= []
    const currentUser = firebase.auth().currentUser.uid;
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
  GroupChats = async() =>{
    //gChats=[]
    const currentUser = firebase.auth().currentUser.uid;
    userRef = firebase.firestore().collection("users").doc(currentUser)
    const doc = await userRef.get()
    var language = doc.data().language
    for (var i=0; i<language.length; i++){
      gChatquery = await firebase.firestore().collection("GroupChats")
      .where(firebase.firestore.FieldPath.documentId(), "==", language[i])
      .get()
      gChatquery.docs.map((doc)  =>{
        const users = doc.data().Users
        const pic = doc.data().chatPic
        const id = doc.id
        let groups = {users: users, pic: pic, id: id}
        this.setState({
          gData:[...this.state.gData, groups],
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
  AddChat = async (ouid) =>{
    Users=[ouid,firebase.auth().currentUser.uid]
    Users.sort()
    data = {
      Users: Users,
    }
    const add = await firebase.firestore().collection("DirectMessaging").add(data)
    console.log("Worked ", add.id)
  }

  Joinchat = async() =>{
    docRef= firebase.firestore().collection("GroupChats").doc(this.state.id)
    const doc = await docRef.get()
    var Users= doc.data().Users;
    console.log(Users)
    Users.push(firebase.auth().currentUser.uid)
    Users.sort()
    const add = await firebase.firestore().collection("GroupChats")
    .doc(this.state.id)
    .update({
      Users: Users,
    })
  }


render(){
  const { modalVisible } = this.state;
  const { modalvisible} = this.state;
    return (
      <View>
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
          this.GroupChats()
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
              <TouchableOpacity onPress={() => this.AddChat(item.uid)}>
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
            horizontal={true}
            enableEmptySections={true}
            data={this.state.gData}
            keyExtractor={(item)=>{
              return item.id;
            }}
            renderItem={({ item }) =>{
              return(
                <TouchableOpacity onPress={() =>{
                  if(item.users.includes(firebase.auth().currentUser.uid)!=true){
                    this.setState({
                      id:item.id,
                      modalvisible: true,
                    })
                  }
                  else{
                    this.props.navigation.navigate("GroupChat", {
                      name: item.id,
                    })
                  }
                }}>
                  <View style={{padding:10}}/>
                  <Image style={styles.gimage} source={{uri : item.pic}}/>
                  <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalvisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    this.setModalvisible(!modalvisible);
                  }}
                  >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <TouchableOpacity 
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                    this.setModalvisible(!modalvisible)
                  }}
                  >
                  <Text>Back to Messages</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={[styles.button,styles.buttonClose]}
                  onPress={() =>{
                    this.Joinchat().then(() =>{
                      this.setModalvisible(!modalvisible)
                      this.clearState()
                      this.DirectMessages()
                      this.GroupChats()
                    })
                  }}
                  >
                  <Text>Join Group Chat</Text>
                  </TouchableOpacity>
                  </View>
                  </View>
                  </Modal>
                  </TouchableOpacity>
              )
            }}
            />
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
  gimage: {
    width: 60,
    height: 60,
    marginHorizontal:5,
    borderColor:'black',
    borderWidth:2,
  },
  gcontainer:{
    flex:1,
    marginTop:StatusBar.currentHeight || 0,
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
    justifyContent:'center',
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
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
});