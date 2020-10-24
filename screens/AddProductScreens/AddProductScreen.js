import React from 'react';

// Styled
import * as Styled from '../../styles/screens/AddProductScreens/Styled_AddProductScreen';

// Navigation
import {useNavigation} from '@react-navigation/native';

// Custom hook.
import useReducerAddProduct from './useDispatch_Add_Product';

const AddProductScreen = ({jumpTo}) => {
  const {navigate} = useNavigation();
  // Custom hook.
  const {
    state: {key, isKey},
    _resetKey,
    _setKey,
    _disableBtn,
    _loading,
  } = useReducerAddProduct();

  // Button submit.
  const _submit = () => {
    const paramKey = key;
    navigate('Stack_AddProduct_NameAndDescription', {paramKey});
    _resetKey();
    jumpTo('home');
  };

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
        disabled={_disableBtn}
        loading={_loading()}
        onPress={_submit}>
        Verify
      </Styled.SubmitButton>
    </Styled.Container>
  );
};

export default AddProductScreen;