import React from 'react';

// Styled
import * as Styled from 'root/src/styles/screens/DetailsProduct/Styled_DetailProductEditScreen';

import {Button} from 'root/src/components/CustomBtn';

// Custom Hook

import useEditDetailProductList from 'root/src/customHook/useEditDetailProductList';

export default function DetailProductEditScreen(props) {
  const {
    state,
    stateImage,
    _image,
    _setName,
    _setDescription,
    _submitUpdateProduct,
    _onShowDialogImagePicker,
    DialogImagePicker,
  } = useEditDetailProductList(props);

  return (
    <Styled.MainContainer>
      <Styled.ContainerImage onPress={() => _onShowDialogImagePicker()}>
        <Styled.Image
          source={{
            uri: stateImage.userGetImage ? stateImage.uri : _image,
          }}
        />
      </Styled.ContainerImage>
      <Styled.ContainerLayer>
        <Styled.ProductKeyText>Product key</Styled.ProductKeyText>
        <Styled.ProductKeyTitle>{state.key}</Styled.ProductKeyTitle>
      </Styled.ContainerLayer>
      <Styled.ContainerLayer>
        <Styled.NameInput
          value={state.name}
          onChange={(e) => _setName(e.nativeEvent.text)}
        />
      </Styled.ContainerLayer>
      <Styled.ContainerLayer>
        <Styled.DescriptionInput
          value={state.description}
          onChange={(e) => _setDescription(e.nativeEvent.text)}
        />
      </Styled.ContainerLayer>
      <Button
        loading={state.busy}
        mode="contained"
        style={{marginVertical: 24}}
        onPress={() => _submitUpdateProduct()}>
        Submit edit
      </Button>
      <DialogImagePicker />
    </Styled.MainContainer>
  );
}
