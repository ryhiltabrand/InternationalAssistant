import firebase from "firebase";

export function AcceptRequest(FriendsUID) {
  
    const Accept = async () => {

    const Uid = firebase.auth().currentUser.uid;

    firebase
      .firestore()
      .collection("users")
      .doc(Uid)
      .update({
        [`FriendsList.${FriendsUID}`]: "Friends",
      });

   firebase
      .firestore()
      .collection("users")
      .doc(FriendsUID)
      .update({
        [`FriendsList.${Uid}`]: "Friends"
      })

  };

  Accept();
}

export function DenyRequest(FriendsUID) {
  
    const Deny = async () => {
    // get current users uid
    const Uid = firebase.auth().currentUser.uid;

     firebase
      .firestore()
      .collection("users")
      .doc(Uid)
      .update({
        [`FriendsList.${FriendsUID}`]: firebase.firestore.FieldValue.delete(),
      });


    // Add current users UID to other users friendlist too
   firebase
      .firestore()
      .collection("users")
      .doc(FriendsUID)
      .update({
        [`FriendsList.${Uid}`]: firebase.firestore.FieldValue.delete()
      })

  };

  Deny();
}
export function deletefriends(FriendsUID){

      
    const Delete = async () => {
        // get current users uid
        const Uid = firebase.auth().currentUser.uid;
    
         firebase
          .firestore()
          .collection("users")
          .doc(Uid)
          .update({
            [`FriendsList.${FriendsUID}`]: firebase.firestore.FieldValue.delete(),
          });
    
    
        // Add current users UID to other users friendlist too
       firebase
          .firestore()
          .collection("users")
          .doc(FriendsUID)
          .update({
            [`FriendsList.${Uid}`]: firebase.firestore.FieldValue.delete()
          })
    
      };
    
      Delete();
}