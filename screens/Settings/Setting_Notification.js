import React from 'react';
import {View} from 'react-native';
import {List, Card} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
// Component
import Switch from '../../components/CustomSwitch';
import {
  SETTING_MESSAGE,
  SETTING_NOTIFICATION,
  SETTING_STATUS,
} from '../../src/actionsType';

const CardSettings = () => {
  const {settingNotification, settingStatus, settingMessage} = useSelector(
    ({NotificationReducer}) => NotificationReducer,
  );
  const dispatch = useDispatch();

  const _onChanged_settingNotification = (value) => {
    dispatch({type: SETTING_NOTIFICATION, payload: value});
  };
  const _onChanged_settingStatus = (value) => {
    dispatch({type: SETTING_STATUS, payload: value});
  };
  const _onChanged_settingMessage = (value) => {
    dispatch({type: SETTING_MESSAGE, payload: value});
  };

  return (
    <View style={{marginHorizontal: 30, marginVertical: 20}}>
      <Card>
        <List.Item
          title="Notification"
          left={() => <List.Icon icon="bell-ring" />}
          right={() => (
            <Switch
              value={settingNotification}
              callbackValue={(value) => _onChanged_settingNotification(value)}
            />
          )}
        />
        <List.Item
          title="Status"
          right={() => (
            <Switch
              value={settingStatus}
              callbackValue={(value) => _onChanged_settingStatus(value)}
            />
          )}
        />
        <List.Item
          title="Messages"
          right={() => (
            <Switch
              value={settingMessage}
              callbackValue={(value) => _onChanged_settingMessage(value)}
            />
          )}
        />
      </Card>
    </View>
  );
};

const Setting_Notification = () => {
  return <CardSettings />;
};

export default Setting_Notification;
