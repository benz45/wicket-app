import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {IconButton, Colors, Dialog, Portal} from 'react-native-paper';

// Components
import Button from '../components/CustomButton';

// Styles
import {H4, H2} from '../styles/styled';

export const DialogAddSuccess = ({visible, jumpTo, callback}) => {
  const [dialog, setDialog] = useState(false);

  const showDialog = () => setDialog(true);
  const hideDialog = () => {setDialog(false)};

  useEffect(() => {
    if (visible) {
      showDialog();
    } else {
      hideDialog();
    }
  }, [visible]);

  return (
    <Portal>
      <Dialog visible={dialog} onDismiss={hideDialog}>
        <Dialog.Content>
          <View style={{alignItems: 'center'}}>
            <IconButton
              icon="checkbox-marked-circle-outline"
              color={Colors.green400}
              size={50}
            />
            <H2>Insert successful</H2>
            <H4 style={{color: '#757575'}}>
              Lorem ipsum odor amet, consectetuer.
            </H4>
          </View>
        </Dialog.Content>
        <Dialog.Actions style={{justifyContent: 'space-between'}}>
          <Button
            onPress={() => {
              hideDialog();
              jumpTo('home');
            }}>
            Go Home
          </Button>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
