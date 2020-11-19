import React, {useCallback, useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

import database from '@react-native-firebase/database';

// Styled
import * as Styled from '../styles/screens/Styled_MessageScreen';

// Redux
import {useSelector} from 'react-redux';
import {
  action_setMessages,
  action_userOnline,
} from '../src/actions/actions_firebase';

// Custom input.
const customInputToolbar = (props) => {
  return <Styled.InputToolbar {...props} />;
};

// Custom Button send icon.
const customSend = (props) => {
  return <Styled.Send {...props} />;
};

// Custom message
const customBubble = (props) => {
  return <Styled.Bubble {...props} />;
};

const customComposer = (props) => {
  return <Styled.Composer {...props} />;
};

const MessageScreen = () => {
  const [isUser, setUser] = useState([]);
  const {user, messagesData} = useSelector((reducer) => {
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
    <React.Fragment>
      <Styled.ContainerHeader>
        <Styled.TextHeader>Message Room</Styled.TextHeader>
        <Styled.ViewListUser>
          {isUser &&
            isUser.map((elem) => (
              <Styled.ViewContainerUser key={elem.uid}>
                <Styled.ImageUser source={{uri: elem.photoURL}} />
                <Styled.BadgeUser />
              </Styled.ViewContainerUser>
            ))}
        </Styled.ViewListUser>
      </Styled.ContainerHeader>
      <GiftedChat
        messages={sortMessages()}
        messagesContainerStyle={{paddingBottom: 50}}
        onSend={onSend}
        renderInputToolbar={(props) => customInputToolbar(props)}
        renderBubble={(props) => customBubble(props)}
        renderSend={(props) => customSend(props)}
        renderComposer={(props) => customComposer(props)}
        user={{
          _id: user.email,
          avatar: user.photoURL,
        }}
      />
    </React.Fragment>
  );
};

export default MessageScreen;
