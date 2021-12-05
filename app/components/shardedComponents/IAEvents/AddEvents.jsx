import firebase from "firebase";

export default function AddEvent(Description, language, Campus, Name, Country, Street, City, States, Zip, Date) {


  const event = async () => {
    // get current users uid
    const Uid = firebase.auth().currentUser.uid;
    const usersRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const doc = await usersRef.get();
    var name = doc.data().name;
    var Address = Street + ", " +City + ", " + States + " " + Zip;
    console.log(Address)
    firebase.firestore().collection('Events').add({
      Address: Address,
      Campus: Campus,
      Description: Description,
      Name: Name,
      Country: Country,
      dislikes: 0,
      language: language,
      likes: 0,
      Date: Date,
    })
  };
  event();
}