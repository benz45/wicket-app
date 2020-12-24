import React from 'react';
import {Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {SET_THEME_DARKMODE} from 'root/src/actionsType';

export default function SwitchDarkMode() {
  const {sysDefault, darkMode} = useSelector((store) => store.ThemeReducer);
  const dispatch = useDispatch();

  const toggleSwitch = () => {
    dispatch({type: SET_THEME_DARKMODE, payload: !darkMode});
  };

  return (
    <Switch
      disabled={sysDefault}
      onValueChange={toggleSwitch}
      value={darkMode}
    />
  );
}
