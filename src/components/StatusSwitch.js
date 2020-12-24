import React, {useRef, useEffect} from 'react';
import {Switch} from 'react-native-paper';
import {action_updateDoorStatus} from 'root/src/actions/actions_firebase';
import {useSelector} from 'react-redux';

const StatusSwitch = ({id, status}) => {
  const isEnable = useRef(status);
  const {
    user: {displayName},
  } = useSelector((store) => store.CurrentUserReducer);

  const toggleSwitch = async () => {
    isEnable.current = !isEnable.current;
    await action_updateDoorStatus(id, isEnable.current, displayName);
  };

  useEffect(() => {
    isEnable.current = status;
  }, [status]);

  return <Switch onValueChange={toggleSwitch} value={isEnable.current} />;
};

export default StatusSwitch;
