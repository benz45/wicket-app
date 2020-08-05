import React, {useState, useEffect} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';

// Styles
import {action_registerUser} from '../src/actions/actions_firebase';
import {Text, View} from '../styles/styled';
import {Subheading, Button} from '../styles/screens/Styled_RegisterScreen';

// Components
import Toast from '../src/toast-paper';
import {WelcomeLogo} from '../components/logos/welcomeLogo';

// React Navigation
import {useNavigation} from '@react-navigation/native';

// Redux
import {useSelector} from 'react-redux';

const RegisterScreen = () => {
  const {accent} = useSelector((store) => store.ThemeReducer.theme.colors);
  const {navigate} = useNavigation();
  const [busy, setBusy] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  // Helper Text
  const [usernameHelper, setUsernameHelper] = useState({error: false});
  const [passwordHelper, setPasswordHelper] = useState({error: false});
  const [cpasswordHelper, setCpasswordHelper] = useState({error: false});

  const Register = async () => {
    setBusy(true);
    // Test
    if (username.trim() === '') {
      setBusy(false);
      setUsernameHelper({error: true});
      return Toast('Username not specified');
    } else if (password.trim() === '') {
      setBusy(false);
      setPasswordHelper({error: true});
      return Toast('Password not specified');
    } else if (password.length < 6) {
      setBusy(false);
      setPasswordHelper({error: true});
      return Toast('Password must over 6-24 character');
    } else if (cpassword.trim() === '') {
      setBusy(false);
      setCpasswordHelper({error: true});
      return Toast('Confirm password not specified');
    }

    if (password !== cpassword) {
      setBusy(false);
      setCpasswordHelper({error: true});
      return Toast('Password mismatch');
    }

    // Check existing name.
    const res = await action_registerUser(username, password);

    if (res.error) {
      setBusy(false);
      setUsernameHelper({error: true});
      Toast(res.message);
    } else {
      setBusy(false);
      navigate('RegisterProfile', {username});
    }
  };

  // Reset state helper
  useEffect(() => {
    setUsernameHelper({error: false});
  }, [username]);
  useEffect(() => {
    setPasswordHelper({error: false});
  }, [password]);
  useEffect(() => {
    setCpasswordHelper({error: false});
  }, [cpassword]);

  return (
    <>
      <ScrollView>
        <View mv={80} mh={40}>
          <WelcomeLogo />
          <View mt={16}>
            <TextInput
              label="Username"
              error={usernameHelper.error}
              mode="flat"
              onChange={(e) => setUsername(e.nativeEvent.text)}
            />

            {username.length > 0 && !usernameHelper.error && (
              <View fd="row">
                <Subheading color={accent}>Generated</Subheading>
                <Subheading>{username}@wicket.com</Subheading>
              </View>
            )}
          </View>
          <View mt={16}>
            <TextInput
              label="Password"
              error={passwordHelper.error}
              secureTextEntry
              multiline={false}
              mode="flat"
              onChange={(e) => setPassword(e.nativeEvent.text)}
            />
          </View>
          <View mt={16}>
            <TextInput
              label="Confirm Password"
              error={cpasswordHelper.error}
              secureTextEntry
              multiline={false}
              mode="flat"
              onChange={(e) => setCpassword(e.nativeEvent.text)}
            />
          </View>
          <View mv={10}>
            <View mt={15}>
              <Button
                loading={busy}
                mode="contained"
                dark={true}
                onPress={Register}>
                Create new account
              </Button>
            </View>
            <View asf="center" mt={15}>
              <TouchableOpacity onPress={() => navigate('Login')}>
                <Text color={accent}>Back to Login ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;
