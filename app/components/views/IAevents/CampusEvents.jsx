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


LogBox.ignoreLogs(["Setting a timer"]);

export default class CampusEvents extends React.Component {
    constructor(props) {
        super(props);
        this._unsubscribe;
        this.state = {
            eventsDatabase: [],
        };
    }
    componentDidMount() {
        this.clearState();
        this._unsubscribe = this.props.navigation.addListener("focus", () => {
            this.clearState();
            this.CampusEvents();
          });
        //this.CampusEvents();
    }
    componentWillUnmount() {this._unsubscribe; }

    clearState = () => {
        this.setState({
            eventsDatabase: [],
        });
      };

    CampusEvents = async () => {
        const usersRef = firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid);
        const doc = await usersRef.get();
        var UsersCampus = doc.data().university;
        const EventsQuery = await firebase
            .firestore()
            .collection("Events")
            .where("Campus", "==", UsersCampus)
            .get();
        //console.log(UsersCampus)
        EventsQuery.docs.map((doc) => {
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
                Loc: loc,
                Name: name,
                Country: country,
                Dislikes: dislikes,
                Language: language,
                Likes: likes,
            };
            //console.log(Event)
            this.setState({
                eventsDatabase: [...this.state.eventsDatabase, Event]
            })
        })
    }

    render() {
        return (
            <View style={{
                backgroundColor: "#003057",
                flex: 1
              }}>
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
