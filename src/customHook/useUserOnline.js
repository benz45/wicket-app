import {useEffect} from 'react';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {FETCH_USER_CONNECTION_SUCCESS} from '../../src/actionsType';

// Netinfo
import {useNetInfo} from '@react-native-community/netinfo';

// Database
import db from '@react-native-firebase/database';

export default function useUserOnline() {
  const {currentUser} = useSelector((reducer) => reducer.FirebaseReducer);
  const state = useSelector((reducer) => reducer.UserConnectionReducer);
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  const reference = db().ref(`/online/user/${currentUser.user.uid}`);

  const _fetch_userOnline = async () => {
    try {
      await db()
        .ref('online/user')
        .on('value', (snapshot) => {
          if (!!snapshot.val()) {
            dispatch({
              type: FETCH_USER_CONNECTION_SUCCESS,
              payload: snapshot.val(),
            });
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  // Check user online and set offline if user go out application.
  useEffect(() => {
    // Set the /users/:userId value to true
    if (!!currentUser.user) {
      reference.set({
        photoURL: currentUser.user.photoURL,
        email: currentUser.user.email,
        displayName: currentUser.user.displayName,
        uid: currentUser.user.uid,
      });
    }

    // Remove the node whenever the client disconnects.
    return () => reference.onDisconnect().remove();
  }, [netInfo]);

  return {
    state,
    fetchUserOnline: () => _fetch_userOnline(),
    userDisconnect: () => reference.remove(),
  };
}
