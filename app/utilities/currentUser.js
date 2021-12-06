import React, { Component } from 'react';
import firebase from 'firebase'
import * as database from '../utilities/database';


export function getCurrentUserUID () {
    // if(firebase.auth().currentUser != null) {
    return firebase.auth().currentUser.uid
    // }
    // else {
    //     return 'N/A'
    // }
}

const currentUser = new database.UsersCollection();
var currentUserInfo = {
  name: 'N/A',
  dateofbirth: 'N/A',
  currentUser: 'N/A',
  bio: 'N/A',
  language: 'N/A',
  country: 'N/A'
}

currentUser.getAccountInformation("yVHnHIqhsOYbVbWOM6TbjpU4N3x1").then((result) => {
  currentUserInfo = result;
});

export function getCurrentUserName() {
     console.log("Again, my name is:", currentUserInfo.name);
     return currentUserInfo.name;
}

export function getCurrentUserCountry() {
    console.log("My country is:", currentUserInfo.country);
    return currentUserInfo.country;
}
