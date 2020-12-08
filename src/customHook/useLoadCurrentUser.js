import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

import {action_loadCurrentUser} from '../../src/actions/actions_firebase';

export default function useLoadCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action_loadCurrentUser());
  }, []);
}
