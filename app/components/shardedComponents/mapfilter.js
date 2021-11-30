import firebase from 'firebase';


export default function filtercat(type){
    
    var locList = []

    const filterbytype = async() =>{

        

        const snapshot = await firebase.firestore().collection('Locations').where(
            "category", "==", type).orderBy('rating','desc').get();
        
        if (snapshot.empty){
            console.log('No matching documents');
            return;
        }
        
        snapshot.forEach(doc=> {
            locList.push(doc.data());
        })
        
    }
    
    return filterbytype().then(()=>{
        console.log(locList)
        return locList;
    })
    // filterbytype()
}
