import { Text, View, TextInput, Button } from "react-native";
import * as React from "react";

export default function IndividualRequest({ route, navigation }) {
    /* 2. Get the param */
    const {Name, Pic, AmountOfHelpers, Applicants, Campus, Comments, Date, Description, Helpers, Language} = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{Name} </Text>
        <Text>{Pic} </Text>
        <Text>{AmountOfHelpers} </Text>
        <Text> {Campus} </Text>
        <Text>{Date} </Text>
        <Text>{Description} </Text>

        <Button title="Back to all requests" onPress={() => navigation.navigate('HelpScreen')} />
      </View>
    );
  }