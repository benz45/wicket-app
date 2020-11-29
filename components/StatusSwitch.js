import React, {useRef, useEffect} from 'react';
import {Switch} from 'react-native-paper';
import {action_updateDoorStatus} from '../src/actions/actions_firebase';
import {useDispatch, useSelector} from 'react-redux';

const StatusSwitch = ({id, status}) => {
  const dispatch = useDispatch();
  const isEnable = useRef(status);
  const {
    user: {displayName},
  } = useSelector((store) => store.FirebaseReducer.currentUser);

  const toggleSwitch = async () => {
    isEnable.current = !isEnable.current;
    await dispatch(action_updateDoorStatus(id, isEnable.current, displayName));
  };

  useEffect(() => {
    isEnable.current = status;
  }, [status]);

  return <Switch onValueChange={toggleSwitch} value={isEnable.current} />;
};

export default StatusSwitch;
