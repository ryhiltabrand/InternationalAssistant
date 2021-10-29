//import { initializeApp } from "firebase/app";
import firebase from "./firebase";
//import { getFirestore, setDoc, collection, getDoc, getDocs, addDoc, query, where} from "firebase/firestore";

// import {credentials} from './firebaseAuth.js';

//const firebaseApp = initializeApp(credentials);
var db = firebase.firestore();

//User Collection

export class UsersCollection {
    #userFieldEntries = {};

    //Accessor and Mutator for 'users' collection

    setName(name) {
        this.#userFieldEntries.name = name
    }

    setDateofBirth(date) {
        this.#userFieldEntries.dateofbirth = date
    }

    setEmail(email) {
        this.#userFieldEntries.email = email
    }

    setLanguage(language) {
        this.#userFieldEntries.language = language
    }

    setCountry(country) {
        this.#userFieldEntries.country = country
    }

    setBio(bio) {
        this.#userFieldEntries.bio = bio
    }

    setProfilePicture(pictureURL) {
        this.#userFieldEntries.profilepicture = pictureURL
    }
    
    setUID(uid) {
        this.#userFieldEntries.UID = uid
    }


    //Creates a User Document with given fields from the userFieldEntries object
    async createUserAccountInformation() {

        db.collection("users").doc(this.#userFieldEntries.UID).set(this.#userFieldEntries)

        //doc = getAccountInformation(this.#userFieldEntries.UID)
        //console.error(doc)
        //Create user document
        // if(doc === 'undefined') {
        //     console.error("it is undefined")
        //     try {
        //         await addDoc(collection(db, 'users'), this.#userFieldEntries)
        //     } catch (err) {
        //         console.error("Error adding Users document with UID ", this.#userFieldEntries.UID, err)
        //     }
        // }
        // //Update existing user document
        // else {
        //     console.error("Didn't detect")
        //     try {
        //         userDocument = 
        //         await updateDoc(userDocument, this.#userFieldEntries)
        //     } catch (err) {
        //         console.error("Error adding Users document with UID ", this.#userFieldEntries.UID, err)
        //     }
        // }


        // Add user entry with doc ID set to random
        // try {
        //     await addDoc(collection(db, 'users'), this.#userFieldEntries)
        // } catch (err) {
        //     console.error("Error adding Users document with UID ", this.#userFieldEntries.UID, err)
        // }

        // Add user entry with doc ID set to UID
        // try {
        //     await setDoc(doc(db, "users", this.#userFieldEntries.UID), this.#userFieldEntries);
        //     console.log("Users document written with ID: ", this.#userFieldEntries.UID);
        // } catch (e) {
        //     console.error("Error adding Users document with UID ", e);
        // }

        // Firebase 8 Implementation for setting doc ID by user's UID

    }

    //Retrieves User Information from document based on UID
    async getAccountInformation(UID) {

        docRef = db.collection("users").doc(UID);
        //return docSnap.then;
        return docRef.get().then(function(doc) {
            if (doc.exists) {
                //console.log(doc.data())
                stuff = doc.data();
                return stuff;
            }
            // else {
            //     return Promise.reject("No such UserAccountInformation document for ", UID);
            //}
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

/*         search document by querying UID field
        const UIDQuery = query(collection(db, "users"), where("UID", "==", UID));
        const querySnapshot = await getDocs(UIDQuery);
        console.log(querySnapshot.docs[0].id)
        return querySnapshot.docs[0].id;
        const docRef = UID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            //Returns user object
            return docSnap.data();
        } else {
            // doc.data() will be undefined in this case
            return Promise.reject("No such UserAccountInformation document for ", email);
            //console.log("No such UserAccountInformation document for ", email);
        }
 */
    }

    // async deleteAccountInformation(email) {
    //         await deleteDoc(doc(email));
    //     }

}

//Other Collection

//setOtherDoc
//getOtherDoc