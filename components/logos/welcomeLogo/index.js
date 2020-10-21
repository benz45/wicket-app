import React from 'react';

//Styled
import {
  HeadText,
  SubText,
  Logo,
} from '../../../styles/components/Styled_welcomeLogo';

export const WelcomeLogo = () => {
  return (
    <React.Fragment>
      <Logo source={require('../../../assets/logo.png')} />
      <HeadText>Wicket</HeadText>
      <SubText>Welcomde to my app Wicket List</SubText>
    </React.Fragment>
  );
};
