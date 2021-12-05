import firebase from "firebase";

export default function UpdatePP(pictureURI) {
    
  const appAdd = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        profilepicture: pictureURI,
      });
  };

  appAdd();
}