import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import styled from 'styled-components';

// React Navigations
import {useNavigation} from '@react-navigation/native';

// Component
import Button from 'root/src/Components/CustomButton';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 80px;
  height: 80px;
`;

const Title = styled(Text)`
  font-size: 23px;
  padding-top: 15px;
  text-transform: uppercase;
`;

const TitleSub = styled(Text)`
  font-size: 13px;
`;

const FirstScreen = () => {
  const {navigate} = useNavigation();

  const getStarted = () => {
    navigate('Authentication');
  };
  const signIn = () => {
    navigate('Authentication');
  };

  return (
    <Container>
      <Logo source={require('../assets/logo.png')} /> <Title> Wicket </Title>
      <TitleSub> Welcome to wicket app with react native. </TitleSub>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
        }}>
        <Button
          mode="contained"
          style={{
            marginRight: 10,
          }}
          onPress={getStarted}>
          Get Started
        </Button>
        <Button mode="outlined" onPress={signIn}>
          Sign In
        </Button>
      </View>
      <TitleSub> Github | Wicket app </TitleSub>
    </Container>
  );
};

export default FirstScreen;
