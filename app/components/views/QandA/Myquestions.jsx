import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  LogBox,
  Modal,
  Button,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import firebase from "firebase";
import AddQuestion from "../../shardedComponents/QandA/postQuestion";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";


LogBox.ignoreLogs(["Setting a timer"]);

class MyQuestion extends React.Component {
  constructor(props) {
    super(props);
    this._unsubscribe;
    this.state = {
      modalVisible: false,
      data: [],
      Request: "",
    };
  }
  
  componentDidMount() {
      this.clearState();
      //this.Loc();
      this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.clearState();
      this.MyRequests();
    });
  }
  componentWillUnmount() {this._unsubscribe;}
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  clearState = () => {
    this.setState({
      data: [],
    });
  };
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  
  uploadRequest() {
    if (
      this.state.Request == null
    ) {
      alert("Make sure you inputted the question");
    } else {
      AddQuestion(
        this.state.Request,
      );
    }
  }
  MyRequests = async () => {
    const usersRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const doc = await usersRef.get();
    var name = doc.data().name;
    var pic = doc.data().profilepicture;
    var DocID;
    const RequestsQuery = await firebase
      .firestore()
      .collection("Questions and Answers")
      .where("RequesterUID", "==", firebase.auth().currentUser.uid)
      .get();
    RequestsQuery.docs.map((doc) => {
      DocID = doc.id
      var ruid = doc.get("RequesterUID");
      var huid = doc.get("answererUID");
      var question = doc.get("Question");
      var answers = doc.get("Answers");
      let Request = {
        Pic: pic,
        Name: name,
        Question: question,
        Answers: answers,
        DocID: DocID,

      };
      
      this.setState({
        data: [...this.state.data, Request],
      });
    });
  };
  render() {
    const { modalVisible } = this.state;
    
    return (
      <View style={styles.body}>
        <Button title="Post Question" onPress={() => this.setModalVisible(true)} />

        <FlatList
          style={styles.scrollView}
          enableEmptySections={true}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.DocID;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("IndividualQuestion", {
                  Name: item.Name,
                  Pic: item.Pic,
                  Answers: item.Answers,
                  Question: item.Question,
                  DocID: item.DocID,
                });
              }}>
                
                <View style={styles.box}>
                  <View style={styles.firstLine}>
                    <Image style={styles.image} source={{ uri: item.Pic }} />
                    <Text style={styles.name}>{item.Name}</Text>
                  </View>

                  <View style={styles.secondLine}>
                    <Text style={styles.request}>{item.Question}</Text>
                  </View>
                </View>
                </TouchableOpacity>
            );
          }}
        />
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
            style={styles.SumbitBtn}
            onPress={() => {
              this.setModalVisible(!modalVisible);
              //this.clearState();
            }}
          >
            <Text style={styles.SumbitBtnText}>Go Back</Text>
          </TouchableOpacity>
      
          <TextInput
            multiline
            numberOfLines={4}
            onChangeText={(val) => this.updateInputVal(val, "Request")}
            placeholder="Type out your Question here"
            maxLength={256}
            style={{
              padding: 10,
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: 3,
            }}
          />
          

          <TouchableOpacity
            onPress={() => {
              if (
                this.state.Request == null 
              ) {
                alert(
                  "Please enter a question"
                );
              } else {
                AddQuestion(
                  this.state.Request,

                );
                this.setModalVisible(!modalVisible);
                this.clearState()
                this.MyRequests()
              }
            }}
            style={styles.SumbitBtn}
          >
            <Text style={styles.SumbitBtnText}>Submit</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  body: {
    flexDirection: "column",
    backgroundColor: "#003057",
    flex: 1,
    marginBottom: 50
  },
  box: {
    padding: 13,
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
    marginTop: 0,
    flex: 1,
    flexDirection: "row",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 3,
  },
  secondLine: {
    flex: 2,
  },
  thirdLine: {
    flex: 3,
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
    marginTop: 3,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
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

export default MyQuestion;
