import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {LOAD_CURRENT_USER_FIREBASE} from 'root/src/actionsType';

export default function useLoadCurrentUser() {
  const dispatch = useDispatch();

  const onAuthStateChanged = (user) => {
    if (user) {
      dispatch({type: LOAD_CURRENT_USER_FIREBASE, payload: user});
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
}
