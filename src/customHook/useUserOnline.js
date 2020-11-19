import {useReducer, useEffect} from 'react';

// Database
import db from '@react-native-firebase/database';

const initialState = {
  isLoading: false,
  isError: false,
  user: [],
};

const FETCH_DATA = 'FETCH_DATA';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

const reducer = (state, {type, payload}) => {
  switch (type) {
    case FETCH_DATA:
      return {...state, isLoading: true};
    case FETCH_DATA_SUCCESS:
      return {...state, isLoading: false, user: Object.values(payload)};
    case FETCH_DATA_ERROR:
      return {...state, isLoading: false, isError: true};
    default:
      throw new Error();
  }
};

export default function useUserOnline() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const _fetch_userOnline = async () => {
    try {
      await db()
        .ref('online/user')
        .on('value', (snapshot) => {
          if (!!!snapshot.val()) {
            dispatch({type: FETCH_DATA_ERROR});
          }
          dispatch({type: FETCH_DATA_SUCCESS, payload: snapshot.val()});
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    _fetch_userOnline();
  }, []);

  return [state];
}
