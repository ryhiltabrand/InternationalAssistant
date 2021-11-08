import firebase from 'firebase';
/*
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
This is gonna be test for that timer error if node modules needs to be deleted uncomment this and see if it works.
*/


export default async function FriendMatcher(){
    var Matcher=[]
    
    const Loc = async () => {
        counter=0
        userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        const doc = await userRef.get()
        var location = doc.data().country
        var uid = doc.data().UID
        var friend = doc.data().FriendsList
        var friendslist = Object.keys(friend)
        locquery = await firebase.firestore().collection('users')
        .where("country", "==", location).get()
        locquery.docs.map((doc) =>{
            var otherUID = doc.data().UID
            if((friendslist.includes(otherUID)!=true && counter<2)){
                if(otherUID != uid){
                    Matcher.push(otherUID)
                    counter++
                }
            }
        })
    }

        
    const Lang = async() => {
        counter=0
        userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        const doc= await userRef.get()
        var language = doc.data().language
        var uid = doc.data().UID
        var friend = doc.data().FriendsList
        var friendslist = Object.keys(friend)
        for (var i=0; i<language.length; i++){
            if(language.length ==1){
                langquery= await firebase.firestore().collection("users")
                .where("language", 'array-contains' , language[i])
                .get()
                langquery.docs.map((doc) => {
                    var otherUID = doc.get("UID")
                    if(friendslist.includes(otherUID)!= true && counter<2 && Matcher.includes(otherUID) != true){
                        if(otherUID != uid){
                            Matcher.push(otherUID)
                            counter++;
                        }
                    }   
                })
            }
            else if(language.length>=2){
                langquery = await firebase.firestore().collection('users')
                .where("language", "array-contains", language[i])
                .get()
                langquery.docs.map((doc) => {
                    var otherUID = doc.data().UID
                    if((friendslist.includes(otherUID)!= true) && counter<2 && (Matcher.includes(otherUID) != true)){
                        if(otherUID != uid){
                            Matcher.push(otherUID)
                            counter++;
                        }
                    }
                })
            }
        }
    }
    const Mutual = async() => {
        userRef = firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        const doc = await userRef.get()
        var uid = doc.data().UID
        var friend = doc.data().FriendsList
        var friendslist = Object.keys(friend)
        for(var i=0; i<friendslist.length; i++){
            mutualquery = await firebase.firestore().collection('users')
            .where("UID", "==", friendslist[i]).get()
            mutualquery.docs.map((doc) => {
                var friends = doc.data().FriendsList
                var otherList= Object.keys(friends)
                for(var j=0; j<otherList.length; j++){
                    if((friendslist.includes(otherList[j]) != true) && (Matcher.includes(otherList[j]) != true)){
                        if(otherList[j] != uid){
                            Matcher.push(otherList[j])
                            break;
                        }
                    }
                }
            })
            if(Matcher.length==5){
                break;
            }
        }
    }
    return Loc().then(()=> Lang())
    //.then(() => Mutual())
    .then(() => {
        //console.log(Matcher)
        return Matcher;
        //return 0;
    }).catch(function(error){
        return "error";
    })
}