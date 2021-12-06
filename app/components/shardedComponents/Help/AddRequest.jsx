import firebase from "firebase";

export default function AddRequest(Request1, Amount, Language, Campus, time) {
  

  const Request = async () => {
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
            Description: Request1,
            HelperAmount: Number(Amount),
            PreferedLanguage: Language,
            Campus: Campus,
            Comments: {},
            CompletionTime: time,
            Applicants: []
        })
  };

  Request();
}