import firebase from "firebase";

export default function AddAnswer(Request) {
  

  const answers = async () => {
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
    firebase.firestore().collection('Questions and Answers').add({
            
        })
  };

  answers();
}