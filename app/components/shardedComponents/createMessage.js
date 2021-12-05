import firebase from "firebase"

export default async function AddChat(ouid){
    Users=[ouid,firebase.auth().currentUser.uid]
    Users.sort()
    data = {
      Users: Users,
    }
    const add = await firebase.firestore().collection("DirectMessaging").add(data)
    console.log("Worked ", add.id)
}
