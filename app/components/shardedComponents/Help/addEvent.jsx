import firebase from "firebase";

export default function AddEvent(Request, Amount, Language, Campus) {
  

  const event = async () => {
    // get current users uid
    const Uid = firebase.auth().currentUser.uid;
    // define the current users
    firebase.firestore().collection('Requests').add({
            RequesterUID: Uid,
            HelperUID: null,
            Completed: false,
            Description: Request,
            HelperAmount: Amount,
            PreferedLanguage: Language,
            Campus: Campus,
            Comments: {},
            CreationTime: Date()
        })
  };

  event();
}