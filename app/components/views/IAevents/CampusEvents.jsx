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


LogBox.ignoreLogs(["Setting a timer"]);

export default class CampusEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsDatabase: [],
        };
    }
    componentDidMount() {
        this.CampusEvents();
    }
    componentWillUnmount() { }

    CampusEvents = async () => {
        const usersRef = firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid);
        const doc = await usersRef.get();
        var UsersCampus = doc.data().university;
        EventQuery = await firebase
            .firestore()
            .collection("Events")
            .where("Campus", "==", UsersCampus)
            .get();
            //console.log(UsersCampus)
        RequestsQuery.docs.map((doc) => {
            var address = doc.get("Address");
            var campus = doc.get("Campus");
            var description = doc.get("Description");
            var EID = doc.get("EID");
            var loc = doc.get("Location");
            var name = doc.get("Name");
            var country = doc.get("country");
            var dislikes = doc.get("dislikes");
            var language = doc.get("language");
            var likes = doc.get("likes");
            var photo = doc.get("photo");
            var type = doc.get("type");
            let Event = {
                Address: address,
                Campus: campus,
                Description: description,
                EID: EID, 
                Loc: loc,
                Name: name, 
                Country: country,
                Dislikes: dislikes,
                Language: language,
                Likes: likes, 
                Photo: photo,
                Type: type,
            };
            //console.log(Event)
            this.setState({
            eventsDatabase: [...this.state.eventsDatabase, Event]
            })
        })
    }

    render() {
        return (
            <View style={styles.body}>

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
