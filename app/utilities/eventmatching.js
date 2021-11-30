import React, { useState, Component } from 'react'
import firebase from "firebase"
import { db } from './firebase'
import { tsConstructorType } from '@babel/types'
import { render } from 'react-dom'
import { State } from 'react-native-gesture-handler'
LogBox.ignoreLogs(['Setting a timer'])
import { LogBox } from 'react-native'


    export default function EventMatcher(){
    var EMatcher = []    
    const Lang = async() => {
        userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        const doc= await userRef.get()
        var language = doc.data().language
        var uid = doc.data().UID
        var Ucountry = doc.data().country
        for (var i=0; i<language.length; i++){
            if(language.length == 1){
                langquery= await firebase.firestore().collection("Events")
                .where("language", 'array-contains' , language[i])
                .get()
                langquery.docs.map((doc) => {
                    var OEID = doc.data().EID
                    var Elang = doc.data().language
                    var Ecountry = doc.data().country
                    if((Elang == language[i] && Ecountry == Ucountry)){
                            EMatcher.push(OEID)
                    }  
                })
            }
            else if(language.length>=2){
                langquery = await firebase.firestore().collection('Events')
                .where("language", "array-contains", language[i])
                .get()
                langquery.docs.map((doc) => {
                    var OEID = doc.data().EID
                    var Elang = doc.data().language
                    var Ecountry = doc.data().country
                    if((Elang == language[i] && Ecountry == Ucountry)){
                            EMatcher.push(OEID)
                    }
                })
            }
        }   
    }
    Lang().then(()=> {
    console.log(EMatcher)
    })
    }