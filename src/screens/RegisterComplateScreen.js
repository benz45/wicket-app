import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, Avatar, Checkbox} from 'react-native-paper';
import {H1, H4} from 'root/src/Styles/styled';
import {useNavigation} from '@react-navigation/native';
import Button from 'root/src/Components/CustomButton';

//Redux
import {useSelector} from 'react-redux';

const RegisterComplate = () => {
  const {accent} = useSelector((reducer) => reducer.ThemeReducer.theme.colors);
  const {user} = useSelector((reducer) => reducer.CurrentUserReducer);
  const [isCheckbox, setCheckbox] = useState(false);
  const {navigate} = useNavigation();

  const submit = async () => {
    navigate('Authenticated', {screen: 'Stack_HomeDrawer'});
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
          {user && user.displayName && user.email ? (
            <View style={{marginVertical: 10}}>
              <Text>Name : {user.displayName}</Text>
              <Text>Email : {user.email}</Text>
            </View>
          ) : (
            <Text>Loading ...</Text>
          )}
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
          onPress={() => submit()}>
          Successful
        </Button>
      </View>
    </View>
  );
};

export default RegisterComplate;
