import * as React from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchBar } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import { color } from "react-native-reanimated";
import firebase from "firebase";

export default class FriendsSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      country: null,
      type: null,
      language: null,
      campus: null,
      modalVisible: false,
      data:["j"]
    };
  }
  componentDidMount() {
    this.clearState();
  }
  componentWillUnmount() {}

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  clearState = () => {
    this.setState({
      name: null,
      country: null,
      type: null,
      language: null,
      campus: null,
    });
  };
  Loc = async () => {
    var Friendquery = firebase.firestore().collection("users");
    const state = this.state;
    var criteria = {};
    for (const property in state) {
      if (state[property] != null && state[property] != true && state[property] != false && state[property] != "data" ) {
        console.log(property, state[property]);
        criteria[property] = state[property];
      }
    }
    //console.log(criteria);

    if (Object.keys(criteria).length == 5) {
      //console.log(Object.keys(criteria));
      Friendquery = Friendquery.where(
        Object.keys(criteria)[0],
        "==",
        Object.values(criteria)[0]
      )
        .where(Object.keys(criteria)[1], "==", Object.values(criteria)[1])
        .where(Object.keys(criteria)[2], "==", Object.values(criteria)[2])
        .where(Object.keys(criteria)[3], "==", Object.values(criteria)[3])
        .where(Object.keys(criteria)[4], "==", Object.values(criteria)[4]);
    } else if (Object.keys(criteria).length == 4) {
      console.log(Object.keys(criteria));
      Friendquery = Friendquery.where(
        Object.keys(criteria)[0],
        "==",
        Object.values(criteria)[0]
      )
        .where(Object.keys(criteria)[1], "==", Object.values(criteria)[1])
        .where(Object.keys(criteria)[2], "==", Object.values(criteria)[2])
        .where(Object.keys(criteria)[3], "==", Object.values(criteria)[3]);
    } else if (Object.keys(criteria).length == 3) {
      console.log(Object.keys(criteria));
      Friendquery = Friendquery.where(
        Object.keys(criteria)[0],
        "==",
        Object.values(criteria)[0]
      )
        .where(Object.keys(criteria)[1], "==", Object.values(criteria)[1])
        .where(Object.keys(criteria)[2], "==", Object.values(criteria)[2]);
    } else if (Object.keys(criteria).length == 2) {
      console.log(Object.keys(criteria));
      Friendquery = Friendquery.where(
        Object.keys(criteria)[0],
        "==",
        Object.values(criteria)[0]
      ).where(Object.keys(criteria)[1], "==", Object.values(criteria)[1]);
    } else if (Object.keys(criteria).length == 1) {
      console.log(Object.keys(criteria));
      Friendquery = Friendquery.where(
        Object.keys(criteria)[0],
        "==",
        Object.values(criteria)[0]
      );
    } else {
      console.log("invalid Search");
      
    }
    //console.log(criteria.length)
    if(Object.keys(criteria).length >= 1){
      Friendquery = Friendquery.get().then((snap) => {
      console.log(snap.size);
      snap.forEach((doc) => {
        //console.log(doc.id);
      });
    });
    }
    
  };

  updatename = (name) => {
    this.setState({ name: name });
  };
  updatecountry = (count) => {
    if (count == "Any") {
      this.setState({ country: null });
    } else {
      this.setState({ country: count });
    }
  };
  updatetype = (type) => {
    if (type == "Any") {
      this.setState({ type: null });
    } else {
      this.setState({ type: type });
    }
  };
  updatelanguage = (language) => {
    if (language == "Any") {
      this.setState({ language: null });
    } else {
      this.setState({ language: language });
    }
  };
  updatecampus = (campus) => {
    if (campus == "Any") {
      this.setState({ campus: null });
    } else {
      this.setState({ campus: campus });
    }
  };

  render() {
    const { modalVisible } = this.state;

    const countries = [
      "Any",
      "Brazil",
      "canada",
      "China",
      "Finland",
      "France",
      "India",
      "Japan",
      "Mexico",
      "Saudi Arabia",
      "South Korea",
      "Spain",
    ];
    const StudentType = ["Any", "International", "Native"];
    const Languages = [
      "Any",
      "Arabic",
      "Chinese",
      "English",
      "French",
      "Finish",
      "Hindi",
      "Japanese",
      "Korean",
      "Portuguese",
      "Spanish",
    ];
    const Campus = ["Any", "On", "Off"];
    const { name } = this.state;
    return (
      <View>
        
        <SearchBar
          placeholder="Search by Name..."
          onChangeText={this.updatename}
          showLoading={true}
          value={name}
        />
        <View>
          <Text> Region: </Text>
          <SelectDropdown
            dropdownStyle={{ color: "blue" }}
            data={countries}
            onSelect={(selectedItem) => {
              this.updatecountry(selectedItem);
            }}
          />
        </View>
        <View>
          <Text> Student Type: </Text>
          <SelectDropdown
            dropdownStyle={{ color: "blue" }}
            data={StudentType}
            onSelect={(selectedItem) => {
              this.updatetype(selectedItem);
            }}
          />
        </View>
        <View>
          <Text> Language: </Text>
          <SelectDropdown
            dropdownStyle={{ color: "blue" }}
            data={Languages}
            onSelect={(selectedItem) => {
              this.updatelanguage(selectedItem);
            }}
          />
        </View>
        <View>
          <Text> On Campus: </Text>
          <SelectDropdown
            dropdownStyle={{ color: "blue" }}
            data={Campus}
            onSelect={(selectedItem) => {
              this.updatecampus(selectedItem);
            }}
          />
        </View>
        <TouchableOpacity
          style={{ marginLeft: 150, marginTop: 25 }}
          onPress={() => {
            this.clearState();
          }}
        >
          <Text>Clear Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 150, marginTop: 25 }}
          onPress={() => {
            this.Loc();
          }}
        >
          <Text>Search</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
