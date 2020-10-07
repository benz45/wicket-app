import React, {useState} from 'react';
import {Keyboard} from 'react-native';

// Navigation
import {useNavigation} from '@react-navigation/native';

// Styles
import styles from '../styles/styles';
import {Test, View, Input, Container, LogoApp, Text} from '../styles/styled';

// Components
import {Button} from '../components/CustomBtn';
import {WelcomeLogo} from '../components/logos/welcomeLogo';

// Actions
import {useDispatch} from 'react-redux';
import {_setUserState} from '../src/actions';
import {
  loginUser,
  action_loadCurrentUser_firebase,
} from '../src/actions/actions_firebase';
import Toast from '../src/toast-paper';

const LoginScreen = () => {
  const [busy, setBusy] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const login = async () => {
    setBusy(true);
    Keyboard.dismiss();

    if (username.trim() === '') {
      setBusy(false);
      return Toast('Username not specified');
    } else if (password.trim() === '') {
      setBusy(false);
      return Toast('Password not specified');
    }

    let result = await loginUser(username, password);
    if (result) {
      dispatch(action_loadCurrentUser_firebase());
      setBusy(false);
      navigate('Authenticated');
    } else {
      Toast('There is no user record corresponding to this identifier.');
      setBusy(false);
    }
  };
  return (
    <Container>
      <WelcomeLogo />
      <View mt={14} />
      <Input
        label="Username"
        // mode="outlined"
        onChange={(e) => setUsername(e.nativeEvent.text)}
      />
      <Input
        label="Password"
        secureTextEntry
        // mode="outlined"
        onChange={(e) => setPassword(e.nativeEvent.text)}
      />
      <View mt={10}>
        <Button
          style={styles.button}
          mode="contained"
          loading={busy}
          onPress={login}>
          SignIn
        </Button>
        <Button
          style={styles.button}
          // mode="text"
          dark={true}
          onPress={() => navigate('RegisterSecurity')}>
          Create new account
        </Button>
        <View mv={6} pv={6}>
          <Text ta="center"> What is this app ? </Text>
        </View>
      </View>
    </Container>
  );
};

export default LoginScreen;
