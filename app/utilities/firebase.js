import firebase from 'firebase';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyBURNkibRwSyghNlodMToYyjWWUdctdtto",
   authDomain: "internationalassistant-2145f.firebaseapp.com",
   projectId: "internationalassistant-2145f",
   storageBucket: "internationalassistant-2145f.appspot.com",
   messagingSenderId: "669783546610",
   appId: "1:669783546610:web:21975730b89aa3d21d4e6b",
   measurementId: "G-SQY6PDPBMJ"
 };

firebase.initializeApp(firebaseConfig);
export default firebase;

