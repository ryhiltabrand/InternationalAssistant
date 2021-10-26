import firebase from 'firebase'


export default function updatefriends(){

    const friendadd = async() =>{

        
       // get the current user's uid
        const Uid = firebase.auth().currentUser.uid
        const friendlist = firebase.firestore().collection('users').doc(Uid)
        // const friendlist = firebase.firestore().collection('users').where("UID", "==", firebase.auth().currentUser.uid).get();
        console.log(Uid)
        const addfriend = await friendlist.update({
            "FriendsList.yVHnHIqhsOYbVbWOM6TbjpU4N3x1":true
        })
    

        
    }
    friendadd()


}