import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

export default function DrawerCustom(props) {
  return (
    <View style={{ flex: 1 }}>
      
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Home"
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        />
        <DrawerItem
          label="Events"
          onPress={() => {
            props.navigation.navigate("Events");
          }}
        />
        <DrawerItem
          label="Locations"
          onPress={() => {
            props.navigation.navigate("Locations");
          }}
        />
        <DrawerItem
          label="Help"
          onPress={() => {
            props.navigation.navigate("Locations");
          }}
        />
        <DrawerItem
          label="Q&A"
          onPress={() => {
            props.navigation.navigate("Locations");
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
}
