import React, {useCallback, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

// Styled
import * as Styled from '../styles/screens/Styled_MessageScreen';

// Redux
import {useSelector} from 'react-redux';
import {action_setMessages} from '../src/actions/actions_firebase';

// Custom hook
import useUserOnline from '../src/customHook/useUserOnline';

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
  const [stateUser] = useUserOnline();
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

  const sortMessages = () => {
    if (messagesData) {
      return messagesData.sort((a, b) => {
        if (a.timestamp > b.timestamp) return -1;
        if (b.timestamp > a.timestamp) return 1;
        return 0;
      });
    } else [];
  };

  return (
    <React.Fragment>
      <Styled.ContainerHeader>
        <Styled.TextHeader>Message Room</Styled.TextHeader>
        {stateUser.isLoading && !stateUser.user.length ? (
          <Styled.Loading>Loading...</Styled.Loading>
        ) : (
          <Styled.ViewListUser>
            {stateUser.user.map((elem) => (
              <Styled.ViewContainerUser key={elem.uid}>
                <Styled.ImageUser source={{uri: elem.photoURL}} />
                <Styled.BadgeUser />
              </Styled.ViewContainerUser>
            ))}
          </Styled.ViewListUser>
        )}
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
