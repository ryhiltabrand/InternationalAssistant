import firebase from 'firebase';


export default function filtercat(type,sortformat){

    var locList = []

    const filterbytype = async() =>{

        if (sortformat == 'rating'){

             // will filter by the type of location, and then sort by rating
        var snapshot = await firebase.firestore().collection('Locations').where(
            "category", "==", type).orderBy('rating','desc').get();
        
        // this is for All category, it will display all locations
        if (type == 'All'){
            var snapshot = await firebase.firestore().collection('Locations').orderBy('rating','desc').get()
        }
        if (snapshot.empty){
            console.log('No matching documents');
            return;
        }
        
        snapshot.forEach(doc=> {
            locList.push(doc.data());
        })
        
        }

        if (sortformat == 'alpha'){

            // will filter by the type of location, and then sort by alphab
        var snapshot = await firebase.firestore().collection('Locations').where(
            "category", "==", type).orderBy('name','asce').get();
        // this is for All category, it will display all locations
        if (type == 'All'){
            var snapshot = await firebase.firestore().collection('Locations').orderBy('name','desc').get()
        }
        if (snapshot.empty){
            console.log('No matching documents');
            return;
        }
        
        snapshot.forEach(doc=> {
            locList.push(doc.data());
        })
        }
       
        
    }
    
    return filterbytype().then(()=>{
        console.log(locList)
        return locList;
    })
    // filterbytype()
}
