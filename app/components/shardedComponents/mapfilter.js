import firebase from 'firebase';


export default function filtercat(type){

    const filterbytype = async() =>{

        var locList = []

        const snapshot = await firebase.firestore().collection('Locations').where(
            "category", "==", type).orderBy('rating','desc').get();
        
        if (snapshot.empty){
            console.log('No matching documents');
            return;
        }
        
        snapshot.forEach(doc=> {
            locList.push(doc.data());
        })
        // console.log(locList)
    }

    filterbytype()
}
