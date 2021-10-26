import firebase from 'firebase'


export default function updatefriends(){

    const friendadd = async() =>{

        
        const Uid = firebase.auth().currentUser.uid
        const friendlist = firebase.firestore().collection('users').where("UID", "==", firebase.auth().currentUser.uid).get();
        console.log(Uid)
        friendlist.then((querySnapshot) => {querySnapshot.forEach((doc) => {doc.ref.update(
            {
                FriendsList: firebase.firestore.FieldValue.arrayUnion({
                  "bV999QML9PeO3tobe7Ca":true
                })
              } 
        )})})
    }
    friendadd()


}