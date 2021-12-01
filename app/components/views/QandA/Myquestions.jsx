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
import AddEvent from "../../shardedComponents/Help/AddRequest";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

LogBox.ignoreLogs(["Setting a timer"]);

class MyQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      data: [],
      Request: "",
    };
  }
  
  componentDidMount() {
    this.MyRequests();
  }
  componentWillUnmount() {}
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
      AddEvent(
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
    RequestsQuery = await firebase
      .firestore()
      .collection("Questions and Answers")
      .where("posterUID", "==", firebase.auth().currentUser.uid)
      .get();
    RequestsQuery.docs.map((doc) => {
      var ruid = doc.get("posterUID");
      var huid = doc.get("answererUID");
      var question = doc.get("Question");
      var answers = doc.get("Answers");
      //var DateN = new Date(date);
      let Request = {
        Name: name,
        Question: question,
        Answers: answers,

      };
      
      

export default MyQuestion;
