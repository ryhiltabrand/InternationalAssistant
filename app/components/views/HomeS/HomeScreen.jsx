import * as React from "react";
import { 
  Text, 
  View, 
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigationState } from "@react-navigation/core";
import filtercat from "../../shardedComponents/mapfilter";

//console.log(useNavigationState)

const HomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor:"#003057" }}>
      <View style={styles.locationCard}>
      <TouchableOpacity style={styles.Friendbox}
      onPress={() => navigation.navigate("Friends")}>
        <Image style={styles.image} source={{uri:'https://kb.spinbackup.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'}}/>
        <Text style={styles.name}>John Accepted your Friend Request</Text>
      </TouchableOpacity>
      <View>
      <TouchableOpacity style={styles.Eventbox}
      onPress={() => navigation.navigate("Events")}>
        <Text style={styles.Eventname}>NEW RECCOMENDED EVENT: {"\n"}
        ODU CHINESE YEAR
         </Text>
      </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.Qbox}
        onPress={() => navigation.navigate("Q&A")}>
          <Text style={styles.name}>Your question on "How is the local area" has a Reply.</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.FriendRequestbox}
        onPress={() => navigation.navigate("Friends")}>
        <Image style={styles.image} source={{uri:'https://kb.spinbackup.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'}}/>
          <Text style={styles.name}> Jane sent you a Friend Request</Text>
        </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity style={styles.Locationbox}
      onPress={() => navigation.navigate("Locations")}>
        <Text style={styles.Locationname}>
          NEW RESTURANT ADDED: {"\n"}
          Guangdong Taste
        </Text>
      </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity style={styles.Requestbox}
      onPress={() => navigation.navigate("Help")}>
        <Text style={styles.name}>
          Someone has accepted your help for "I need a ride to Walmart!"
        </Text>
      </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity style={styles.Messagebox}
      onPress={() => navigation.navigate("Messager")}>
        <Text style={styles.name}>
          Ryan has sent you a message saying "Hey how is you day going?"
        </Text>
      </TouchableOpacity>
      </View>
      </View>
      
    </View>
    

    
  );
};

const HStack = createNativeStackNavigator();
const HomeStackScreen = ({ navigation }) => (
  <HStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#202898",
      },
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        title: "Home",
        headerTitleAlign: "center",
        headerTitleStyle: {color:"white"},
        headerLeft: () => (
          <FontAwesome5.Button
            name="bars"
            size={25}
            color="white"
            backgroundColor="#202898"
            onPress={() => navigation.openDrawer()}
          ></FontAwesome5.Button>
        ),
      }}
    />
  </HStack.Navigator>
);
export default HomeStackScreen;

const styles = StyleSheet.create({
  locationCard: {
    flex: 1,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    height: 70,
  },
  image: {
    width: 60,
    height: 60,
  },
  name: {
    color: "black",
    fontSize: 17,
    alignSelf: "center",
    marginLeft: 10,
    textAlign: "center",
    fontWeight:"bold",
  },
  Eventname: {
    color: "black",
    fontSize: 22,
    alignSelf: "center",
    marginLeft: 18,
    textAlign: "center",
    fontWeight:"bold",
  },
  Friendbox: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#00FF00",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  Eventbox: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#cfe2f3ff",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  Qbox: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#ff9900ff",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  FriendRequestbox: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#ffff00ff",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  Locationbox: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#ead1dcff",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  Locationname: {
    color: "black",
    fontSize: 17,
    alignSelf: "center",
    marginLeft: 65,
    textAlign: "center",
    fontWeight:"bold",
  },
  Requestbox: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#d0e0e3ff",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  Messagebox: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#e06666ff",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
})