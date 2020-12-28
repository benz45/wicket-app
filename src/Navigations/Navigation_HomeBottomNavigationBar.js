import React, {useState, useEffect, useRef} from 'react';

import {useIsFocused} from '@react-navigation/native';

// Styled
import * as Styled from 'root/src/Styles/Navigations/Styled_Notifications_HomeBottomNavigationBar';

// Redux
import {useSelector, useDispatch} from 'react-redux';

// Custom hook
import useHomeBottomNavigationBar from 'root/src/Hook/useHomeBottomNavigationBar';
import useUserOnline from 'root/src/Hook/useUserOnline';

const HomeBottomNavigationBar = () => {
  const {
    state,
    _renderScene,
    _handleIndexChange,
  } = useHomeBottomNavigationBar();
  const {fetchUserOnline} = useUserOnline();

  useEffect(() => {
    fetchUserOnline();
  }, []);

  // const isFocus = useIsFocused();
  // const dispatch = useDispatch();
  // const mount = useRef(true);
  // const mountSettingMessage = useRef(true);
  // const {user, settingMessage} = useSelector((store) => {
  //   return {
  //     ...store.FirebaseReducer.messages,
  //     ...store.FirebaseReducer.currentUser,
  //     ...store.NotificationReducer,
  //     ...store.FirebaseReducer.messages,
  //   };
  // });

  // First load messages.
  // useEffect(() => {
  //   database()
  //     .ref('messages')
  //     .limitToLast(1)
  //     .on('child_added', (snapshot) => {
  //       const message = snapshot.val();
  //       if (mount.current) return;
  //       if (mountSettingMessage.current) {
  //         if (user.email !== message.user._id && isFocus) {
  //           PushNotification.localNotification({
  //             title: message.user.username,
  //             message: message.text,
  //             soundName: 'definite.mp3',
  //           });
  //           setState((prevState) => {
  //             if (prevState.index !== 1) {
  //               if (typeof prevState.routes[1].badge == 'boolean') {
  //                 prevState.routes[1].badge = 1;
  //                 return {
  //                   ...prevState,
  //                   routes: prevState.routes,
  //                 };
  //               } else {
  //                 prevState.routes[1].badge++;
  //                 return {
  //                   ...prevState,
  //                   routes: prevState.routes,
  //                 };
  //               }
  //             } else return {...prevState};
  //           });
  //           return;
  //         }
  //       }
  //     });
  //   database()
  //     .ref('messages')
  //     .on('value', (snapshot) => {
  //       const value = snapshot.val();
  //       if (!!value) {
  //         dispatch(setMessages(Object.values(value)));
  //       }
  //       mount.current = false;
  //     });
  // }, []);

  return (
    <Styled.BottomNavigation
      navigationState={state}
      onIndexChange={_handleIndexChange}
      renderScene={_renderScene}
    />
  );
};

export default HomeBottomNavigationBar;
