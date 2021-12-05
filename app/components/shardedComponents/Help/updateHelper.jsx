import firebase from "firebase";

export function AcceptApplicant(RequestID, ApplicantID) {
  const appAdd = async () => {
    await firebase
      .firestore()
      .collection("Requests")
      .doc(RequestID)
      .update({
        HelpersUID: firebase.firestore.FieldValue.arrayUnion(ApplicantID),
      });
  };

  appAdd();
}

export function DenyApplicant(RequestID, ApplicantID) {
    const appAdd = async () => {
        await firebase
        .firestore()
        .collection("Requests")
        .doc(RequestID)
        .update({
          Applicants: firebase.firestore.FieldValue.arrayRemove(ApplicantID),
        });
    };
  
    appAdd();
  }