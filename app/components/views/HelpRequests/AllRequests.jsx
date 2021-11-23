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
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import firebase from "firebase";


LogBox.ignoreLogs(["Setting a timer"]);

class AllRequest extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
      };
    }
    componentDidMount() {
      
    }
    componentWillUnmount() {}
  
    clearState = () => {
      this.setState({
        data: [],
      });
    };
  
    
    render() {
      return (
        <View style={styles.body}>
          <Text>Hello2</Text>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    body: {
      
    }
  });
  
  export default AllRequest;
  