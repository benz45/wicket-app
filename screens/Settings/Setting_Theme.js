import React from 'react';
import {SET_THEME_SYSDEFAULT} from '../../src/actionsType';

// Styled
import * as Styled from '../../styles/screens/Settings/Styled_Setting_Theme';
import {useSelector, useDispatch} from 'react-redux';
import SwitchDarkMode from '../../components/SwitchDarkMode';

const SwitchThemeSysDefault = () => {
  const {sysDefault} = useSelector((store) => store.ThemeReducer);
  const dispatch = useDispatch();

  const toggleSwitch = () => {
    dispatch({type: SET_THEME_SYSDEFAULT});
  };

  return <Styled.SwitchTheme onValueChange={toggleSwitch} value={sysDefault} />;
};

const Setting_Theme = () => {
  return (
    <Styled.MainContainer>
      <Styled.ListSectionDefaultSys>
        <Styled.ListItemsDefaultSys right={() => <SwitchThemeSysDefault />} />
      </Styled.ListSectionDefaultSys>
      <Styled.ListSectionManual>
        <Styled.ListItemsManual right={() => <SwitchDarkMode />} />
      </Styled.ListSectionManual>
    </Styled.MainContainer>
  );
};

export default Setting_Theme;
