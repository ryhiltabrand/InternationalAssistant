import firebase from 'firebase'

export default function AddEvent(FriendsUID){

    const event = async() =>{

        // get current users uid
        const Uid = firebase.auth().currentUser.uid

        // define the current users 
        firebase.firestore().collection('Requests').add({
            Name: "Nishil",
            RequesterUID: Uid,
            HelperUID: null,
            Completed: false,
            Description: "I need to be driven",
            HelpersNeeded: 1,
            Comments: 2
        })

    }

    event()
}