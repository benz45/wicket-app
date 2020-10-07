import React, {useState} from 'react';
import {Switch} from 'react-native-paper';

const CustomSwitch = (props) => {
  const [isEnabled, setEnabled] = useState(true);

  const toggleSwitch =() => {
      setEnabled((prevState) => !prevState);
      props.callbackValue(!isEnabled)
    }
    
  return <Switch {...props} onValueChange={toggleSwitch} />;
};

export default CustomSwitch;
