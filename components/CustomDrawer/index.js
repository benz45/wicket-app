import React from 'react';

import {Divider} from 'react-native-paper';

// React Navigations
import {DrawerItemList} from '@react-navigation/drawer';

// Styled
import * as Styled from '../../styles/components/Styled_CustomDrawer';

// Actions
import {useSelector} from 'react-redux';
import SwitchDarkMode from '../SwitchDarkMode';

const HeadComponent = () => (
  <Styled.HeadComponent>
    <Styled.HeadImage source={require('../../assets/logo.png')} />
    <Styled.HeadText>Wicket</Styled.HeadText>
  </Styled.HeadComponent>
);

// Test show information username
// const UerInfoComponent = () => {
//   const {user} = useSelector((res) => res.FirebaseReducer.currentUser);
//   return (
//     <Styled.UserInfoComponent>
//       <Styled.AvatarImage source={{uri: user.photoURL}} />
//       <Styled.Info>
//         <Styled.DisplayName>{user.displayName}</Styled.DisplayName>
//         <Styled.Email>{user.email}</Styled.Email>
//       </Styled.Info>
//     </Styled.UserInfoComponent>
//   );
// };

const ThemeComponent = () => {
  const {theme} = useSelector((res) => res.ThemeReducer);

  return (
    <Styled.ThemeContainer>
      <Styled.ThemeInfo>
        <Styled.ThemeText>Theme</Styled.ThemeText>
        <Styled.ThemeCaption>
          {theme.theme === 'dark' ? 'Dark' : 'Light'}
        </Styled.ThemeCaption>
      </Styled.ThemeInfo>
      <Styled.SwitchTheme>
        <SwitchDarkMode />
      </Styled.SwitchTheme>
    </Styled.ThemeContainer>
  );
};

const CustomDrawer = (props) => {
  const {sysDefault} = useSelector((res) => res.ThemeReducer);
  return (
    <Styled.DWcontentScroll {...props}>
      <Styled.DWcontainerHead icon={HeadComponent} />
      {/* Test show information username */}
      {/* <Styled.DWuserInfo icon={UerInfoComponent} /> */}
      {!sysDefault && <Styled.DWtheme label={ThemeComponent} />}
      <Divider style={{color: '#000000', margin: 15}} />
      <DrawerItemList {...props} />
    </Styled.DWcontentScroll>
  );
};

export default CustomDrawer;
