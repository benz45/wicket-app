import {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {action_setMessages} from '../../src/actions/actions_firebase';

export default function useMessageScreen() {
  const {user, messagesData} = useSelector((reducer) => {
    return {
      ...reducer.FirebaseReducer.currentUser,
      ...reducer.FirebaseReducer.messages,
    };
  });

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

  const _sortMessages = () => {
    if (messagesData) {
      return messagesData.sort((a, b) => {
        if (a.timestamp > b.timestamp) return -1;
        if (b.timestamp > a.timestamp) return 1;
        return 0;
      });
    } else [];
  };

  return {_onSend, _sortMessages};
}
