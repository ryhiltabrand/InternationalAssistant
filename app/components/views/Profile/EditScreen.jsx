import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase";
import MultiSelect from "react-native-multiple-select";
import ProfileImagePicker from "./imageSelect";

import {UpdateBio, UpdateLanguages} from "./../../shardedComponents/Profile/updateProfile"
const languageItem = [
  { id: "Arabic", name: "Arabic"},
  { id: "Cantonese", name: "Cantonese"},
  { id: "English", name: "English" },
  { id: "French", name: "French" },
  { id: "Gujarati", name: "Gujarati"},
  { id: "Hindi", name: "Hindi" },
  { id: "Italian", name: "Italian" },
  { id: "Japanese", name: "Japanese" },
  { id: "Korean", name: "Korean"},
  { id: "Mandarin", name: "Mandarin" },
  { id: "Portuguese", name: "Portuguese"},
  { id: "Russian", name: "Russian"},
  { id: "Spanish", name: "Spanish" },
];
export default function EditProfile({ route, navigation }) {
  const [Languages, setLanguages] = useState([]);
  const [Bio, setBio] = useState(null);

  useEffect(() => {}, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#003057" }}>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <View
        style={{
          marginTop: 35,
          marginBottom: 20,
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          position: "relative",
        }}
      >
        <Text>
          <ProfileImagePicker />
        </Text>
      </View>
      <View>
        <View
          style={{
            marginTop: 5,
            marginLeft: 10,

            position: "relative",
            flexDirection: "row",
          }}
        >
          <TextInput
            style={styles.input}
            onChangeText={setBio}
            placeholder="New Bio"
            maxLength={256}
            numberOfLines={5}
            value={Bio}
            editable
            multiline={true}
          />
          <View style={{ marginTop: 60 }}>
            <TouchableOpacity
              onPress={() => {
                UpdateBio(Bio)
              }}
              style={{
                elevation: 8,
                backgroundColor: "#98C5EA",
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 13,
              }}
            >
              <Text>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            position: "relative",
            marginLeft: 15,
            flexDirection: "row",
            marginTop: 30,
          }}
        >
          <View style={{ flex: 1 }}>
            <MultiSelect
              hideTags
              items={languageItem}
              uniqueKey="id"
              fixedHeight={true}
              //ref={(component) => { multiSelect = component }}
              onSelectedItemsChange={setLanguages}
              selectedItems={Languages}
              selectText="Change Your Languages"
              searchInputPlaceholderText="Search Languages..."
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="blue"
              selectedItemIconColor="blue"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: "black" }}
              styleMainWrapper={{ marginRight: 90 }}
              hideSubmitButton={true}
            />
          </View>

          <View style={{ marginTop: 0, marginLeft: -75, marginRight: 25 }}>
            <TouchableOpacity
              onPress={() => {
                UpdateLanguages(Languages)
              }}
              style={{
                elevation: 8,
                backgroundColor: "#98C5EA",
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 13,
              }}
            >
              <Text>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 150,
    width: 270,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginLeft: 5,
    marginTop: 10,
    color: "#0A192D",
    textAlignVertical: "top",
    backgroundColor: "#828A8f",
    fontSize: 16,
  },
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: 'center',
  },
  bkimage: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
  },
  signupView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  signupText: {
    color: "white",
    fontSize: 15,
    padding: 20,
  },
  inputView: {
    flex: 1,
    backgroundColor: "#465881",
    height: 30,
    width: "80%",
    margin: 10,
    justifyContent: "center",
  },
  inputText: {
    height: 50,
    color: "white",
  },
  birthdayView: {
    flex: 1,
    backgroundColor: "#465881",
    height: 30,
    width: "80%",
    margin: 10,
    justifyContent: "center",
    borderRadius: 25,
  },
  birthDayText: {
    height: 50,
    color: "white",
    marginTop: 30,
    textAlign: "center",
  },
  signupBtn: {
    flex: 1,
    width: "80%",
    backgroundColor: "rgba(182, 32, 32, 0.7)",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  signupBtnText: {
    color: "white",
    fontSize: 15,
  },
  policy: {
    color: "white",
    fontSize: 15,
  },
  loginBtn: {
    width: "100%",
    //janky way to apply height
    height: "100%",
    backgroundColor: "rgba(94, 8, 203, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
    marginTop: 25,
    marginBottom: "100%",
    //paddingTop: 20
    flex: 1,
  },
  loginText: {
    justifyContent: "center",
    alignItems: "center",
    //bottom: 0,
    color: "black",
    fontSize: 20,
  },
  //Dropdown Styles
  drownDownSection: {
    flexDirection: "column",
    width: "80%",
    padding: 10,
  },
  singleSelect: {
    margin: 5,
    height: 40,
  },
  singleSelectDropdown: {
    position: "absolute",
    margin: 5,
  },
  multiSelect: {
    marginLeft: 0,
  },
});
