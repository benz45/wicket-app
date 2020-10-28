import React, {useReducer, useEffect} from 'react';
import {Portal, Dialog, RadioButton} from 'react-native-paper';
import {Platform} from 'react-native';

// Push Notification
import PushNotification from 'react-native-push-notification/';

// Redux
import {useDispatch} from 'react-redux';
import {action_setNotification} from '../../src/actions/actions_notification';

const TURNON_RADIO_REPEAT = 'TURNON_RADIO_REPEAT';
const TURNOFF_RADIO_REPEAT = 'TURNOFF_RADIO_REPEAT';
const SET_NAME = 'SET_NAME';
const SET_REPEAT = 'SET_REPEAT';
const CLEAR = 'CLEAR';

const initialState = {
  isRadioRepeat: false,
  name: '',
  repeat: 'day',
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case TURNON_RADIO_REPEAT:
      return {...state, isRadioRepeat: true};
    case TURNOFF_RADIO_REPEAT:
      return {...state, isRadioRepeat: false};
    case SET_NAME:
      return {...state, name: payload};
    case SET_REPEAT:
      return {...state, repeat: payload, isRadioRepeat: false};
    case CLEAR:
      return Object.assign({}, initialState);
    default:
      throw new Error();
  }
};

export default function useAddNotificationScreen() {
  const dispatchRedux = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);

  const _turnOnRadioRepeat = () => {
    dispatch({type: TURNON_RADIO_REPEAT});
  };

  const _turnOffRadioRepeat = () => {
    dispatch({type: TURNOFF_RADIO_REPEAT});
  };

  const _setName = (value) => {
    dispatch({type: SET_NAME, payload: value});
  };

  // Radio check
  const _radioChange = (value) => {
    dispatch({type: SET_REPEAT, payload: value});
  };

  /**
   * Use function.
   * @property `fullTime`
   *
   * @example _addNoti({fullTime: time<Date>})
   */
  const _addNoti = async ({fullTime}) => {
    try {
      const OS = (value) => Platform.OS === value;
      const objNoti = {
        id: new Date(fullTime).getTime(),
        foreground: true, // BOOLEAN: If the notification was received in foreground or not
        title: 'Wicket',
        message: state.name,
        date: fullTime,
        repeatType: state.repeat !== 'once' && state.repeat,
        actions: OS('android') && ['Close all', 'Open all'], // Android only.
        invokeApp: false, // Android only.
        largeIcon: 'ic_launcher_transform', // Android only.
        smallIcon: 'ic_launcher_transform', // Android only.
      };
      await PushNotification.localNotificationSchedule(objNoti);
      dispatchRedux(action_setNotification(objNoti));
      dispatch({type: CLEAR});
      return;
    } catch (err) {
      console.log('err' + err);
    }
  };

  const _dialogRadioRepeat = () => {
    return (
      <Portal>
        <Dialog
          visible={state.isRadioRepeat}
          onDismiss={() => _turnOffRadioRepeat()}>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={(res) => _radioChange(res)}
              value={state.repeat}>
              <RadioButton.Item label="Dialy" value="day" />
              <RadioButton.Item label="Once" value="once" />
              <RadioButton.Item label="Time 1s (Test)" value="time" />
            </RadioButton.Group>
          </Dialog.Content>
        </Dialog>
      </Portal>
    );
  };

  return {
    state,
    _setName,
    _addNoti,
    _turnOnRadioRepeat,
    _dialogRadioRepeat,
  };
}
