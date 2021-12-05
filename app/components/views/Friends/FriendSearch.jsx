import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Image,
  Button,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchBar } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import { color, cos } from "react-native-reanimated";
import firebase from "firebase";
import updatefriends from "../../shardedComponents/Friends/Addfriends";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";

export default class FriendsSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      //country: null,
      //type: null,
      //language: null,
      //campus: null,
      modalVisible: false,
      data: [],

      openRegionDropdown: false,
      country: null,
      Regions: [
        { label: "Brazil", value: "Brazil" },
        { label: "Canada", value: "Canada" },
        { label: "China", value: "China" },
        { label: "Finland", value: "Finland" },
        { label: "France", value: "France" },
        { label: "India", value: "India" },
        { label: "Japan", value: "Japan" },
        { label: "Mexico", value: "Mexico" },
        { label: "Saudi Arabia", value: "Saudi Arabia" },
        { label: "South Korea", value: "South Korea" },
        { label: "Spain", value: "Spain" },
        { label: "Any", value: null },
      ],

      openTypeDropdown: false,
      native: null,
      Type: [
        { label: "International", value: "International" },
        { label: "Native", value: "Native" },
        { label: "Any", value: null },
      ],

      openLanguagesDropdown: false,
      valueLanguages: null,
      Languages: [
        { label: "Arabic", value: "Arabic" },
        { label: "Chinese", value: "Chinese" },
        { label: "English", value: "English" },
        { label: "French", value: "French" },
        { label: "Finish", value: "Finish" },
        { label: "Hindi", value: "Hindi" },
        { label: "Japanese", value: "Japanese" },
        { label: "Korean", value: "Korean" },
        { label: "Portuguese", value: "Portuguese" },
        { label: "Spanish", value: "Spanish" },
        { label: "Any", value: null },
      ],

      openCampusDropdown: false,
      school: null,
      Campuses: [
        { label: "ODU", value: "Old Dominion University" },
        { label: "Any", value: null },
      ],
    };
    this.setRegion = this.setRegion.bind(this);
    this.setType = this.setType.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.setCampus = this.setCampus.bind(this);
  }
  componentDidMount() {
    this.clearState();
  }
  componentWillUnmount() {}

  setOpenRegion = (open) => {
    console.debug("opens dropdown");
    this.setState({
      openRegionDropdown: open,
    });
  };

  setRegion(callback) {
    console.debug("set Value");
    this.setState(
      (state) => (
        console.debug("the value being inputed is ", callback(state.value)),
        { country: callback(state.value) }
      )
    );
  }

  setOpenType = (open) => {
    console.debug("opens dropdown");
    this.setState({
      openTypeDropdown: open,
    });
  };

  setType(callback) {
    console.debug("set Value");
    this.setState(
      (state) => (
        console.debug("the value being inputed is ", callback(state.value)),
        { native: callback(state.value) }
      )
    );
  }

  setOpenLanguage = (open) => {
    console.debug("opens dropdown");
    this.setState({
      openLanguagesDropdown: open,
    });
  };

  setLanguage(callback) {
    console.debug("set Value");
    this.setState(
      (state) => (
        console.debug("the value being inputed is ", callback(state.value)),
        { valueLanguages: callback(state.value) }
      )
    );
  }
  setOpenCampus = (open) => {
    console.debug("opens dropdown");
    this.setState({
      openCampusDropdown: open,
    });
  };

  setCampus(callback) {
    console.debug("set Value");
    this.setState(
      (state) => (
        console.debug("the value being inputed is ", callback(state.value)),
        { school: callback(state.value) }
      )
    );
  }

  /*setItems(callback) {
    this.setState(state => ({
      items: callback(state.items)
    }));
  }*/

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  clearState = () => {
    this.setState({
      name: null,
      data: [],
      school: null,
      valueLanguages: null,
      country: null,
      native: null,
    });
  };
  data = async (Uid) => {
    const userRef = firebase.firestore().collection("users").doc(Uid);
    const doc = await userRef.get();
    var name = doc.data().name;
    var profpic = doc.data().profilepicture;
    var FriendsList = doc.data().FriendsList;
    //console.log(Uid, name, profpic, friend);
    let friend = { uid: Uid, name: name, pic: profpic, Friends: FriendsList };
    this.setState({
      data: [...this.state.data, friend],
    });
  };

  Loc = async () => {
    var Friendquery = firebase.firestore().collection("users");
    const state = this.state;
    var criteria = {};
    for (const property in state) {
      //console.log(state[property])
      if (
        state[property] != null &&
        state[property] != true &&
        state[property] &&
        Array.isArray(state[property]) != true
      ) {
        //console.log(property, state[property]);
        criteria[property] = state[property];
      }
    }
    console.log(criteria);
    if (Object.keys(criteria).length > 0) {
      for (let i = 0; i < Object.keys(criteria).length; i++) {
        if (Object.keys(criteria)[i] == "valueLanguages") {
          Friendquery = Friendquery.where(
            "language",
            "array-contains",
            Object.values(criteria)[i]
          );
        } else if (Object.keys(criteria)[i] == "school") {
          Friendquery = Friendquery.where(
            "school",
            "==",
            Object.values(criteria)[i]
          );
        } else if (Object.keys(criteria)[i] == "country") {
          Friendquery = Friendquery.where(
            "country",
            "==",
            Object.values(criteria)[i]
          );
        } else if (Object.keys(criteria)[i] == "native") {
          Friendquery = Friendquery.where(
            "native",
            "==",
            Object.values(criteria)[i]
          );
        } else if (Object.keys(criteria)[i] == "name") {
          Friendquery = Friendquery.where(
            "name",
            "==",
            Object.values(criteria)[i]
          );
        }
      }
      //console.log("query",Friendquery);
    } else {
      //console.log("invalid Search");
      alert("none");
    }

    if (Object.keys(criteria).length >= 1) {
      Friendquery = Friendquery.get().then((snap) => {
        //console.log(snap.size);
        snap.forEach((doc) => {
          //console.log(doc.id);
          this.data(doc.id);
        });
      });
    }
  };

  updatename = (name) => {
    this.setState({ name: name });
  };

  render() {
    const { modalVisible } = this.state;
    const {
      openCampusDropdown,
      school,
      openRegionDropdown,
      country,
      openTypeDropdown,
      native,
      openLanguagesDropdown,
      valueLanguages,
    } = this.state;
    DropDownPicker.setTheme("DARK");
    const { name } = this.state;
    return (
      <View style={{ flexDirection: "column", flex: 1, backgroundColor: "#003057"}}>
        <View style={{ flex: 5 }}>
          <SearchBar
            placeholder="Search by Name..."
            onChangeText={this.updatename}
            showLoading={true}
            value={name}
          />
          <View>
            <Text> Region: </Text>
            <DropDownPicker
              open={openRegionDropdown}
              value={country}
              items={this.state.Regions}
              setOpen={this.setOpenRegion}
              setValue={this.setRegion}
              zIndex={5000}
              zIndexInverse={4000}
              /*onChangeValue={(selectedItem) => {
              this.updatecampus(selectedItem);
            }}*/
            />
          </View>
          <View>
            <Text> Language: </Text>
            <DropDownPicker
              open={openLanguagesDropdown}
              value={valueLanguages}
              items={this.state.Languages}
              setOpen={this.setOpenLanguage}
              setValue={this.setLanguage}
              zIndex={4000}
              zIndexInverse={3000}
              /*onChangeValue={(selectedItem) => {
              this.updatecampus(selectedItem);
            }}*/
            />
          </View>
          <View>
            <Text> Student Type: </Text>
            <DropDownPicker
              open={openTypeDropdown}
              value={native}
              items={this.state.Type}
              setOpen={this.setOpenType}
              setValue={this.setType}
              zIndex={3000}
              zIndexInverse={2000}
              /*onChangeValue={(selectedItem) => {
              this.updatecampus(selectedItem);
            }}*/
            />
          </View>

          <View>
            <Text> Campus: </Text>
            <DropDownPicker
              open={openCampusDropdown}
              value={school}
              items={this.state.Campuses}
              setOpen={this.setOpenCampus}
              setValue={this.setCampus}
              zIndex={2000}
              zIndexInverse={1000}

              /*onChangeValue={(selectedItem) => {
              this.updatecampus(selectedItem);
            }}*/
            />
          </View>
          <View
            style={{
              padding: 5,
              marginTop: 90,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View style={{ marginRight: 2 }}>
              <Button color="#98C5EA" title="Clear" onPress={() => this.clearState()} />
            </View>
            <View style={{ marginLeft: 2 }}>
              <Button
                color="#98C5EA"
                title="Search"
                onPress={() =>
                  this.Loc().then(() => this.setModalVisible(true))
                }
              />
            </View>
          </View>
        </View>
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
              this.setModalVisible(!modalVisible);
              this.clearState();
            }}
          >
            <Text>Back to Search</Text>
            
          </TouchableOpacity>
          <FlatList
            style={styles.container}
            enableEmptySections={true}
            data={this.state.data}
            keyExtractor={(item) => {
              return item.uid;
            }}
            renderItem={({ item }) => {
              const UID = firebase.auth().currentUser.uid;
              return (
                <>
                
                  
                    <TouchableOpacity onPress={() => {
                      this.props.navigation.navigate("Profile", {
                        UID: item.uid
                      });
                    }}>
                      <View style={styles.boxA}>
                        <View style={{ flexDirection: "row" }}>
                          <Image
                            style={styles.image}
                            source={{ uri: item.pic }}
                          />
                          <Text style={styles.name}>{item.name}</Text>
                        </View>
                        <View
                    style={{
                      paddingLeft: 280,
                      paddingTop: 13,
                      position: "absolute",
                    }}
                  >
                        <TouchableOpacity
                          onPress={() => {
                            updatefriends(item.uid);
                          }}
                          style={{
                            alignItems: "flex-end",
                            justifyContent: "center",
                            paddingVertical: 13,
                            //paddingHorizontal: 32,
                            borderRadius: 4,
                            elevation: 3,
                            backgroundColor: "teal",
                          }}
                        >
                      <Text style={{fontSize: 18, paddingLeft: 6, paddingRight: 6}}>Add</Text>
                        </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  
                </>
              );
            }}
          />
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#008B8B",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
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
    textAlignVertical: "center",
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
  boxA: {
    padding: 8,
    marginTop: 5,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 3,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: "#ADD8E6",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
    width: 380,
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
    color: "black",
    fontSize: 22,
    alignSelf: "center",
    marginLeft: 10,
    textAlign: "center",
  },
  firstLine: {
    marginTop: 1,

    flexDirection: "row",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 3,
  },
  secondLine: {
    margin: 1,
  },
  thirdLine: {
    flexDirection: "row",
  },
  forthLine: {
    flexDirection: "row",
  },
  fifthLine: {
    flexDirection: "row",
  },
});
