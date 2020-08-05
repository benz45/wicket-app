import React, {useState, useRef, useEffect} from 'react';
import {View} from 'react-native';
import {Text, RadioButton, IconButton} from 'react-native-paper';

import database from '@react-native-firebase/database';

// Redux
import {useSelector} from 'react-redux';

// Action
import {setStatusAll} from '../../src/actions/actions_firebase';

const barOptions = () => {
  const lengthStatus = useRef(0);
  const arrId = useRef([]);
  const [isStatus, setStatus] = useState('closeAll');
  const {realtimeDatabase: wicketData, lengthData} = useSelector(
    (store) => store.FirebaseReducer,
  );

  //Map id to array from wicketdata.
  arrId.current = wicketData.map((elem) => elem.no);

  // Set value status radio status from wicketdata (globel value) .
  useEffect(() => {
    lengthStatus.current = wicketData.filter((elem) => {
      return elem.status === true;
    });

    if (lengthStatus.current.length == wicketData.length) {
      setStatus('openAll');
    } else if (!lengthStatus.current.length) {
      setStatus('closeAll');
    } else setStatus(null);
  }, [wicketData]);

  // Set status open all.
  const _setOpenAll = () => {
    setStatus('openAll');
    setStatusAll(arrId.current, true);
  };

  // Set status close all.
  const _setCloseAll = () => {
    setStatus('closeAll');
    setStatusAll(arrId.current, false);
  };

  return (
    <View style={{flexDirection: 'row'}}>
      {lengthData ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 16,
            }}>
            <RadioButton
              value="openAll"
              status={
                isStatus == 'openAll'
                  ? 'checked'
                  : isStatus == 'closeAll'
                  ? 'unchecked'
                  : null
              }
              onPress={_setOpenAll}
            />

            <Text>Open all</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 16,
            }}>
            <RadioButton
              value="closeAll"
              status={
                isStatus == 'closeAll'
                  ? 'checked'
                  : isStatus == 'openAll'
                  ? 'unchecked'
                  : null
              }
              onPress={_setCloseAll}
            />
            <Text>Close all</Text>
          </View>
        </>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 16,
          }}>
          <IconButton icon="alert-circle-outline" />
          <Text>Please add wicket before use function</Text>
        </View>
      )}
    </View>
  );
};

export default barOptions;
