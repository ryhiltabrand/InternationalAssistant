import firebase from "firebase";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

const Loc = async () => {
  await firebase
    .firestore()
    .collection("users")
    .where("UID", "==", firebase.auth().currentUser.uid)
    .get()
    .then((snap) => {
      snap.docs.map((doc) => {
        const name = doc.get("name");
        const profpic = doc.get("profilepicture");
        console.log(name, profpic)
        return [name, profpic];
      });
    });
};

export default Loc;