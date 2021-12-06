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
