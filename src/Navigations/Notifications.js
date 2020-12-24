import React, {useEffect} from 'react';

// Styled
import * as Styled from '../styles/Navigations/Styled_Notifications_Navigations';

// Cloud messaging
import PushNotification from 'react-native-push-notification/';

// Redux
import {useSelector} from 'react-redux';

// Navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Screens
import NotificationScreen from '../screens/NotificationScreen';
import AddNotificationScreen from '../screens/AddNotificationScreen';

const TabTop = createMaterialTopTabNavigator();

const Notification_Navigator = () => {
  const {settingNotification} = useSelector(
    (reducer) => reducer.NotificationReducer,
  );

  useEffect(() => {
    if (!settingNotification) {
      PushNotification.abandonPermissions();
    }
    if (settingNotification) {
      PushNotification.requestPermissions();
    }
  }, [settingNotification]);
  return (
    <React.Fragment>
      {/* Head logo notifications */}
      <Styled.notificationView>
        <Styled.NotificationIcon />
        <Styled.NotificationText>Natifications</Styled.NotificationText>
      </Styled.notificationView>
      <Styled.navigatorStyle>
        <TabTop.Screen
          name="notifications"
          component={NotificationScreen}
          options={{title: 'Notifications'}}
        />
        <TabTop.Screen
          name="addNotifications"
          component={AddNotificationScreen}
          options={{title: 'Add notifications'}}
        />
      </Styled.navigatorStyle>
    </React.Fragment>
  );
};

export default Notification_Navigator;
