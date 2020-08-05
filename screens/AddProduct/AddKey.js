import React from 'react';
import {View, KeyboardAvoidingView} from 'react-native';

// Component
import {Button} from '../../components/CustomBtn';

// Styles
import styles from '../../styles/styles';

//Redux
import {useSelector} from 'react-redux';

// Paper
import {TextInput, Text, Title, Paragraph} from 'react-native-paper';
export default function AddKey() {
  const {accent} = useSelector((store) => store.ThemeReducer.theme.colors);
  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 45, flex: 3, justifyContent: 'center'}}>
        <Title style={{marginVertical: 14, color: accent}}>
          Enter you product key
        </Title>
        <TextInput label="XX-XXX-X" mode="flat" />
      </View>
      <View
        style={{
          backgroundColor: '#212121',
          paddingHorizontal: 30,
          borderTopStartRadius: 50,
          borderTopEndRadius: 50,
          flex: 2,
          paddingVertical: 40,
        }}>
        <Title>Use product key</Title>
        <Text style={{marginVertical: 10}}>
          {`\t\t\t\t\t`}Deprecated Gradle features were used in this build,
          making it incompatible with Gradle 7.0. Use warning-mode all to show
          the individual.
        </Text>
        <Paragraph style={{marginVertical: 14}}>Product key : XXXXXX</Paragraph>
        <View style={{justifyContent: 'flex-end', flex: 1}}>
          <Button
            style={
              (styles.button,
              [
                {
                  height: 50,
                  borderRadius: 60,
                  justifyContent: 'center',
                },
              ])
            }
            mode="contained"
            dark={true}>
            Next
          </Button>
        </View>
      </View>
    </View>
  );
}
