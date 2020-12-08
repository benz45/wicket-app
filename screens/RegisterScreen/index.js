import React from 'react';
import {TouchableOpacity} from 'react-native';

// Styles
import * as Styled from '../../styles/screens/Styled_RegisterScreen';

// Components
import {WelcomeLogo} from '../../components/logos/welcomeLogo';

//Custom Hook.
import useRegisterScreen from './useRegisterScreen';

const RegisterScreen = () => {
  const {
    state: {username, password, cpassword, error, busy},
    _setUsername,
    _setPassword,
    _setCPassword,
    _navigateToLogin,
    _register,
  } = useRegisterScreen();

  return (
    <Styled.MainContainer>
      <WelcomeLogo />
      <Styled.ContainerTextInput>
        <Styled.Username
          value={username}
          error={!!error.username}
          onChange={(e) => _setUsername(e.nativeEvent.text)}
        />
        {username.length > 0 && !error.username && (
          <Styled.GenerateText>
            <Styled.Subheading>Generated</Styled.Subheading>
            <Styled.SubheadingEmail>
              {username}@wicket.com
            </Styled.SubheadingEmail>
          </Styled.GenerateText>
        )}
      </Styled.ContainerTextInput>
      <Styled.ContainerTextInput>
        <Styled.Password
          value={password}
          error={!!error.password}
          onChange={(e) => _setPassword(e.nativeEvent.text)}
        />
      </Styled.ContainerTextInput>
      <Styled.ContainerTextInput>
        <Styled.CPassword
          value={cpassword}
          error={!!error.cpassword}
          onChange={(e) => _setCPassword(e.nativeEvent.text)}
        />
      </Styled.ContainerTextInput>

      <Styled.Button loading={busy} onPress={() => _register()}>
        Create new account
      </Styled.Button>

      <TouchableOpacity onPress={_navigateToLogin()}>
        <Styled.TextBackToLogin>Back to Login ?</Styled.TextBackToLogin>
      </TouchableOpacity>
    </Styled.MainContainer>
  );
};

export default RegisterScreen;
