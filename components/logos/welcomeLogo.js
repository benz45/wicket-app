import React from 'react';

//Styled
import {Text, LogoApp} from '../../styles/styled';

export const WelcomeLogo = () => {
  return (
    <>
      <LogoApp source={require('../../assets/logo.png')} />
      <Text ta="center" tt="uppercase" pv="10" pt={14} fs={22}>
        Wicket
      </Text>
      <Text ta="center">Welcomde to my app Wicket List</Text>
    </>
  );
};
