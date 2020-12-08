import {useEffect, useReducer, useRef} from 'react';
import db from '@react-native-firebase/database';
// import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SET_MESSAGES} from '../../src/actionsType';
import usePushNotification from './usePushNotification';

const SET_BADGE = 'SET_BADGE';
const RESET_BADGE = 'RESET_BADGE';
const NEW_MESSAGE = 'NEW_MESSAGE';
const SET_LOADSUCCESS = 'SET_LOADSUCCESS';

// const initialState = {
//   badge: 0,
//   isLoadSuccess: false,
//   newMessage: [],
// };

// const reducer = (state, {type, payload}) => {
//   switch (type) {
//     case SET_BADGE:
//       return {...state, badge: state.badge++};
//     case RESET_BADGE:
//       return {...state, badge: 0};
//     case NEW_MESSAGE:
//       return {...state, newMessage: Object.values(payload)};
//     case SET_LOADSUCCESS:
//       return {...state, isLoadSuccess: true};
//     default:
//       throw new Error();
//   }
// };

export default function useMessage() {
  const dispatchRedux = useDispatch();
  const {_pushNotificationBasic} = usePushNotification();
  const FirstLoad = useRef(true);

  // !(For new feature)
  // const isFocus = useIsFocused();
  // const [state, dispatch] = useReducer(reducer, initialState);

  const {user} = useSelector((store) => store.CurrentUserReducer);
  const {settingMessage} = useSelector((store) => store.NotificationReducer);

  const _noti_newMessage = async () => {
    try {
      await db()
        .ref()
        .child('messages')
        .limitToLast(1)
        .on('child_added', (snapshot) => {
          if (!FirstLoad.current) {
            const data_message = snapshot.val();
            if (settingMessage && !!data_message) {
              if (user.email !== data_message.user._id) {
                _pushNotificationBasic({
                  title: data_message.user.username,
                  message: data_message.text,
                });
              }
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const _fetch_MessageData = async () => {
    await db()
      .ref('messages')
      .on('value', (snapshot) => {
        const value = snapshot.val();
        if (!!value) {
          const result = Object.values(value);
          dispatchRedux({type: SET_MESSAGES, payload: result});
          return (FirstLoad.current = false);
        }
      });
  };

  useEffect(() => {
    _fetch_MessageData();
  }, []);

  useEffect(() => {
    if (!FirstLoad.current) {
      _noti_newMessage();
    }
  }, [FirstLoad.current]);
}
