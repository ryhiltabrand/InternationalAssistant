import * as React from 'react';
import firebase from "firebase";
import {useState, useEffect, useCallback} from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Modal,
    ScrollView,
    LogBox,
    Platform,
  } from "react-native";
  import { FontAwesome5 } from "@expo/vector-icons";
  import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GroupChat = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null)
  const {name} = route.params;
  useEffect(() => {
    readUser()
      const messageRef = firebase.firestore().collection("GroupChats")
      .doc(name).collection("Messages")
      const unsubcribe = messageRef.onSnapshot((querySnapshot) =>{
          const messagesFirestore = querySnapshot
          .docChanges()
          .filter(({type}) => type === 'added')
          .map(({doc}) =>{
            const message = doc.data()
            return{...message, createdAt: message.createdAt.toDate()}
          })
          .sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())
          appendMessages(messagesFirestore)
      })
      return () => unsubcribe()
      


  }, []);
  const appendMessages = useCallback(
    (messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages]
)
async function readUser() {
  const userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
  const doc = await userRef.get()
  usertest =  {
    _id: doc.data().UID,
    name: doc.data().name,
    avatar: doc.data().profilepicture,
  }
  if (usertest) {
      setUser(usertest)
  }
}


  async function handleSend(messages) {
    const messageRef = firebase.firestore().collection("GroupChats")
      .doc(name).collection("Messages")
    const writes = messages.map((m) => messageRef.add(m))
    await Promise.all(writes)
}

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#404040',
          },
          right: {
            backgroundColor: '#2e64e5',
          }
        }}
        textStyle={{
          left: {
            color: 'white',
          },
        }}
      />
    );
  };
//'#2e64e5'
  const scrollToBottomComponent = () => {
    return(
      <FontAwesome5 name={'arrow-down'} size={22} />
    );
  }


  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={user}
      renderBubble={renderBubble}
      showUserAvatar
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default GroupChat;


  const styles= StyleSheet.create({
    MessageName: {
        color: "#000000",
        fontSize: 20,
        textAlign:"center",
      },
      button: {
        position: "absolute",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },

  })