import React, {useEffect, useReducer} from 'react';
import db from '@react-native-firebase/database';

const FETCH_DATA = 'FETCH_DATA';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';

const reducer = (state, {type, payload}) => {
  switch (type) {
    case FETCH_DATA:
      return {...state, isLoading: true};
    case FETCH_DATA_SUCCESS:
      return {...state, isLoading: false, datas: payload};
    default:
      throw new Error();
  }
};
export default function useHistoryScreen(key) {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    datas: [],
  });

  useEffect(() => {
    dispatch({type: FETCH_DATA});
    const req = db()
      .ref(`door/historys/${key}`)
      .limitToLast(13)
      .on('value', (snap) => {
        let newArr = [];
        snap.forEach((res) => {
          let elem = res.val();
          elem.id = res.key;
          newArr.push(elem);
        });

        if (newArr.length) {
          dispatch({type: FETCH_DATA_SUCCESS, payload: newArr});
        }
      });

    return () => {
      db().ref(`door/historys/${key}`).off('value', req);
    };
  }, [key]);

  return [state];
}
