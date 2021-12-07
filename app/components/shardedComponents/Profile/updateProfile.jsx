import firebase from "firebase";

export function UpdateBio(bio) {
    const uid = firebase.auth().currentUser.uid;
  const Ubio = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        bio: bio,
      });
  };

  Ubio();
}
export function UpdateLanguages(Languages) {
    const uid = firebase.auth().currentUser.uid;
  const ULanguages = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        language: Languages,
      });
  };

  ULanguages();
}