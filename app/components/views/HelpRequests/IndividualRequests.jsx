import { Text, View, TextInput, Button } from "react-native";
import * as React from "react";

export default function IndividualRequest({ route, navigation }) {
    /* 2. Get the param */
    const { Name } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{Name}</Text>
        <Button title="GoBack" onPress={() => navigation.navigate('HelpScreen')} />
      </View>
    );
  }