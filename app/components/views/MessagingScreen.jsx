import * as React from "react";
import { 
  Text, 
  View, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  LogBox,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import firebase from "firebase";


class MessageScreen extends React.Component {
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
              <TouchableOpacity>
                <View style={styles.box}>
                  <Image style={styles.image} source={{uri : item.pic}} />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              </TouchableOpacity>);
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

  const MessageStack = createNativeStackNavigator();
  const MessageStackScreen = ({navigation}) => (
  <MessageStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#ADD8E6',
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <MessageStack.Screen name="MessageScreen" component={MessageScreen} options={{
          title:'Messaging',
          headerTitleAlign:"center",
          headerLeft: () => (
              <FontAwesome5.Button name="bars" size={25} color="#000000" backgroundColor="#ADD8E6" onPress={() => navigation.openDrawer()}></FontAwesome5.Button>
          )
          }} />
  </MessageStack.Navigator>
  ); 
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
export default MessageStackScreen;
