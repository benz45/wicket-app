import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

// Styled
import * as Styled from 'root/src/Styles/Screens/Styled_MessageScreen';

// Redux
import {useSelector} from 'react-redux';

// Custom hook
import useUserOnline from 'root/src/Hook/useUserOnline';
import useMessageScreen from 'root/src/Hook/useMessageScreen';
import useMessage from 'root/src/Hook/useMessage';

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

const HeaderMessageScreen = () => {
  const {state} = useUserOnline();

  return (
    <Styled.ContainerHeader>
      <Styled.TextHeader>Message Room</Styled.TextHeader>
      {state.isLoading && !state.user.length ? (
        <Styled.Loading>Loading...</Styled.Loading>
      ) : (
        <Styled.ViewListUser>
          {state.user.map((elem) => (
            <Styled.ViewContainerUser key={elem.uid}>
              <Styled.ImageUser source={{uri: elem.photoURL}} />
              <Styled.BadgeUser />
            </Styled.ViewContainerUser>
          ))}
        </Styled.ViewListUser>
      )}
    </Styled.ContainerHeader>
  );
};

const MessageScreen = () => {
  const {messagesData} = useSelector((store) => store.FirebaseReducer.messages);
  const {user} = useSelector((store) => store.CurrentUserReducer);
  const {_onSend} = useMessageScreen();
  useMessage();

  return (
    <React.Fragment>
      <HeaderMessageScreen />
      <GiftedChat
        messages={messagesData}
        messagesContainerStyle={{paddingBottom: 50}}
        onSend={(props) => _onSend(props)}
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
