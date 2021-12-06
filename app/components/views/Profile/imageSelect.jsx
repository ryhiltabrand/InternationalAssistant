import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase";
import UpdatePP from "./uploadpicture";

export default function ProfileImagePicker() {
  const [image, setImage] = useState(null);
  const { uri, setURI } = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
      //exif: true,
    });

    //console.log(result);
    const segments = result.uri.split("/");
    const name = segments.pop() || segments.pop(); // Handle potential trailing slash
    console.log(name, result.uri);
    if (!result.cancelled) {
      setImage(result.uri);
      const response = await fetch(result.uri);
      const blob = await response.blob();
      var ref = firebase.storage().ref().child(name);
      ref
        .put(blob)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL();
        })
        .then((downloadURL) => {
          console.log(downloadURL);
          UpdatePP(downloadURL);
          return downloadURL;
        })
        .catch((error) => {
          console.log(error);
        });

    }
  };

  return (
    <View style={{  }}>
      
      <TouchableOpacity
        onPress={pickImage}
        style={{
          elevation: 8,
          backgroundColor: "#98C5EA",
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 12
        }}
      >
        <Text>Change your Profile Picture</Text>
        
      </TouchableOpacity>

      {/*image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />*/}
    </View>
  );
}
