import * as React from "react";
import { Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchBar } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";

export default class FriendsSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      country: ""
    };
  }

  updateSearch = (search) => {
    this.setState({ search: search });
  };
  updatecountry = (count) => {
    this.setState({ country: count });
  };

  render() {
    const countries = ["Egypt", "Canada", "Australia", "Ireland"];
    const { search } = this.state;
    return (
      <View>
        <SearchBar
          placeholder="Search by Name..."
          onChangeText={this.updateSearch}
          showLoading={true}
          value={search}
        />

        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            this.updatecountry(selectedItem)
            console.log(selectedItem, index);
          }}
        />

        <Text>{this.state.search}</Text>
        <Text>{this.state.country}</Text>
      </View>
    );
  }
}
