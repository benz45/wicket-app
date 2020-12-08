import React from 'react';
import {useNavigation} from '@react-navigation/native';

// Styled
import * as Styled from '../styles/screens/Styled_ProfileScreen';

// Actions
import {logoutUser} from '../src/actions/actions_firebase';
import {useDispatch, useSelector} from 'react-redux';
import useUserOnline from '../src/customHook/useUserOnline';
import {RESET_USER_CONNECTION, USER_LOGOUT} from '../src/actionsType';

const ProfileScreen = () => {
  const {user} = useSelector((res) => res.CurrentUserReducer);
  const dispatch = useDispatch();
  const userOnline = useUserOnline();
  const {navigate} = useNavigation();

  const logout = async () => {
    await userOnline.userDisconnect();
    await dispatch({type: USER_LOGOUT});
    await dispatch({type: RESET_USER_CONNECTION});
    await navigate('Authentication');
    await logoutUser();
  };

  const dateValue = new Date(user.metadata.creationTime);
  const time = `${dateValue.getDate()}-${dateValue.getMonth()}-${dateValue.getFullYear()} ${dateValue.getHours()}:${dateValue.getUTCMinutes()}`;

  return (
    <Styled.MainContainer>
      <Styled.ContainerImage>
        <Styled.Image source={{uri: user.photoURL}} />
      </Styled.ContainerImage>
      <Styled.Title>{user.displayName}</Styled.Title>
      <Styled.Card>
        <Styled.Card.Content>
          <Styled.ListId title="ID" description={user.uid} />
          <Styled.ListUsername
            title="Username"
            description={user.email.split('@wicket.com')[0]}
          />
          <Styled.ListEmail title="Email" description={user.email} />
          <Styled.ListCreation title="Creation" description={time} />
        </Styled.Card.Content>
      </Styled.Card>
      <Styled.BtnLogout onPress={logout}>Sign out</Styled.BtnLogout>
    </Styled.MainContainer>
  );
};
export default ProfileScreen;
