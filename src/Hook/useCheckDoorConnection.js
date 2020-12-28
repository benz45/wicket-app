import {useMemo, useRef} from 'react';

import {useSelector} from 'react-redux';
import {
  action_checkConnection,
  action_setConnection,
} from 'root/src/Actions/actions_firebase';

export default function useCheckDoorConnection() {
  const prevState = useRef([]);
  const {realtimeDatabase} = useSelector((reducer) => reducer.FirebaseReducer);

  useMemo(() => {
    const _setPrev = async () => {
      await action_checkConnection().then((snap) => {
        prevState.current = snap;
      });
    };
    _setPrev();
    const _loopCheckConnection = () => {
      setInterval(() => {
        action_checkConnection().then(async (snap) => {
          const compareConnection_StatesAndPrevState = await snap.filter(
            (elemStates) => {
              for (let {state} of prevState.current) {
                if (elemStates.state === state) {
                  return elemStates.key;
                }
              }
            },
          );

          // find array if connnection app.
          const findKeyEqualRealtimeDatabase = await compareConnection_StatesAndPrevState.filter(
            (elemCompareConnection) => {
              for (let {key} of realtimeDatabase) {
                if (elemCompareConnection.key === key) {
                  return elemCompareConnection.key;
                }
              }
            },
          );

          // if (!!findKeyEqualRealtimeDatabase.length) {
          await findKeyEqualRealtimeDatabase.map(({key}) =>
            action_setConnection(key, false),
          );
          prevState.current = findKeyEqualRealtimeDatabase;
          // }
        });
      }, 20000);
    };
    _loopCheckConnection();
  }, []);
}
