import firebase from "firebase";

export default function AddEvent(Description, language, Campus, Name, Country) {


  const event = async () => {
    // get current users uid
    const Uid = firebase.auth().currentUser.uid;
    const usersRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const doc = await usersRef.get();
    var name = doc.data().name;
    // define the current users
    firebase.firestore().collection('Events').add({
      Address:
      {
        Street: Street,
        City: City,
        State: State,
        Zip: Zip
      },
            
      Campus: Campus,
      Description: Description,
      EID: EID,
      Name: Name,
      Country: Country,
      dislikes: dislikes,
      language: language,
      likes: likes,
      photo: photo,
      type: type
    })
  };

  event();
}