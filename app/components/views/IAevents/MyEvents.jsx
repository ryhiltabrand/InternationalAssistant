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
import DropDownPicker from "react-native-dropdown-picker";
import EventMatcher from "./../../shardedComponents/IAEvents/eventmatching";
import AddEvent from "./../../shardedComponents/IAEvents/AddEvents";
import DateTimePicker from "@react-native-community/datetimepicker";

LogBox.ignoreLogs(["Setting a timer"]);
DropDownPicker.setListMode("SCROLLVIEW");
export default class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsDatabase: [],
      Description: "",
      modalVisible: false,
      Campusdropdown: false,
      Languagedropdown: false,
      Countrydropdown: false,
      language: null,
      languages: [
        { label: "English", value: "English" },
        { label: "Spanish", value: "Spanish" },
        { label: "French", value: "French" },
        { label: "German", value: "German" },
        { label: "Chinese", value: "Chinese" },
      ],
      Campus: null,
      Campuses: [
        { label: "Old Dominion University", value: "Old Dominion University" },
        { label: "Norfolk State University", value: "Norfolk State University" },
        { label: "Any Campus", value: "Any" },
      ],
      US: null,
      USes: [
        {
          "label": "Alabama",
          "value": "AL"
        },
        {
          "label": "Alaska",
          "value": "AK"
        },
        {
          "label": "Arizona",
          "value": "AZ"
        },
        {
          "label": "Arkansas",
          "value": "AR"
        },
        {
          "label": "California",
          "value": "CA"
        },
        {
          "label": "Colorado",
          "value": "CO"
        },
        {
          "label": "Connecticut",
          "value": "CT"
        },
        {
          "label": "Delaware",
          "value": "DE"
        },
        {
          "label": "District Of Columbia",
          "value": "DC"
        },
        {
          "label": "Florida",
          "value": "FL"
        },
        {
          "label": "Georgia",
          "value": "GA"
        },
        {
          "label": "Guam",
          "value": "GU"
        },
        {
          "label": "Hawaii",
          "value": "HI"
        },
        {
          "label": "Idaho",
          "value": "ID"
        },
        {
          "label": "Illinois",
          "value": "IL"
        },
        {
          "label": "Indiana",
          "value": "IN"
        },
        {
          "label": "Iowa",
          "value": "IA"
        },
        {
          "label": "Kansas",
          "value": "KS"
        },
        {
          "label": "Kentucky",
          "value": "KY"
        },
        {
          "label": "Louisiana",
          "value": "LA"
        },
        {
          "label": "Maine",
          "value": "ME"
        },
        {
          "label": "Maryland",
          "value": "MD"
        },
        {
          "label": "Massachusetts",
          "value": "MA"
        },
        {
          "label": "Michigan",
          "value": "MI"
        },
        {
          "label": "Minnesota",
          "value": "MN"
        },
        {
          "label": "Mississippi",
          "value": "MS"
        },
        {
          "label": "Missouri",
          "value": "MO"
        },
        {
          "label": "Montana",
          "value": "MT"
        },
        {
          "label": "Nebraska",
          "value": "NE"
        },
        {
          "label": "Nevada",
          "value": "NV"
        },
        {
          "label": "New Hampshire",
          "value": "NH"
        },
        {
          "label": "New Jersey",
          "value": "NJ"
        },
        {
          "label": "New Mexico",
          "value": "NM"
        },
        {
          "label": "New York",
          "value": "NY"
        },
        {
          "label": "North Carolina",
          "value": "NC"
        },
        {
          "label": "North Dakota",
          "value": "ND"
        },
        {
          "label": "Ohio",
          "value": "OH"
        },
        {
          "label": "Oklahoma",
          "value": "OK"
        },
        {
          "label": "Oregon",
          "value": "OR"
        },
        {
          "label": "Pennsylvania",
          "value": "PA"
        },
        {
          "label": "Rhode Island",
          "value": "RI"
        },
        {
          "label": "South Carolina",
          "value": "SC"
        },
        {
          "label": "South Dakota",
          "value": "SD"
        },
        {
          "label": "Tennessee",
          "value": "TN"
        },
        {
          "label": "Texas",
          "value": "TX"
        },
        {
          "label": "Utah",
          "value": "UT"
        },
        {
          "label": "Vermont",
          "value": "VT"
        },
        {
          "label": "Virgin Islands",
          "value": "VI"
        },
        {
          "label": "Virginia",
          "value": "VA"
        },
        {
          "label": "Washington",
          "value": "WA"
        },
        {
          "label": "West Virginia",
          "value": "WV"
        },
        {
          "label": "Wisconsin",
          "value": "WI"
        },
        {
          "label": "Wyoming",
          "value": "WY"
        }
      ],
      Country: null,
      Countrys: [
        { label: "United States", value: "United States" },
        { label: "China", value: "China" },
        { label: "France", value: "France" },
        { label: "Germany", value: "Germany" },
        { label: "South America", value: "South America" },
      ],
      City: "",
      Street: "",
      Zip: "",
      Name: "",
      Date: new Date(),
      Day: null,
      Time: null,
      showDatePicker: false,
      showTimePicker: false,
    };
    this.setLanguage = this.setLanguage.bind(this);
    this.setCampus = this.setCampus.bind(this);
    this.setUS = this.setUS.bind(this);
    this.setCountry = this.setCountry.bind(this);
  }
  componentDidMount() {
    this.Recommend();
  }
  componentWillUnmount() { }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  setDateVisible = (visible) => {
    this.setState({ showDatePicker: visible });
  };
  setTimeVisible = (visible) => {
    this.setState({ showTimePicker: visible });
  };
  setDateClose = (visible) => {
    this.setState({ showDatePicker: visible });
  };
  setTimeClose = (visible) => {
    this.setState({ showTimePicker: visible });
  };
  clearState = () => {
    this.setState({
      eventsDatabase: [],
    });
  };
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  setCampusdropdown = (Campusdropdown) => {
    console.debug("opens dropdown");
    this.setState({
      Campusdropdown,
    });
  };
  setLanguagedropdown = (Campusdropdown) => {
    console.debug("opens dropdown");
    this.setState({
      Languagedropdown: Campusdropdown,
    });
  };
  setUSesdropdown = (Campusdropdown) => {
    console.debug("opens dropdown");
    this.setState({
      USesdropdown: Campusdropdown,
    });
  };
  setCountrydropdown = (Campusdropdown) => {
    console.debug("opens dropdown");
    this.setState({
      Countrydropdown: Campusdropdown,
    });
  };

  setDate(date) {
    this.setState({ Date: date });
  }
  setUS(callback) {
    console.debug("set Value");
    this.setState(
      (state) => (
        console.debug("the value being inputed is ", callback(state.value)),
        { US: callback(state.value) }
      )
    );
  }
  setLanguage(callback) {
    console.debug("set Value");
    this.setState(
      (state) => (
        console.debug("the value being inputed is ", callback(state.value)),
        { language: callback(state.value) }
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
  setCountry(callback) {
    console.debug("set Value");
    this.setState(
      (state) => (
        console.debug("the value being inputed is ", callback(state.value)),
        { Country: callback(state.value) }
      )
    );
  }
  uploadEvent() {
    if (
      this.state.US == null ||
      this.state.Campus == null ||
      this.state.language == null ||
      this.state.Description == null ||
      this.state.City == null ||
      this.state.Street == null ||
      this.state.Zip == null ||
      this.state.Name == null ||
      this.state.Country == null
    ) {
      alert("Could not create the request make sure you inputted everything!");
    } else {
      AddEvent(
        this.state.Description,
        this.state.language,
        this.state.Campus,
        this.state.Name,
        this.state.Country,
        this.state.Street,
        this.state.City,
        this.state.US,
        this.state.Zip,
        this.state.Date
      );
    }
  }
  MyEvents = async (EID) => {
    const userRef = firebase.firestore().collection("Events").doc(EID);
    const doc = await userRef.get();
    var address = doc.get("Address");
    var campus = doc.get("Campus");
    var description = doc.get("Description");
    var EID = doc.id;
    var loc = doc.get("Location");
    var name = doc.get("Name");
    var country = doc.get("country");
    var dislikes = doc.get("dislikes");
    var language = doc.get("language");
    var likes = doc.get("likes");
    let Event = {
      Address: address,
      Campus: campus,
      Description: description,
      EID: EID,
      loc: loc,
      Name: name,
      Country: country,
      Dislikes: dislikes,
      Language: language,
      Likes: likes,
    };
    console.log(Event)
    this.setState({
      eventsDatabase: [...this.state.eventsDatabase, Event]
    })
  }
  Recommend = async () => {
    EventMatcher().then((results) => {
      console.log(results)
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        this.MyEvents(results[i]);
      }
    });
  }

  render() {
    const { modalVisible } = this.state;
    const { Campusdropdown, Languagedropdown, language, Campus, USesdropdown, US, Countrydropdown, Country } = this.state;


    return (
      <View style={styles.body}>
        <Button title="add event" onPress={() => this.setModalVisible(true)} />
        <FlatList
          style={styles.scrollView}
          enableEmptySections={true}
          data={this.state.eventsDatabase}
          keyExtractor={(item) => {
            return item.EID;
          }}
          renderItem={({ item }) => {
            return (
                <View style={styles.box}>
                  <View style={styles.firstLine}>
                    <Text style={styles.name}>{item.Name}</Text>
                  </View>

                  <View style={styles.secondLine}>
                    <Text style={styles.event}>{item.Description}</Text>
                  </View>
                  <View style={styles.thirdLine}>
                    <Text>Language: {item.Language}</Text>
                  </View>
                  <View style={styles.forthLine}>
                    <Text>Campus: {item.Campus}</Text>
                  </View>
                  <View style={styles.fifthLine}>
                    <Text>Address: {item.Address} </Text>
                  </View>
                  <View style={styles.fifthLine}>
                  </View>
                </View>
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
          <ScrollView>
            <TouchableOpacity
              style={styles.SumbitBtn}
              onPress={() => {
                this.setModalVisible(!modalVisible);
                //this.clearState();
              }}
            >
              <Text style={styles.SumbitBtnText}>Back to Search</Text>
            </TouchableOpacity>
            <Text> When does it need to be Completed </Text>
            <Button
              title="Select Date"
              onPress={() => this.setDateVisible(true)}
            />
            <Button
              title="Select Time"
              onPress={() => this.setTimeVisible(true)}
            />
            <Text> Date: {this.state.Day} Time: {this.state.Time}</Text>
            <Text>Enter the following information to create a request</Text>
            <TextInput
              multiline
              numberOfLines={4}
              onChangeText={(val) => this.updateInputVal(val, "Description")}
              placeholder="Enter Description"
              maxLength={256}
              style={{
                padding: 10,
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 3,
              }}
            />
            <Text> Prefered Language: </Text>
            <DropDownPicker
              open={Languagedropdown}
              value={this.state.language}
              items={this.state.languages}
              setOpen={this.setLanguagedropdown}
              setValue={this.setLanguage}
              zIndex={3000}
              zIndexInverse={1000}
            />
            <Text> On Campus: </Text>
            <DropDownPicker
              open={Campusdropdown}
              value={Campus}
              items={this.state.Campuses}
              setOpen={this.setCampusdropdown}
              setValue={this.setCampus}
              zIndex={2000}
              zIndexInverse={2000}
            />
            <Text> Country: </Text>
            <DropDownPicker
              open={Countrydropdown}
              value={Country}
              items={this.state.Countrys}
              setOpen={this.setCountrydropdown}
              setValue={this.setCountry}
              zIndex={1000}
              zIndexInverse={1000}
            />
            <Text> Name: </Text>
            <TextInput
              multiline
              numberOfLines={1}
              onChangeText={(val) => this.updateInputVal(val, "Name")}
              placeholder="Name of Event"
              maxLength={20}
              style={{
                padding: 10,
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 3,
              }}
            />
            <Text> Street: </Text>
            <TextInput
              multiline
              numberOfLines={1}
              onChangeText={(val) => this.updateInputVal(val, "Street")}
              placeholder="Enter Street"
              maxLength={20}
              style={{
                padding: 10,
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 3,
              }}
            />
            <Text> City: </Text>
            <TextInput
              multiline
              numberOfLines={1}
              onChangeText={(val) => this.updateInputVal(val, "City")}
              placeholder="Enter City"
              maxLength={20}
              style={{
                padding: 10,
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 3,
              }}
            />
            <Text> State: </Text>
            <DropDownPicker
              open={USesdropdown}
              value={US}
              items={this.state.USes}
              setOpen={this.setUSesdropdown}
              setValue={this.setUS}
              zIndex={1000}
              zIndexInverse={1000}
            />
            <Text> Zip: </Text>
            <TextInput
              multiline
              numberOfLines={1}
              onChangeText={(val) => this.updateInputVal(val, "Zip")}
              placeholder="Enter Zip"
              maxLength={6}
              style={{
                padding: 10,
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 3,
              }}
            />


            {this.state.showDatePicker && (
              <DateTimePicker
                value={this.state.Date}
                mode="date"
                display="default"
                onChange={(e, d) => {
                  if (Platform.OS === "ios") {
                    this.setState({ Day: d });
                    onChange(d);
                  } else {
                    this.setDateClose(false);
                    var Month = ''
                    if (Number(d.getMonth() + 1) < 11) {
                      Month = "0" + (d.getMonth() + 1)
                    } else {
                      Month = d.getMonth() + 1
                    }
                    var Day = ''
                    if (Number(d.getDate()) < 10) {
                      Day = "0" + (d.getDate() + 1)
                    } else {
                      Day = d.getDate() + 1
                    }
                    var Year = d.getFullYear()
                    var Date = Year + "-" + Month + "-" + Day
                    this.setState({ Day: Date });
                    console.log(Date)

                  }
                }}
                style={{ backgroundColor: "white" }}
              />
            )}
            {this.state.showTimePicker && (
              <DateTimePicker
                value={this.state.Date}
                mode="time"
                display="default"
                onChange={(e, d) => {
                  if (Platform.OS === "ios") {
                    this.setState({ Time: d });
                    onChange(d);
                  } else {
                    this.setTimeClose(false);
                    var Hours = '';
                    if (Number(d.getHours() < 10)) {
                      Hours = "0" + d.getHours();
                    } else {
                      Hours = d.getHours();
                    }

                    var Mins = "";
                    if (Number(d.getMinutes() < 10)) {
                      Mins = "0" + d.getMinutes();
                    } else {
                      Mins = d.getMinutes();
                    }
                    var Time = Hours + ":" + Mins + ":00"
                    this.setState({ Time: Time });
                    console.log(Time)
                  }
                }}
                style={{ backgroundColor: "white" }}
              />
            )}

            <TouchableOpacity
              onPress={() => {
                if (
                  this.state.US == null ||
                  this.state.Campus == null ||
                  this.state.language == null ||
                  this.state.Description == null || this.state.Day == null || this.state.Time == null
                ) {
                  alert(
                    "Could not create the request make sure you inputted everything!"
                  );
                } else {
                  var dateTime = this.state.Day + "T" + this.state.Time + "Z";
                  console.log(dateTime)
                  var date = new Date(dateTime)
                  console.log(date)
                  AddEvent(
                    this.state.Description,
                    this.state.language,
                    this.state.Campus,
                    this.state.Name,
                    this.state.Country,
                    this.state.Street,
                    this.state.City,
                    this.state.US,
                    this.state.Zip,
                    this.state.Date
                  );
                  this.setModalVisible(!modalVisible);
                }
              }}
              style={styles.SumbitBtn}
            >
              <Text style={styles.SumbitBtnText}>Sumbit</Text>
            </TouchableOpacity>
          </ScrollView>
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
  event: {
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