import firebase from 'firebase';
/*
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
This is gonna be test for that timer error if node modules needs to be deleted uncomment this and see if it works.
*/


export default function FriendMatcher(){
    var Matcher=[]
    const Loc= async () => {
        counter=0
        const usersRef= firebase.firestore().collection('users').where("UID", "==", firebase.auth().currentUser.uid).get();
        (await usersRef).forEach((doc) => {
         var location = doc.get('country')
         var uid = doc.get('UID')
         var friend = doc.get('FriendsList')
         var friendslist = Object.keys(friend) 
         firebase.firestore().collection("users")
         .where("country", '==', location )
         .get()
         .then((snapshot) =>{
             snapshot.docs.map((doc) => {
                var otherUID= doc.get("UID")
                if((friendslist.includes(otherUID)!=true && counter<2)){
                    if(otherUID != uid){
                        console.log("This is the way")
                        console.log(otherUID)
                        Matcher.push(otherUID)
                        counter++
                    }
                }   
               
             })
             
         })
        })
    }
    const Lang = async() => {
        counter=0
        const usersRef= firebase.firestore().collection('users').where("UID", "==", firebase.auth().currentUser.uid).get();
        (await usersRef).forEach((doc) => {
            var language = doc.get('language')
            var uid = doc.get('UID')
            var friend = doc.get('FriendsList')
            var friendslist = Object.keys(friend) 
            for(var i =0; i<language.length; i++){
                if(language.length ==1){
                    firebase.firestore().collection("users")
                    .where("language", 'array-contains' , language[i] )
                    .get()
                    .then((snapshot) =>{
                        snapshot.docs.map((doc) => {
                            var otherUID = doc.get("UID")
                            if(friendslist.includes(otherUID)!= true && counter<2 && Matcher.includes(otherUID) != true){
                                if(otherUID != uid){
                                    console.log("This is the way")
                                    console.log(otherUID)
                                    Matcher.push(otherUID)
                                    counter++;
                                }
                            }   
                        })
                    })
                }
                else if(language.length>=2){
                    firebase.firestore().collection("users")
                    .where("language", 'array-contains' , language[i] )
                    .get()
                    .then((snapshot) =>{
                        snapshot.docs.map((doc) => {
                            var otherUID = doc.get("UID")
                            if(friendslist.includes(otherUID)!= true && counter<2 && Matcher.includes(otherUID) != true){
                                if(otherUID != uid){
                                    console.log("This is the way")
                                    console.log(otherUID)
                                    Matcher.push(otherUID)
                                    counter++;
                                }
                            }   
                        })
                    })
                }
            }
        })
    }
    //Make into all one function since async is causing problems.
}