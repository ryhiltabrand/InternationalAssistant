import firebase from 'firebase';
/*
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
This is gonna be test for that timer error if node modules needs to be deleted uncomment this and see if it works.
*/


export default function FriendMatcher(){
    const Loc= async () => {
        const usersRef= firebase.firestore().collection('users');
        const usersLoc= await usersRef.where("country", '==', 'USA').get();
        if(usersLoc.empty){
            console.log('No matching documents.');
            return;
        }
        usersLoc.forEach(doc => {
            var uid= doc.get("UID")
            console.log(doc.id, '=>', uid);
        });
    }
    Loc();
}
