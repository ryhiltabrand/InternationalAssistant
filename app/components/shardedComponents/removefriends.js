import firebase from 'firebase'


export default function deletefriends(FriendsUID){

    const friendremove = async() =>{

        // get current users uid
        const Uid = firebase.auth().currentUser.uid

        // define the current users 
        const currentUID = firebase.firestore().collection('users').where(
            "UID", "==", firebase.auth().currentUser.uid).get();
           
        // remove the other users uid to current users friendlist
        currentUID.then((querySnapshot) => 

        {querySnapshot.forEach((doc) => {doc.ref.set(
            
            {FriendsList: {[FriendsUID]: firebase.firestore.FieldValue.delete()}}, {merge:true})
        })
    })

        // get other users uid
        const otherUserUID = firebase.firestore().collection('users').where(
            "UID", "==", FriendsUID).get();
        
        // remove current users UID to other users friendlist too
        otherUserUID.then((querySnapshot) => 

        {querySnapshot.forEach((doc) => {doc.ref.set(
            
            {FriendsList: {[Uid]: firebase.firestore.FieldValue.delete()}}, {merge:true})
        })
    })
        


    }

    friendremove()
}