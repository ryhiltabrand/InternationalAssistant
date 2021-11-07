import firebase from 'firebase'


export function getCurrentUserUID () {
    return firebase.auth().currentUser.uid
}



