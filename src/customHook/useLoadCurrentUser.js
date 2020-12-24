import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {action_loadCurrentUser} from 'root/src/actions/actions_firebase';

export default function useLoadCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action_loadCurrentUser());
  }, []);
}
