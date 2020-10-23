import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {
  Switch,
  Divider,
  Text,
  Caption,
  Avatar,
  IconButton,
} from 'react-native-paper';

// React Navigations
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

// Styled
import * as Styled from '../../styles/components/Styled_CustomDrawer';

// Actions
import {setThemeToCacheAndStore} from '../../src/actions/actions_cache';
import {useDispatch, useSelector} from 'react-redux';

const SwitchTheme = ({value, fetching}) => {
  const dispatch = useDispatch();
  const [isEnable, setEnable] = useState(false);

  // First load cache
  useEffect(() => {
    setEnable(value);
  }, [fetching]);

  const toggleSwitch = () => {
    setEnable((prevState) => !prevState);
    dispatch(setThemeToCacheAndStore(!isEnable));
  };

  return <Styled.SwitchTheme onValueChange={toggleSwitch} value={isEnable} />;
};

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
  const {isCacheTheme, isFetching} = useSelector((res) => res.ThemeReducer);

  return (
    <Styled.ThemeContainer>
      <Styled.ThemeInfo>
        <Styled.ThemeText>Theme</Styled.ThemeText>
        <Styled.ThemeCaption>
          {!isCacheTheme ? 'Dark' : 'Light'}
        </Styled.ThemeCaption>
      </Styled.ThemeInfo>
      <SwitchTheme value={isCacheTheme} fetching={isFetching} />
    </Styled.ThemeContainer>
  );
};

const CustomDrawer = (props) => {
  return (
    <Styled.DWcontentScroll {...props}>
      <Styled.DWcontainerHead icon={HeadComponent} />
      {/* Test show information username */}
      {/* <Styled.DWuserInfo icon={UerInfoComponent} /> */}
      <Styled.DWtheme label={ThemeComponent} />
      <Divider style={{color: '#000000', marginBottom: 15}} />
      <DrawerItemList {...props} />
    </Styled.DWcontentScroll>
  );
};

export default CustomDrawer;
