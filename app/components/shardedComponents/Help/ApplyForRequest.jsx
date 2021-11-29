import firebase from "firebase";

export default function ApplyForRequest(RequestID) {
  const appAdd = async () => {
    const Uid = firebase.auth().currentUser.uid;
    const add = await firebase
      .firestore()
      .collection("Requests")
      .doc(RequestID)
      .update({
        Applicants: firebase.firestore.FieldValue.arrayUnion(Uid),
      });
  };

  appAdd();
}
