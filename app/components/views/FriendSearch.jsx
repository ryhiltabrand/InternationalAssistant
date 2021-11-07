import * as React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
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
    };
  }
  componentDidMount() {
    this.clearState();
  }
  componentWillUnmount() {}
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
      if (state[property] != null) {
        console.log(property, state[property]);
        criteria[property] = state[property];
      }
    }
    console.log(criteria);

    if (Object.keys(criteria).length == 5) {
      console.log(Object.keys(criteria));
      Friendquery = Friendquery.where(
        Object.keys(criteria)[0], "==", Object.values(criteria)[0]
      ).where(
        Object.keys(criteria)[1], "==", Object.values(criteria)[1]
      ).where(
        Object.keys(criteria)[2], "==", Object.values(criteria)[2]
      ).where(
        Object.keys(criteria)[3], "==", Object.values(criteria)[3]
      ).where(
        Object.keys(criteria)[4], "==", Object.values(criteria)[4]
      )
    } else if (Object.keys(criteria).length == 4) {
      console.log(Object.keys(criteria));
      Friendquery = Friendquery.where(
        Object.keys(criteria)[0], "==", Object.values(criteria)[0]
      ).where(
        Object.keys(criteria)[1], "==", Object.values(criteria)[1]
      ).where(
        Object.keys(criteria)[2], "==", Object.values(criteria)[2]
      ).where(
        Object.keys(criteria)[3], "==", Object.values(criteria)[3]
      )
    } else if (Object.keys(criteria).length == 3) {
      console.log(Object.keys(criteria));
      Friendquery = Friendquery.where(
        Object.keys(criteria)[0], "==", Object.values(criteria)[0]
      ).where(
        Object.keys(criteria)[1], "==", Object.values(criteria)[1]
      ).where(
        Object.keys(criteria)[2], "==", Object.values(criteria)[2]
      )
    } else if (Object.keys(criteria).length == 2) {
      console.log(Object.keys(criteria));
      Friendquery = Friendquery.where(
        Object.keys(criteria)[0], "==", Object.values(criteria)[0]
      ).where(
        Object.keys(criteria)[1], "==", Object.values(criteria)[1]
      )
    } else if (Object.keys(criteria).length == 1) {
      console.log(Object.keys(criteria));
      Friendquery = Friendquery.where(
        Object.keys(criteria)[0], "==", Object.values(criteria)[0]
      )
    } else {
      console.log("invalid Search");
    }
    Friendquery = Friendquery.get().then(snap => {
      console.log(snap.size)
        snap.forEach(doc => {
          console.log(doc.id)
        })
    }
      
    )
    /*Friendquery = firebase
      .firestore()
      .collection("users")
      .where("country", "==", this.state.country)
      .get()
      .then(snap => {
        console.log(snap.size)
        snap.forEach(doc => {
          console.log(doc.id)
        })
      })*/
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

        <TouchableOpacity
          style={{ marginLeft: 150, marginTop: 25 }}
          onPress={() => {
            props.navigation.navigate();
          }}
        >
          <Text>Auto Matching</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
/*if (
              this.state.name == null &&
              this.state.country == null &&
              this.state.language == null &&
              this.state.type == null &&
              this.state.campus == null
            ) {
              <Text>No Search was made</Text>;
              console.log("No Search");
            } else if (
              this.state.name != null &&
              this.state.country == null &&
              this.state.language == null &&
              this.state.type == null &&
              this.state.campus == null
            ) {
              <Text>d</Text>;
              console.log(this.state.name);
            } else if (
              this.state.name == null &&
              this.state.country != null &&
              this.state.language == null &&
              this.state.type == null &&
              this.state.campus == null
            ) {
              <Text>d</Text>;
              this.Loc()
            } else if (
              this.state.name == null &&
              this.state.country == null &&
              this.state.language != null &&
              this.state.type == null &&
              this.state.campus == null
            ) {
              <Text>d</Text>;
              console.log(this.state.language);
            } else if (
              this.state.name != null &&
              this.state.country == null &&
              this.state.language == null &&
              this.state.type != null &&
              this.state.campus == null
            ) {
              <Text>d</Text>;
              console.log(this.state.type);
            } else if (
              this.state.name != null &&
              this.state.country == null &&
              this.state.language == null &&
              this.state.type == null &&
              this.state.campus != null
            ) {
              <Text>d</Text>;
              console.log(this.state.campus);
            } else if (
              this.state.name != null &&
              this.state.country != null &&
              this.state.language != null &&
              this.state.type != null &&
              this.state.campus != null
            ) {
              <Text>d</Text>;
              console.log(
                this.state.name,
                this.state.country,
                this.state.language,
                this.state.type,
                this.state.campus
              );
            }*/
