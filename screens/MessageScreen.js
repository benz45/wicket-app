import React, {useCallback, useState, useEffect} from 'react';
import {GiftedChat, InputToolbar, Send, Bubble} from 'react-native-gifted-chat';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import database from '@react-native-firebase/database';

// Paper
import {Avatar} from 'react-native-paper';

// Styles
import Styles from '../styles/styles';

// Redux
import {useSelector} from 'react-redux';
import {
  action_setMessages,
  action_userOnline,
} from '../src/actions/actions_firebase';

// Custom input.
const customtInputToolbar = (props, colors) => {
  return (
    <InputToolbar
      {...props}
      primaryStyle={{
        backgroundColor: colors.tabBackground,
        borderRadius: 30,
      }}
      containerStyle={{
        paddingVertical: 25,
        backgroundColor: colors.background,
        paddingHorizontal: 25,
        borderTopColor: colors.surface,
      }}
    />
  );
};

// Custom Button send.
const customtSend = (props, colors) => {
  return (
    <Send
      {...props}
      alwaysShowSend={true}
      children={
        <View>
          <Icon name="send" size={22} color={colors.accent} />
        </View>
      }
      containerStyle={{
        justifyContent: 'center',
        backgroundColor: colors.tabBackground,
        borderRadius: 30,
        marginRight: 20,
      }}
    />
  );
};

// Custom text
const customBubble = (props, colors) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{right: {backgroundColor: colors.button}}}
    />
  );
};

const MessageScreen = () => {
  const [isUser, setUser] = useState([]);
  const {user, colors, messagesData} = useSelector((reducer) => {
    return {
      ...reducer.FirebaseReducer.currentUser,
      ...reducer.ThemeReducer.theme,
      ...reducer.NotificationReducer,
      ...reducer.FirebaseReducer.messages,
    };
  });

  // Send Messages
  const onSend = useCallback((newMessages) => {
    newMessages.reduce((accumulator, currentValue) => {
      accumulator = currentValue;
      accumulator.user.username = user.displayName;
      accumulator.createdAt = accumulator.createdAt.toString();
      accumulator.timestamp = Date.now();
      action_setMessages(accumulator);
    }, {});
  }, []);

  const userOnline = async () => {
    await action_userOnline()
      .then((x) => {
        setUser(Object.values(x));
      })
      .catch((err) => {
        console.log('err > ', err);
      });
  };

  const sortMessages = () => {
    if (messagesData) {
      return messagesData.sort((a, b) => {
        if (a.timestamp > b.timestamp) return -1;
        if (b.timestamp > a.timestamp) return 1;
        return 0;
      });
    } else [];
  };

  useEffect(() => {
    userOnline();
    database()
      .ref('online/user')
      .on('value', () => userOnline());
  }, []);
  return (
    <>
      <View
        style={[
          Styles.HomeScreen_Header,
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <Text style={{fontSize: 20, color: colors.accent}}>Message Room</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {isUser.map((elem) => (
            <View key={elem.uid} style={{marginLeft: 8}}>
              <Avatar.Image size={38} source={{uri: elem.photoURL}} />
              <Avatar.Text
                style={{
                  backgroundColor: '#8AF238',
                  position: 'absolute',
                  right: 0,
                }}
                size={12}
              />
            </View>
          ))}
        </View>
      </View>
      <GiftedChat
        messages={sortMessages()}
        placeholder="Aa"
        messagesContainerStyle={{paddingBottom: 40}}
        onSend={onSend}
        renderInputToolbar={(props) => customtInputToolbar(props, colors)}
        renderBubble={(props) => customBubble(props, colors)}
        renderSend={(props) => customtSend(props, colors)}
        user={{
          _id: user.email,
          avatar: user.photoURL,
        }}
      />
    </>
  );
};

export default MessageScreen;
