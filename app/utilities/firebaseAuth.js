import { initializeApp } from "firebase/app";

// Initialize Firebase
export const credentials = {
    //Information can be define in CI varibles. Then sed in by the gitlab runner
    apiKey: "AIzaSyBURNkibRwSyghNlodMToYyjWWUdctdtto",
    authDomain: "internationalassistant-2145f.firebaseapp.com",
    projectId: "internationalassistant-2145f",
    storageBucket: "internationalassistant-2145f.appspot.com",
    messagingSenderId: "669783546610",
    appId: "1:669783546610:web:21975730b89aa3d21d4e6b",
    measurementId: "G-SQY6PDPBMJ"
  
  };

 const firebaseCred = initializeApp(credentials);
 export default firebaseCred;