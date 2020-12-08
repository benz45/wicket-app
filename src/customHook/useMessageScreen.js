import {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {action_setMessages} from '../../src/actions/actions_firebase';

export default function useMessageScreen() {
  const {user} = useSelector((reducer) => reducer.CurrentUserReducer);

  // Send Messages
  const _onSend = useCallback((newMessages) => {
    newMessages.reduce((accumulator, currentValue) => {
      accumulator = currentValue;
      accumulator.user.username = user.displayName;
      accumulator.createdAt = accumulator.createdAt.toString();
      accumulator.timestamp = Date.now();
      action_setMessages(accumulator);
    }, {});
  }, []);

  return {_onSend};
}
