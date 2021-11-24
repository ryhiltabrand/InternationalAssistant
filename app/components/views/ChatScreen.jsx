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
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

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
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;


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