import * as firebase from 'firebase';
import 'firebase/firestore';
import credentials from './firebaseAuth.js';

firebase.initializeApp(credentials);

const database = firebase.firestore();

//User Collection

class UsersCollection {
    static #documentID;
    static #userFieldEntries = new Map();

//Accessor and Mutator for 'users' collection

    setName(name) {
        this.#userFieldEntries.set('name', name)
    }

    setDateofBirth(date) {
        this.#userFieldEntries.set('dateofbirth', date)
    }

    setEmail(email) {
        this.#userFieldEntries.set('email', email)
    }

    setLanguage(language) { 
        this.#userFieldEntries.set('language', language) 
    }
    
    async createUserAccountInformation() {
        // Create new instance
        try {
            await setDoc(collection(db, "users", this.#userFieldEntries.get(email)), this.#userFieldEntries);
            console.log("Users document written with ID: ", this.#userFieldEntries.get(email));
        } catch (e) {
            console.error("Error adding Users document: ", e);
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

    constructor() {
    }

}

//Other Collection

//setOtherDoc
//getOtherDoc