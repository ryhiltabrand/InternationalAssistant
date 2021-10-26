import firebase from 'firebase'


export default function updatefriends(){

    const friendadd = async() =>{

        
        const Uid = firebase.auth().currentUser.uid
        const friendlist = firebase.firestore().collection('users').where("UID", "==", firebase.auth().currentUser.uid).get();
        // const friendlist = firebase.firestore().collection('users').where("UID", "==", firebase.auth().currentUser.uid).get();
        console.log(Uid)
        friendlist.then((querySnapshot) => {querySnapshot.forEach((doc) => {doc.ref.update(
            {"FriendsList.yVHnHIqhsOYbVbWOM6TbjpU4N3x1":true}
            )})})
    }
    friendadd()


}