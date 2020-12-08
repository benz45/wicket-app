import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Text, Avatar, Checkbox} from 'react-native-paper';
import {H1, H4} from '../styles/styled';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/CustomButton';

// Actions
import useLoadCurrentUser from '../src/customHook/useLoadCurrentUser';

//Redux
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {LOAD_CURRENT_USER_FIREBASE} from '../src/actionsType';

const RegisterComplate = () => {
  const {accent} = useSelector((reducer) => reducer.ThemeReducer.theme.colors);
  const [isCheckbox, setCheckbox] = useState(false);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    auth().onUserChanged((user) => {
      if (user) {
        dispatch({type: LOAD_CURRENT_USER_FIREBASE, payload: user});
      }
    });
  }, []);

  const submit = async () => {
    navigate('Authenticated');
  };

  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Avatar.Icon
          size={70}
          style={{marginVertical: 10}}
          icon="check-bold"
          color={accent}
        />
        <H1>Register complate</H1>
        <H4>Welcomde to my app Wicket List</H4>
        <View>
          {/* <View style={{marginVertical: 10}}>
              <Text>Name : {name}</Text>
              <Text>Email : {email}</Text>
            </View> */}
          <Text style={{marginVertical: 10}}>
            Can break usage such as persisting and restoring state. This might
            happen if you passed non-serializable values such as function, class
            instances etc. in params.
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox.Android
            status={isCheckbox ? 'checked' : 'unchecked'}
            onPress={() => setCheckbox(!isCheckbox)}
          />
          <Text>Accept terms persisting and restoring state.</Text>
        </View>

        <Button
          disabled={!isCheckbox}
          mode="contained"
          icon="check-bold"
          dark={true}
          onPress={submit}>
          Successful
        </Button>
      </View>
    </View>
  );
};

export default RegisterComplate;
