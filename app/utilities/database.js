import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, collection, doc, getDoc, addDoc} from "firebase/firestore";

import {credentials} from './firebaseAuth.js';

const firebaseApp = initializeApp(credentials);
const db = getFirestore();

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

    
    async createUserAccountInformation() {
        // Create new instance
        try {
            await setDoc(doc(db, "users", this.#userFieldEntries.email.replace(/\./g,'')), this.#userFieldEntries);
            console.log("Users document written with ID: ", this.#userFieldEntries.email);
        } catch (e) {
            console.error("Error adding Users document with email ", e);
        }
    }

    async getAccountInformation(email) {
        const docRef = doc(db, "users", email.replace(/\./g,''));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return Promise.resolve(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            return Promise.reject("No such UserAccountInformation document for ", email);
            //console.log("No such UserAccountInformation document for ", email);
        }
    }

    // async deleteAccountInformation(email) {
    //         await deleteDoc(doc(email));
    //     }
    
}

//Other Collection

//setOtherDoc
//getOtherDoc