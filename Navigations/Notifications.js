import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {List, Text, Switch, FAB, IconButton} from 'react-native-paper';

// Styled
import * as Styled from '../styles/Navigations/Styled_Notifications_Navigations';

// Cloud messaging
import PushNotification from 'react-native-push-notification/';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {
  action_settingNotification,
  action_settingStatus,
  action_settingMessage,
} from '../src/actions/actions_notification';

// Navigate
import {useNavigation} from '@react-navigation/native';

// Navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Screens
import NotificationScreen from '../screens/NotificationScreen';
import AddNotificationScreen from '../screens/AddNotificationScreen';

const TabTop = createMaterialTopTabNavigator();

const Notification_Navigator = () => {
  const dispatch = useDispatch();
  const {colors} = useSelector((reducer) => reducer.ThemeReducer.theme);
  const {settingNotification, settingStatus, settingMessage} = useSelector(
    (reducer) => reducer.NotificationReducer,
  );
  const [handlePress, setHandlePress] = useState(false);
  const [notification, setNotification] = useState(settingNotification);
  const [status, setStatus] = useState(settingStatus);
  const [messages, setMessages] = useState(settingMessage);

  const _setNotification = () => {
    setNotification((prev) => !prev);
    dispatch(action_settingNotification(!notification));
  };
  const _setStatus = () => {
    setStatus((prev) => !prev);
    dispatch(action_settingStatus(!status));
  };
  const _setMessages = () => {
    setMessages((prev) => !prev);
    dispatch(action_settingMessage(!messages));
  };
  const _handlePress = () => setHandlePress((prevState) => !prevState);

  useEffect(() => {
    if (!settingNotification) {
      PushNotification.abandonPermissions();
    }
    if (settingNotification) {
      PushNotification.requestPermissions();
    }
  }, [settingNotification]);
  return (
    <>
      {/* List switch setting notifications. */}
      <List.Section>
        <List.Accordion
          title="Settings"
          titleStyle={{
            alignSelf: 'flex-end',
            fontSize: 13,
            color: colors.text,
          }}
          left={() => (
            // Head logo notifications
            <Styled.NotificationTextContainer>
              <Styled.NotificationIcon color={colors.accent} />
              <Styled.NotificationText color={colors.accent}>
                Natifications
              </Styled.NotificationText>
            </Styled.NotificationTextContainer>
          )}
          expanded={handlePress}
          onPress={() => _handlePress()}>
          <List.Item
            title="Notification"
            right={() => (
              <Switch
                value={settingNotification}
                onValueChange={_setNotification}
              />
            )}
          />
          <List.Item
            title="Status"
            right={() => (
              <Switch
                disabled={!settingNotification}
                value={settingStatus}
                onValueChange={_setStatus}
              />
            )}
          />
          <List.Item
            title="Messages"
            right={() => (
              <Switch
                disabled={!settingNotification}
                value={settingMessage}
                onValueChange={_setMessages}
              />
            )}
          />
        </List.Accordion>
      </List.Section>

      {/* Top tabs notification. */}
      <TabTop.Navigator
        tabBarOptions={{
          indicatorStyle: {backgroundColor: colors.accent},
          labelStyle: {textTransform: 'none'},
        }}>
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
      </TabTop.Navigator>
    </>
  );
};

export default Notification_Navigator;
