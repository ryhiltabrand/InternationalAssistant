import * as firebase from 'firebase';
import 'firebase/firestore';
import credentials from 'app/utilities/firebaseAuth.js';

const database = firebase.firestore(credentials);

//User Collection

class UsersCollection {

    set #createProfile(name, birthday, email, language = []) {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                name: name,
                dateOfBirth: birthday,
                email: email,
                language: language
            });
            console.log("Users document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding Users document: ", e);
        }
    }

    get #obtainProfile(email) {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such User document!");
        }
    }

    constructor(name, birthday, email, language = []) {
        //may break due to not supported by node.js (Private instance methods)
        //this.#createProfile(name, birthday, email, language);
    }

}

//Other Collection

//setOtherDoc
//getOtherDoc