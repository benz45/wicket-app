import {useSelector} from 'react-redux';

// Navigation
import {useRoute} from '@react-navigation/native';

export default function useDetailProductScreen() {
  const {
    params: {id},
  } = useRoute();

  const {realtimeDatabase} = useSelector((store) => store.FirebaseReducer);
  const {
    user: {displayName: _displayName},
  } = useSelector((store) => store.CurrentUserReducer);

  // Validate data.
  const _keyList = realtimeDatabase.filter((find) => {
    return find.key == id;
  });

  return {_keyList, _displayName};
}
