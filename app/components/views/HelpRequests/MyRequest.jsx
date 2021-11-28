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

class MyRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      data: [],
      Request: "",
      Amount: null,
      open: false,
      openL: false,
      Language: null,
      Languages: [
        { label: "English", value: "English" },
        { label: "Spanish", value: "Spanish" },
      ],
      Campus: null,
      Campuses: [
        { label: "Old Dominion University", value: "Old Dominion University" },
        { label: "Any Campus", value: "Any" },
      ],
    };
    this.setLanguage = this.setLanguage.bind(this);
    this.setCampus = this.setCampus.bind(this);
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
  setOpen = (open) => {
    console.debug("opens dropdown");
    this.setState({
      open,
    });
  };
  setOpenL = (open) => {
    console.debug("opens dropdown");
    this.setState({
      openL: open,
    });
  };

  setLanguage(callback) {
    console.debug("set Value");
    this.setState(
      (state) => (
        console.debug("the value being inputed is ", callback(state.value)),
        { Language: callback(state.value) }
      )
    );
  }
  setCampus(callback) {
    console.debug("set Value");
    this.setState(
      (state) => (
        console.debug("the value being inputed is ", callback(state.value)),
        { Campus: callback(state.value) }
      )
    );
  }
  onChangedAmount(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert("please enter numbers only");
      }
    }
    this.setState({ Amount: newText });
  }
  uploadRequest() {
    if (
      this.state.Amount == null ||
      this.state.Campus == null ||
      this.state.Language == null ||
      this.state.Request == null
    ) {
      alert("Could not create the request make sure you inputted everything!");
    } else {
      AddEvent(
        this.state.Request,
        this.state.Amount,
        this.state.Language,
        this.state.Campus
      );
      
    }
  }
  MyRequests = async () => {
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
    const { modalVisible } = this.state;
    const { open, openL, Language, Campus } = this.state;
    return (
      <View style={styles.body}>
        
        <Button title="Add" onPress={() => this.setModalVisible(true)} />
        
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
            <Text style={styles.SumbitBtnText}>Back to Search</Text>
          </TouchableOpacity>
          <Text>Enter the following information to create a request</Text>
          <TextInput
            multiline
            numberOfLines={4}
            onChangeText={(val) => this.updateInputVal(val, "Request")}
            placeholder="Type out your Request here"
            maxLength={256}
            style={{
              padding: 10,
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: 3,
            }}
          />
          <Text>Amount of people</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(text) => this.onChangedAmount(text)}
            value={this.state.Amount}
            style={{
              paddingLeft: 10,
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: 3,
            }}
            maxLength={1} //setting limit of input
          />
          <Text> Prefered Language: </Text>
          <DropDownPicker
            open={openL}
            value={Language}
            items={this.state.Languages}
            setOpen={this.setOpenL}
            setValue={this.setLanguage}
            zIndex={3000}
            zIndexInverse={1000}
          />
          <Text> On Campus: </Text>

          <DropDownPicker
            open={open}
            value={Campus}
            items={this.state.Campuses}
            setOpen={this.setOpen}
            setValue={this.setCampus}
            zIndex={2000}
            zIndexInverse={2000}
          />

          <TouchableOpacity
            onPress={() => {
              //this.uploadRequest();
              if (
                this.state.Amount == null ||
                this.state.Campus == null ||
                this.state.Language == null ||
                this.state.Request == null
              ) {
                alert("Could not create the request make sure you inputted everything!");
              } else {
                AddEvent(
                  this.state.Request,
                  this.state.Amount,
                  this.state.Language,
                  this.state.Campus
                );
                this.setModalVisible(!modalVisible);
              }
            }}
            style={styles.SumbitBtn}
          >
            <Text style={styles.SumbitBtnText}>Sumbit</Text>
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

export default MyRequest;
