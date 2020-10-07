import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, Avatar, Checkbox} from 'react-native-paper';
import {H1, H4} from '../styles/styled';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/CustomButton';

// Actions
import {action_loadCurrentUser_firebase} from '../src/actions/actions_firebase';

//Redux
import {useDispatch, useSelector} from 'react-redux';

const RegisterComplate = () => {
  const dispatch = useDispatch();
  const {accent} = useSelector((reducer) => reducer.ThemeReducer.theme.colors);
  const [isCheckbox, setCheckbox] = useState(false);
  const {navigate} = useNavigation();

  const submit = async () => {
    await dispatch(action_loadCurrentUser_firebase());
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
            {'\t\t\t'}Can break usage such as persisting and restoring state.
            This might happen if you passed non-serializable values such as
            function, class instances etc. in params.
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
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
