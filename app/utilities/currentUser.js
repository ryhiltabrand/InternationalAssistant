import firebase from 'firebase'


export function getCurrentUserUID () {
    // if(firebase.auth().currentUser != null) {
    return firebase.auth().currentUser.uid
    // }
    // else {
    //     return 'N/A'
    // }
}



