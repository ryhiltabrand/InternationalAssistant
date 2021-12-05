import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase";
import UpdatePP from './uploadpicture'

export default function ImagePickerExample() {
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
    console.log(name, result.uri)
    if (!result.cancelled) {
      setImage(result.uri);
      const response = await fetch(result.uri);
      const blob = await response.blob();
      var ref = firebase.storage().ref().child(name);
      ref.put(blob)
      .then(snapshot =>{
        return snapshot.ref.getDownloadURL()
      }).then(downloadURL => {
        console.log(downloadURL);
        UpdatePP(downloadURL)
        return downloadURL;
      })
      .catch(error => {
        console.log(error)
      });

      /*let imageRef = await firebase.storage()
      .ref("/" + name)
      .getDownloadURL()
      console.log(imageRef)*/
      /*imageRef
        
        .then((url) => {
          //from url you can fetched the uploaded image easily
          setURI(url)
          console.log(url)
        })
        .catch((e) => console.log("getting downloadURL of image error => ", e));*/

      /*.storage()
      .ref()
      .putFile(result.uri)
      .then((snapshot) => {
        //You can check the image is now uploaded in the storage bucket
        console.log(`${imageName} has been successfully uploaded.`);
      })
      .catch((e) => console.log("uploading image error => ", e));*/
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TouchableOpacity onPress={pickImage}>
        <Entypo name="edit" size={24} color="white" />
      </TouchableOpacity>

      {/*image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />*/}
    </View>
  );
}
