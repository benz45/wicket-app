import React, {useRef, useEffect} from 'react';
import {Switch} from 'react-native-paper';
import {action_updateDoorStatus} from '../src/actions/actions_firebase';
import {useDispatch} from 'react-redux';

const StatusSwitch = (props) => {
  const dispatch = useDispatch();
  const isEnable = useRef(props.status)

  const toggleSwitch = async () => {
    isEnable.current = !isEnable.current 
    await dispatch(action_updateDoorStatus(props.no, isEnable.current));
  };

  useEffect(()=> {
    isEnable.current = props.status
  }, [props.status])
  
  return (
    <Switch {...props} onValueChange={toggleSwitch} value={isEnable.current} />
  );
};

export default StatusSwitch;
