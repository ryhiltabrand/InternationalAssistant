import firebase from 'firebase'


export default function updatefriends(FriendsUID){

    const friendadd = async() =>{

        // get current users uid
        const Uid = firebase.auth().currentUser.uid

        // define the current users 
        const currentUID = firebase.firestore().collection('users').where(
            "UID", "==", firebase.auth().currentUser.uid).get();
           
        // add the other users uid to current users friendlist
        currentUID.then((querySnapshot) => 

        {querySnapshot.forEach((doc) => {doc.ref.update(

            {[`FriendsList.${FriendsUID}`]:false})
        })
    })
    
    // Add current users UID to other users friendlist too
        const otherUserUID = firebase.firestore().collection('users').where(
        "UID", "==", FriendsUID).get();

        otherUserUID.then((querySnapshot) => 

        {querySnapshot.forEach((doc) => {doc.ref.update(

            {[`FriendsList.${Uid}`]:false})
        })
    })

    }

    friendadd()
}