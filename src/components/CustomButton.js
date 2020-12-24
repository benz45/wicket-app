import React from 'react';
import {Button as PaperButton} from 'react-native-paper';

// Redux
import {useSelector} from 'react-redux'

const CustomButton = (props) => {
  const {button} = useSelector(reducer => reducer.ThemeReducer.theme.colors)
  return <PaperButton {...props} dark={true} color={button} />;
};

export default CustomButton;
