import React, {useState} from 'react';
import {View} from 'react-native';

// Paper
import {Text, Card, Title, TextInput} from 'react-native-paper';

// Redux
import {useSelector} from 'react-redux';
import Button from '../../components/CustomButton';

// Action
import {editProduct} from '../../src/actions/actions_firebase';

// Navigation
import {useNavigation} from '@react-navigation/native';

export default function DetailProductEditScreen({route: {params}}) {
  const {accent} = useSelector((store) => store.ThemeReducer.theme.colors);
  const {navigate} = useNavigation();
  const [busy, setBusy] = useState(false);
  const [changeButton, setChangeButton] = useState(false);
  const [productKey, setProductKey] = useState(params.no);
  const [name, setName] = useState(params.name);
  const [description, setDescription] = useState(params.description);

  const _submitEdit = async () => {
    setBusy(true);
    await editProduct(productKey, name, description).then(() => {
      navigate('DetailProductScreen');
      setBusy(false);
    });
  };

  return (
    <View>
      <Title style={{fontSize: 20, marginVertical: 10}}>Edtir Product</Title>
      <Card>
        <Card.Content style={{paddingHorizontal: 24}}>
          <View style={{marginVertical: 8}}>
            <View
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: accent}}>Product key</Text>
              <Text
                style={{
                  color: accent,
                  borderBottomColor: accent,
                  borderBottomWidth: 1,
                }}
                onPress={() => setChangeButton(true)}>
                Change
              </Text>
            </View>
            {!changeButton ? (
              <Title style={{fontSize: 26}}>{productKey}</Title>
            ) : (
              <TextInput
                label="Input product key"
                value={productKey}
                mode="outlined"
                onChange={(e) => setProductKey(e.nativeEvent.text)}
              />
            )}
          </View>
          <View style={{marginVertical: 8}}>
            <Text style={{color: accent, marginVertical: 10}}>Name</Text>
            <TextInput
              label="Input name"
              value={name}
              onChange={(e) => setName(e.nativeEvent.text)}
            />
          </View>
          <View style={{marginVertical: 8}}>
            <Text style={{color: accent, marginVertical: 10}}>Description</Text>
            <TextInput
              label="Input description"
              value={description}
              onChange={(e) => setDescription(e.nativeEvent.text)}
            />
          </View>
        </Card.Content>
      </Card>
      <Button
        loading={busy}
        mode="contained"
        style={{marginVertical: 24}}
        onPress={_submitEdit}>
        Submit edit
      </Button>
    </View>
  );
}
