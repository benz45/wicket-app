import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

// Styled
import * as Styled from 'root/src/Styles/Screens/Styled_ProfileScreen';

// Actions
import {logoutUser} from 'root/src/Actions/actions_firebase';
import {useDispatch, useSelector} from 'react-redux';
import useUserOnline from 'root/src/Hook/useUserOnline';
import {RESET_USER_CONNECTION, USER_LOGOUT} from 'root/src/actionsType';

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useSelector((res) => res.CurrentUserReducer);
  const dispatch = useDispatch();
  const userOnline = useUserOnline();
  const {navigate} = useNavigation();

  const logout = async () => {
    await setIsLoading(true);
    await userOnline.userDisconnect();
    await dispatch({type: USER_LOGOUT});
    await dispatch({type: RESET_USER_CONNECTION});
    await navigate('Authentication');
    await logoutUser();
  };

  const dateValue = new Date(user.metadata.creationTime);
  const time = `${dateValue.getDate()}-${
    dateValue.getMonth() + 1
  }-${dateValue.getFullYear()} ${dateValue.getHours()}:${
    dateValue.getUTCMinutes().toString().length < 2
      ? `0${dateValue.getUTCMinutes()}`
      : dateValue.getUTCMinutes()
  }`;

  useEffect(
    () => () => {
      setIsLoading(false);
    },
    [logoutUser],
  );

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
      <Styled.BtnLogout loading={isLoading} onPress={logout}>
        Sign out
      </Styled.BtnLogout>
    </Styled.MainContainer>
  );
};
export default ProfileScreen;
