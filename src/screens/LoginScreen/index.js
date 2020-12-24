import React from 'react';

// Styles
import * as Styled from 'root/src/styles/screens/Styled_LoginScreen';

// Components
import {WelcomeLogo} from 'root/src/components/logos/welcomeLogo';

import useCustomHook_LoginScreen from 'root/src/screens/LoginScreen/useLoginScreen';

const LoginScreen = () => {
  const {
    state: {username, password, busy, error},
    _setUsername,
    _setPassword,
    _Submit,
    _navigateToRegister,
  } = useCustomHook_LoginScreen();

  return (
    <Styled.Container>
      <WelcomeLogo />
      <Styled.ContanerInput>
        <Styled.UsernameInput
          error={error.username && !!error.username}
          value={username}
          onChange={(e) => _setUsername(e.nativeEvent.text)}
        />
        <Styled.PasswordInput
          error={error.password && !!error.password}
          value={password}
          onChange={(e) => _setPassword(e.nativeEvent.text)}
        />
      </Styled.ContanerInput>
      <Styled.ContanerButton>
        <Styled.ButtonLogin loading={busy} onPress={_Submit}>
          SignIn
        </Styled.ButtonLogin>
        <Styled.ButtonRegister onPress={_navigateToRegister()}>
          Create new account
        </Styled.ButtonRegister>
      </Styled.ContanerButton>
    </Styled.Container>
  );
};

export default LoginScreen;
