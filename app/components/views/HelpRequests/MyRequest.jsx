import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  LogBox,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import firebase from "firebase";
import AddEvent from "./../../shardedComponents/Help/addEvent"

LogBox.ignoreLogs(["Setting a timer"]);

class MyRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      data: [
        {
          pic: "https://res.cloudinary.com/teepublic/image/private/s--rh264MCI--/t_Preview/b_rgb:484849,c_limit,f_jpg,h_630,q_90,w_630/v1517893785/production/designs/2341977_3.jpg",
          name: "Nishil",
          time: "1h ago",
          request:
            "I need help with your mom. fkjnhsdlfja sdfdsf asdl;kfj dsfj asdlfj ;lasdkf",
          comments: 1,
          requesters: 2,
        },
        {
          pic: "https://res.cloudinary.com/teepublic/image/private/s--rh264MCI--/t_Preview/b_rgb:484849,c_limit,f_jpg,h_630,q_90,w_630/v1517893785/production/designs/2341977_3.jpg",
          name: "Ryan Hiltabrand",
          time: "1h ago",
          request:
            "I need help with your mom. fkjnhsdlfja sdfdsf asdl;kfj dsfj asdlfj ;lasdkf",
          comments: 1,
          requesters: 2,
        },
        {
          pic: "https://res.cloudinary.com/teepublic/image/private/s--rh264MCI--/t_Preview/b_rgb:484849,c_limit,f_jpg,h_630,q_90,w_630/v1517893785/production/designs/2341977_3.jpg",
          name: "Alex",
          time: "1h ago",
          request:
            "I need help with your mom. fkjnhsdlfja sdfdsf asdl;kfj dsfj asdlfj ;lasdkf",
          comments: 1,
          requesters: 2,
        },
        {
          pic: "https://res.cloudinary.com/teepublic/image/private/s--rh264MCI--/t_Preview/b_rgb:484849,c_limit,f_jpg,h_630,q_90,w_630/v1517893785/production/designs/2341977_3.jpg",
          name: "Lee",
          time: "1h ago",
          request:
            "I need help with your mom. fkjnhsdlfja sdfdsf asdl;kfj dsfj asdlfj ;lasdkf",
          comments: 1,
          requesters: 2,
        },
      ],
    };
  }
  componentDidMount() {}
  componentWillUnmount() {}
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  clearState = () => {
    this.setState({
      data: [],
    });
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.body}>
        <TouchableOpacity onPress={()=>{
          //AddEvent();
          this.setModalVisible(true);
        }}>
          <Text style={{textAlign:"center"}}>Add</Text>
        </TouchableOpacity>
        <FlatList
          style={styles.scrollView}
          enableEmptySections={true}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.name;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <View style={styles.box}>
                  <View style={styles.firstLine}>
                    <Image style={styles.image} source={{ uri: item.pic }} />

                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                  </View>

                  <View style={styles.secondLine}>
                    <Text numberOfLines={5} style={styles.request}>
                      {item.request}
                    </Text>
                  </View>
                  <View numberOfLines={5}>
                    <Text>{item.comments}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        console.log("hi");
                      }}
                    >
                      <Text style={styles.remove}>
                        Remove
                      </Text>
                    </TouchableOpacity>
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
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              this.setModalVisible(!modalVisible);
              //this.clearState();
            }}
          >
            <Text>Back to Search</Text>
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
  ThirdLine: {
    flex: 3,
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
});

export default MyRequest;
