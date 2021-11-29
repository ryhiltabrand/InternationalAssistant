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
  Button
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import firebase from "firebase";
import AddEvent from "../../shardedComponents/Help/AddRequest";
import DropDownPicker from "react-native-dropdown-picker";

LogBox.ignoreLogs(["Setting a timer"]);


class AllRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      data: [],
      Request: "",
      Amount: null,
    };

  }
  componentDidMount() {
    this.AllRequests();
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
  

  AllRequests = async () => {
    const usersRef = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const doc = await usersRef.get();
    var name = doc.data().name;
    var pic = doc.data().profilepicture;

    RequestsQuery = await firebase
      .firestore()
      .collection("Requests")
      .where("RequesterUID", "==", firebase.auth().currentUser.uid)
      .get();
    RequestsQuery.docs.map((doc) => {
      var ruid = doc.get("RequesterUID");
      var huid = doc.get("HelperUID");
      var description = doc.get("Description");
      var campus = doc.get("Campus");
      var status = doc.get("Completed");
      var helpersAmount = doc.get("HelperAmount");
      var language = doc.get("PreferedLanguage");
      var comments = doc.get("Comments");
      var date = doc.get("CreationTime");
      var applicants = doc.get("Applicants")

      let Request = {
        Pic: pic,
        Name: name,
        Date: date,
        Description: description,
        Campus: campus,
        Status: status,
        AmountOfHelpers: helpersAmount,
        Languages: language,
        Comments: comments,
        Helpers: huid,
        Applicants: applicants
      };
      console.log(Request);
      this.setState({
        data: [...this.state.data, Request],
      });
    });
  };

  render() {
    return (
      <View style={styles.body}>
        
        <FlatList
          style={styles.scrollView}
          enableEmptySections={true}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.name;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('IndividualRequest', 
              {
               Name: item.Name,
               Pic: item.Pic,
               AmountRequested: item.AmountOfHelpers,
               Applicants: item.Applicants,
               Campus: item.Campus,
               Comments: item.Comments,
               Date: item.Date,
               Description: item.Description,
               Helpers: item.Helpers,
               Language: item.Language,
              }) }}>
                <View style={styles.box}>
                  <View style={styles.firstLine}>
                    <Image style={styles.image} source={{ uri: item.Pic }} />
                    <Text style={styles.name}>{item.Name}</Text>
                    <Text style={styles.time}>{item.Date}</Text>
                  </View>

                  <View style={styles.secondLine}>
                    <Text style={styles.request}>{item.Description}</Text>
                  </View>
                  <View style={styles.thirdLine}>
                    <Text>Prefered Language: {item.Languages}</Text>
                  </View>
                  <View style={styles.forthLine}>
                    <Text>Campus: {item.Campus}</Text>
                  </View>
                  <View style={styles.fifthLine}>
                    <Text>Requested Helpers: {item.AmountOfHelpers}</Text>
                    <Text style={{paddingLeft:5}}>Applicants: {item.Applicants.length}</Text>
                  </View>
                  <View style={styles.fifthLine}>
                    <Text>Comments: {Object.keys(item.Comments).length}</Text>
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
    forthLine: {
      flex: 4,
      flexDirection: "row",
    },
    fifthLine: {
      flex: 5,
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
  
  export default AllRequest;
  