import firebase from "firebase"

export default async function AddChat(ouid){
  Dupecreator=null;
    Users=[ouid,firebase.auth().currentUser.uid]
    Users.sort()
    data = {
      HelpRequest: true,
      Users: Users,
    }
    Dupequery= await firebase.firestore().collection("DirectMessaging")
    .where("Users", "in", [Users]).get()
    Dupequery.docs.map((doc)=>{
      if(doc.data().HelpRequest==true){
        Dupecreator=true;
      }
    })
    if(Dupecreator!=true){
      const add = await firebase.firestore().collection("DirectMessaging").add(data)
      console.log("Worked ", add.id)
    }
}
