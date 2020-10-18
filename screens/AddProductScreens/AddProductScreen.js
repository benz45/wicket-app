import React, {useEffect} from 'react';
import {Keyboard} from 'react-native';

// Styled
import * as Styled from '../../styles/screens/AddProductScreens/Styled_AddProductScreen';

// Navigation
import {useNavigation} from '@react-navigation/native';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  SET_PRODUCTKEY_TOSTORE,
  SET_BUSY_ON,
  SET_BUSY_OFF,
  RESET_ISKEY,
} from '../../src/actionsType';
import {action_setIskeyToStore} from '../../src/actions/actions_addProduct';

const AddProductScreen = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {busy, key, isKey} = useSelector(({AddProductReducer: res}) => res);

  // Button submit.
  const _submit = async () => {
    dispatch({
      type: SET_BUSY_ON,
    });
    navigate('Stack_AddProduct_NameAndDescription');
    Keyboard.dismiss();
    dispatch({
      type: SET_BUSY_OFF,
    });
  };

  // Set key from text input.
  const _setKey = (paramKey) => {
    dispatch({
      type: SET_PRODUCTKEY_TOSTORE,
      payload: paramKey,
    });
  };

  // Validation disable button submit.
  const _validateButtonDisable = () => {
    return key.length === 6 && isKey.visible === true && isKey.type === 'info'
      ? false
      : true;
  };

  //Check used a key. If key.length = 6. if not to do reset isKey.
  useEffect(() => {
    if (key.length === 6) {
      Keyboard.dismiss();
      dispatch(action_setIskeyToStore(key));
    } else {
      dispatch({type: RESET_ISKEY});
    }
  }, [key]);

  return (
    <Styled.Container>
      <Styled.HeadIconContainer>
        <Styled.HeadIcon />
      </Styled.HeadIconContainer>
      <Styled.HeadText>Create new wicket</Styled.HeadText>
      <Styled.DetailText>
        Many of our components require the use of JavaScript to function.
        Specifically, they require jQuery. require the use of JavaScript to
        function. Specifically
      </Styled.DetailText>

      <Styled.ProductKeyText>Product key</Styled.ProductKeyText>
      <Styled.InputKeyContainer>
        <Styled.InputKey
          error={isKey.error}
          value={key}
          onChange={(e) => _setKey(e.nativeEvent.text)}
        />
        {/* Helper text. */}
        <Styled.HelperText type={isKey.type} visible={isKey.visible}>
          {isKey.message}
        </Styled.HelperText>
      </Styled.InputKeyContainer>

      <Styled.SubmitButton
        disabled={_validateButtonDisable()}
        loading={busy}
        onPress={() => _submit()}>
        {busy ? 'Loading' : 'Verify'}
      </Styled.SubmitButton>
    </Styled.Container>
  );
};

export default AddProductScreen;
