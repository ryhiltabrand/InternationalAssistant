import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, collection, doc } from "firebase/firestore";

import {credentials} from './firebaseAuth.js';

const firebaseApp = initializeApp(credentials);
const db = getFirestore();

//User Collection

export class UsersCollection {
    #userFieldEntries = {};

//Accessor and Mutator for 'users' collection

    setName(name) {
        //this.#userFieldEntries.set('name', name)
        this.#userFieldEntries.name = name
    }

    setDateofBirth(date) {
        // this.#userFieldEntries.set('dateofbirth', date)
        this.#userFieldEntries.dateofbirth = date
    }

    setEmail(email) {
        // this.#userFieldEntries.set('email', email)
        this.#userFieldEntries.email = email
    }

    setLanguage(language) { 
        // this.#userFieldEntries.set('language', language)
        this.#userFieldEntries.language = language
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
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such UserAccountInformation document for ", email);
        }
    }

}

//Other Collection

//setOtherDoc
//getOtherDoc