import firebase from "firebase";

export default function AddEvent(Request, Amount, Language, Campus, time) {
  

  const event = async () => {
    // get current users uid
    const Uid = firebase.auth().currentUser.uid;
    const usersRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const doc = await usersRef.get();
    var name = doc.data().name;
    var pic = doc.data().profilepicture;
    // define the current users
    firebase.firestore().collection('Requests').add({
            Name: name,
            Pic: pic,
            RequesterUID: Uid,
            HelpersUID: [],
            Completed: false,
            Description: Request,
            HelperAmount: Amount,
            PreferedLanguage: Language,
            Campus: Campus,
            Comments: {},
            CompletionTime: time,
            Applicants: []
        })
  };

  event();
}