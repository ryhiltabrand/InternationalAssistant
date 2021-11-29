import { Modal, Text, View, Pressable,TextInput, Button, StyleSheet, Image } from "react-native";
import React, {TouchableOpacity, useState} from "react";

export default function OthersRequests({ route, navigation }) {
  /* 2. Get the param */
  const {
    Name,
    Pic,
    AmountOfHelpers,
    Applicants,
    Campus,
    Comments,
    Date,
    Description,
    Helpers,
    Language,
  } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.body}>
      <View style>
        <Button
          title="Back to all requests"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.box}>
        <View style={styles.firstLine}>
          <Image style={styles.image} source={{ uri: Pic }} />
          <Text style={styles.name}>{Name}</Text>
          <Text style={styles.time}>{Date.getMonth()+"-"+Date.getDate()+" @ "+Date.getHours()+":"+Date.getMinutes()}</Text>
        </View>

        <View style={styles.secondLine}>
          <Text style={styles.request}>{Description}</Text>
        </View>
        <View style={styles.thirdLine}>
          <Text>Prefered Language: {Language}</Text>
        </View>
        <View style={styles.forthLine}>
          <Text>Campus: {Campus}</Text>
        </View>
        <View style={styles.fifthLine}>
          <Text>Requested Helpers: {AmountOfHelpers}</Text>
          <Text style={{ paddingLeft: 5 }}>
            Applicants: {Applicants.length}
          </Text>
        </View>
        <View style={styles.fifthLine}>
          <Text>Comments: {Object.keys(Comments).length}</Text>
        </View>
      </View>
      <View style >
        <Button
          title="Apply"
          onPress={}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flexDirection: "column",
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

  box: {
    padding: 8,
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
    //marginTop: 3,
    //marginRight: 0,
    //marginLeft: 0,
    //marginBottom: 0,
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
