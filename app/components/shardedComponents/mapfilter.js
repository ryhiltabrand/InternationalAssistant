import firebase from 'firebase';


export default function filtercat(type){

    const filterbytype = async() =>{

        const snapshot = await firebase.firestore().collection('Locations').where(
            "category", "==", type).get();
        
        if (snapshot.empty){
            console.log('No matching documents');
            return;
        }
        
        snapshot.forEach(doc=> {
            console.log(doc.id, '=>', doc.data());
        })
    }

    filterbytype()
}
