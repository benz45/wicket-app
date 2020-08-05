import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  TextInput,
  Text,
  Subheading,
  Divider,
  List,
  Colors,
  IconButton,
  Portal,
  Dialog,
  RadioButton,
} from 'react-native-paper';

// Styled
import {H2, H4} from '../styles/styled';

// Cloud messaging
import PushNotification from 'react-native-push-notification/';

// DateTime
import DateTimePicker from '@react-native-community/datetimepicker';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {action_setNavigation} from '../src/actions/actions_notification';

// Component
import Button from '../components/CustomButton';

// Navigations
import {useNavigation, TabActions} from '@react-navigation/native';
import {SetAllStatus} from '../src/actions/actions_firebase';

const AddNotificationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {primary, accent} = useSelector(
    (reducer) => reducer.ThemeReducer.theme.colors,
  );
  const {settingNotification, notificationData} = useSelector(
    (reducer) => reducer.NotificationReducer,
  );

  const [showTime, setShowTime] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [dialogSuccessful, setDialogSuccessful] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [description, setDescription] = useState('');
  const [repeat, setRepeat] = useState('Dialy');

  // Validate minutes
  const minutes = date.getMinutes().toString();
  const resMinutes = minutes.length == 1 ? `0${minutes}` : minutes;

  const hour = date.getHours().toString();
  const resHour = hour.length == 1 ? `0${hour}` : hour;

  // Data time change
  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowTime(false);
    setDate(currentDate);
  };

  // Show Time
  const _onShowTime = () => {
    setShowTime(true);
  };

  // Dialog
  const _showDialog = () => setDialog(true);
  const _hideDialog = () => setDialog(false);

  // Dialog successful.
  const _showDialogSuccessful = () => setDialogSuccessful(true);
  const _hideDialogSuccessful = () => setDialogSuccessful(false);

  // Radio check
  const radioChange = (value) => {
    setRepeat(value);
    _hideDialog();
  };

  // Clear State
  const _clearState = () => {
    setDescription('');
    setRepeat('Dialy');
  };

  // JumpTo
  const _jumpToNotification = () => {
    _hideDialogSuccessful();
    navigation.dispatch(TabActions.jumpTo('notifications'));
  };

  const _addNotification = () => {
    // Data to rudux
    const data = {
      id: `${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getMilliseconds()}`,
      time: `${resHour} : ${resMinutes} ${date.getHours() >= 12 ? 'PM' : 'AM'}`,
      largeIcon: 'ic_launcher_transform',
      smallIcon: 'ic_launcher_transform',
      title: 'Wicket',
      date: date,
      message: description,
      repeatType: repeat === 'Dialy' ? 'day' : null,
      actions: ['Close all', 'Open all'],
      invokeApp: false,
    };
    dispatch(action_setNavigation(data));

    PushNotification.localNotificationSchedule(data);
    _showDialogSuccessful();
    _clearState();
  };
  PushNotification.configure({
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
      notification.action === 'Open all'
        ? SetAllStatus(true)
        : SetAllStatus(false);
    },
  });

  return (
    <View
      style={{
        marginVertical: 40,
        marginHorizontal: 40,
        justifyContent: 'center',
      }}>
      <View style={{alignItems: 'center', marginVertical: 15}}>
        <TouchableOpacity onPress={_onShowTime}>
          <Text
            style={{
              fontSize: 70,
            }}>{`${resHour} : ${resMinutes}`}</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={description}
        label="Title"
        onChange={(e) => setDescription(e.nativeEvent.text)}
      />
      <View style={{marginVertical: 30}}>
        <Subheading style={{fontSize: 12, color: primary}}>OTHER</Subheading>
        <Divider />
        <List.Item
          title="Repeat"
          right={() => (
            <TouchableOpacity
              onPress={_showDialog}
              style={{flexDirection: 'row'}}>
              <List.Subheader style={{color: accent}}>
                {repeat == 'Dialy' ? 'Daily' : 'Once'}
              </List.Subheader>
              <IconButton
                icon="chevron-right"
                style={{marginHorizontal: -17}}
                color={accent}
              />
            </TouchableOpacity>
          )}
        />
        <Button
          mode="contained"
          style={{marginVertical: 24}}
          onPress={_addNotification}>
          Add Notification
        </Button>

        {/* Dialog Successful */}
        <Portal>
          <Dialog
            visible={dialogSuccessful}
            onDismiss={_hideDialogSuccessful}
            style={{bottom: 0}}>
            <Dialog.Content>
              <View style={{alignItems: 'center'}}>
                <IconButton
                  icon="checkbox-marked-circle-outline"
                  color={Colors.green400}
                  size={50}
                />
                <H2>Insert successful</H2>
                <H4 style={{color: '#757575'}}>
                  Lorem ipsum odor amet, consectetuer.
                </H4>
              </View>
            </Dialog.Content>
            <Dialog.Actions style={{justifyContent: 'space-between'}}>
              <Button onPress={_jumpToNotification}>Notifications</Button>
              <Button onPress={_hideDialogSuccessful}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Dialog Repeat */}
        <Portal>
          <Dialog visible={dialog} onDismiss={_hideDialog} style={{bottom: 0}}>
            <Dialog.Content>
              <RadioButton.Group onValueChange={radioChange} value={repeat}>
                <RadioButton.Item label="Once" value="Once" />
                <RadioButton.Item label="Dialy" value="Dialy" />
              </RadioButton.Group>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
      {showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          textColor="red"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default AddNotificationScreen;
