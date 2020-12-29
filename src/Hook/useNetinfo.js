import {useEffect, useRef} from 'react';
import NetInfo from '@react-native-community/netinfo';

// Redux
import {useDispatch} from 'react-redux';
import {FETCH_NETINFO} from 'root/src/actionsType';

const useNetinfo = () => {
  const dispatch = useDispatch();
  const firstLoad = useRef(true);

  useEffect(() => {
    NetInfo.configure({
      reachabilityUrl: 'https://www.google.co.th/',
      reachabilityTest: async (response) => response.status === 204,
      reachabilityLongTimeout: 10 * 1000, // 60s
      reachabilityShortTimeout: 3 * 1000, // 5s
      reachabilityRequestTimeout: 15 * 1000, // 15s
    });
    const unsubscribe = NetInfo.addEventListener(({isConnected}) => {
      if (!firstLoad.current) {
        dispatch({type: FETCH_NETINFO, payload: isConnected});
      }
      firstLoad.current = false;
    });
    return unsubscribe;
  }, []);
};

export default useNetinfo;
