import React from 'react';
import {ScrollView, View} from 'react-native';
import {Card, Title, List, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

// Components
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../components/CustomBtn';

// Actions
import {logoutUser} from '../src/actions/actions_firebase';
import {useDispatch, useSelector} from 'react-redux';

const ProfileScreen = () => {
  const {user} = useSelector((res) => res.FirebaseReducer.currentUser);
  const {roundness} = useSelector((res) => res.ThemeReducer.theme);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const logout = async () => {
    dispatch({type: 'LOGOUT'});
    await navigate('Authentication');
    await logoutUser();
  };

  const dateValue = new Date(user.metadata.creationTime);
  const time = `${dateValue.getDate()}-${dateValue.getMonth()}-${dateValue.getFullYear()} ${dateValue.getHours()}:${dateValue.getUTCMinutes()}`;

  return (
    <ScrollView>
      <View style={{paddingHorizontal: 30}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Avatar.Image source={{uri: user.photoURL}} size={160} />
          <Title style={{marginVertical: 18, fontSize: 26}}>
            {user.displayName}
          </Title>

          {/* EditProfile */}
          {/* <View style={{flexDirection: 'row', marginBottom: 14}}>
            <Button
              mode="contained"
              style={{flex: 1, justifyContent: 'center', marginRight: 10}}
              uppercase={false}>
              Edit Profile
            </Button>
            <Button
              mode="outlined"
              style={{justifyContent: 'center'}}
              children={<Icons name="dots-horizontal" size={16} />}></Button>
          </View> */}

        </View>
        <Card style={{roundness}}>
          <Card.Content>
            <View>
              <View style={{position: 'relative'}}>
                <List.Item title="UID" description={user.uid} />
                <List.Item
                  title="Username"
                  description={user.email.split('@wicket.com')[0]}
                />
                <List.Item title="Email" description={user.email} />
                <List.Item title="Creation" description={time} />
              </View>
            </View>
          </Card.Content>
          <Card.Actions></Card.Actions>
        </Card>
        <Button
          mode="contained"
          style={{marginVertical: 10, marginBottom: 50}}
          onPress={logout}>
          Sign out
        </Button>
      </View>
    </ScrollView>
  );
};
export default ProfileScreen;
