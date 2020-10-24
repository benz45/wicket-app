import {useReducer} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';

import db from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import Toast from '../toast-paper';
import useDetailProductScreen from './useDetailProductScreen';

// Custom hook
import useSelectImage from '../../src/customHook/useSelectImage';

const SET_NAME = 'SET_NAME';
const SET_DESCRIPTION = 'SET_DESCRIPTION';
const SUBMIT = 'SUBMIT';
const ERROR = 'ERROR';

const reducer = (state, {type, payload}) => {
  switch (type) {
    case SET_NAME:
      return {...state, name: payload};
    case SET_DESCRIPTION:
      return {...state, description: payload};
    case SUBMIT:
      return {...state, busy: payload};
    case ERROR:
      return {...state, busy: false};
    default:
      throw new Error();
  }
};

export default function useEditDetailProductList() {
  const {dispatch: dispatchNavigation} = useNavigation();

  const {_keyList} = useDetailProductScreen();
  const {no: key, name, description, image: _image} = Object.assign(
    {},
    ..._keyList,
  );

  const {
    state: stateImage,
    _onShowDialogImagePicker,
    _components: DialogImagePicker,
  } = useSelectImage();

  const [state, dispatch] = useReducer(reducer, {
    busy: false,
    key,
    name: name,
    description: description,
  });

  const _submitUpdateProduct = async () => {
    try {
      dispatch({type: SUBMIT, payload: true});
      await db()
        .ref(`door/names/${key}`)
        .update({
          name: state.name,
        })
        .then(() => {
          db()
            .ref(`door/datas/${key}`)
            .update({
              name: state.name,
              description: state.description,
            })
            .then(() => {
              if (stateImage.userGetImage) {
                const reference = storage().ref().child(`door/${key}`);
                reference.delete().then(() => {
                  const uploadImage = async () => {
                    const newReference = await storage()
                      .ref()
                      .child(`door/${key}`);
                    await newReference.putFile(stateImage.uri);
                    const linkImage = await newReference.getDownloadURL();
                    await db()
                      .ref(`door/datas/${key}`)
                      .update({
                        image: linkImage,
                      })
                      .then(() => {
                        db().ref(`door/images/${key}`).update({
                          image: linkImage,
                        });
                      })
                      .catch(() => {
                        dispatch({type: ERROR});
                        Toast('Upload image failed.');
                      });
                  };
                  uploadImage();
                });
              }
            });
        })
        .then(() => {
          dispatchNavigation(CommonActions.goBack());
          Toast('Edit product succsessful.');
        })
        .catch(() => {
          dispatch({type: ERROR});
          Toast('Edit product failed.');
        });
      dispatch({type: SUBMIT, payload: false});
    } catch (error) {
      console.log('editProduct', error);
    }
  };

  const _setName = (value) => {
    dispatch({type: SET_NAME, payload: value});
  };

  const _setDescription = (value) => {
    dispatch({type: SET_DESCRIPTION, payload: value});
  };

  return {
    state,
    stateImage,
    _image,
    _setName,
    _setDescription,
    _submitUpdateProduct,
    _onShowDialogImagePicker,
    DialogImagePicker,
  };
}
