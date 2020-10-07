import React, {useState} from 'react';
import {
  Menu,
  IconButton,
  Colors,
  Button,
  Divider,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Toast from '../src/toast-paper';

// Redux
import {useSelector} from 'react-redux';

// Actions
import {
  action_removeDoor,
  action_childRemove_firebase,
} from '../src/actions/actions_firebase';

export const MenuDoor = (props) => {
  const {user} = useSelector((store) => store.FirebaseReducer.currentUser);
  const {navigate} = useNavigation();
  const [isShowMenu, setShowMenu] = useState(false);
  const [isShowDialog, setShowDialog] = useState(false);

  const _OpenMenu = () => setShowMenu(true);
  const _CloseMenu = () => setShowMenu(false);
  const _OpenDialog = () => setShowDialog(true);
  const _CloseDialog = () => setShowDialog(false);

  const _detail = () => {
    _CloseMenu();
    navigate('Stack_detailProductScreen', {...props});
  };

  // Remove door.
  const _removeDoor = async () => {
    await action_removeDoor(props.no);
  };

  // Cheack child remove.
  action_childRemove_firebase();
  return (
    <Menu
      visible={isShowMenu}
      onDismiss={_CloseMenu}
      anchor={
        <IconButton
          icon="dots-vertical"
          color={Colors.grey400}
          size={20}
          onPress={_OpenMenu}
        />
      }>
      <Menu.Item icon="feature-search" title="Details" onPress={_detail} />
      {props.createdBy == user.displayName && (
        <>
          <Divider />
          <Menu.Item icon="delete" title="Delete" onPress={_OpenDialog} />
        </>
      )}
      <Portal>
        <Dialog visible={isShowDialog}>
          <Dialog.Title>Delete</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Do you want to delete "{props.name}" ?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color={Colors.red400} onPress={_CloseDialog}>
              Cancel
            </Button>
            <Button onPress={_removeDoor}>Agree</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Menu>
  );
};
