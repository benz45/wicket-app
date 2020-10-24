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
// import {SetAllStatus} from '../src/actions/actions_firebase';

const AddNotificationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {accent} = useSelector((reducer) => reducer.ThemeReducer.theme.colors);

  const [showTime, setShowTime] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [dialogSuccessful, setDialogSuccessful] = useState(false);
  const [dialogWarning, setDialogWarning] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [description, setDescription] = useState('');
  const [repeat, setRepeat] = useState('Dialy');

  // Validate minutes
  const hour = date.getHours().toString();
  const resHour = hour.length == 1 ? `0${hour}` : hour;
  const minutes = date.getMinutes().toString();
  const resMinutes = minutes.length == 1 ? `0${minutes}` : minutes;

  // Data time change
  const _onChange = (_, selectedDate) => {
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

  // Dialog Warning.
  const _showDialogWarning = () => setDialogWarning(true);
  const _hideDialogWarning = async () => {
    await setDialogWarning(false);
    await setDialogSuccessful(true);
  };

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

  // Used for dispatch, and push notification and clear state description reqeat.
  // Will be used after varidate date in _addNotification function.
  const _dispatch_addNotification = (objData) => {
    PushNotification.localNotificationSchedule(objData);

    // const test = (objData.date = `${objData.date}`);
    console.log(new Date(new Date(objData.fireDate)));

    dispatch(action_setNavigation(objData));
    _clearState();
  };

  const _addNotification = () => {
    // Make data dispatch to store NotificationReducer and push notification.
    const data = {
      foreground: true,
      id: `${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getMilliseconds()}`,
      time: `${resHour} : ${resMinutes} ${date.getHours() >= 12 ? 'PM' : 'AM'}`,
      largeIcon: 'ic_launcher_transform',
      smallIcon: 'ic_launcher_transform',
      title: 'Wicket',
      //TODO If date many over to do add time next a day.
      date:
        date >= new Date(Date.now())
          ? date
          : new Date(new Date(date).getTime() + 60 * 60 * 24 * 1000),
      message: description,
      repeatType: repeat === 'Dialy' ? 'day' : null,
      actions: ['Close all', 'Open all'],
      invokeApp: false,
    };

    if (date >= new Date(Date.now())) {
      _dispatch_addNotification(data);
      _showDialogSuccessful();
    } else {
      _dispatch_addNotification(data);
      _showDialogWarning();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 40,
        justifyContent: 'center',
      }}>
      {/* Time selector */}
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <TouchableOpacity onPress={_onShowTime}>
          <Text
            style={{
              fontSize: 70,
            }}>{`${resHour} : ${resMinutes}`}</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: 25}}>
        {/* Input for descriptions. */}
        <TextInput
          style={{marginBottom: 24}}
          value={description}
          label="Title"
          mode="outlined"
          onChange={(e) => setDescription(e.nativeEvent.text)}
        />

        <Divider />

        {/* Selector a repeat. */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>Repeat</Text>
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
        </View>

        {/* Validation button add notification. */}
        {description ? (
          <Button
            mode="contained"
            style={{marginVertical: 24}}
            onPress={_addNotification}>
            Add Notification
          </Button>
        ) : (
          <Button
            mode="contained"
            disabled={true}
            style={{marginVertical: 24}}
            onPress={_addNotification}>
            Add Notification
          </Button>
        )}

        {/*Dialog Successful */}
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

        {/*Dialog warning */}
        <Portal>
          <Dialog
            visible={dialogWarning}
            onDismiss={_hideDialogWarning}
            style={{bottom: 0}}>
            <Dialog.Content>
              <View style={{alignItems: 'center'}}>
                <IconButton
                  icon="progress-clock"
                  color={Colors.yellow400}
                  size={50}
                />
                <H2>Warning</H2>
                <H4 style={{color: '#757575'}}>
                  Lorem ipsum odor amet, consectetuer.
                </H4>
              </View>
            </Dialog.Content>
            <Dialog.Actions style={{justifyContent: 'flex-end'}}>
              <Button onPress={_hideDialogWarning}>Next</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Dialog Repeat. */}
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

      {/* Open native dateTime picker. */}
      {showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="spinner"
          textColor="red"
          onChange={_onChange}
        />
      )}
    </View>
  );
};

export default AddNotificationScreen;
