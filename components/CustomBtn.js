import React, {useRef} from 'react';
import {Button as PaperButton} from 'react-native-paper';

// Redux
import {useSelector} from 'react-redux';

export const Button = (props) => {
  const {theme, colors} = useSelector((reducer) => reducer.ThemeReducer.theme);
  const {current} = useRef({type: props.mode, color: colors.button});

  const mode = (value) => props.mode === value;
  const validate = (value) =>
    theme === 'dark'
      ? (current.color = value)
      : (current.color = colors.button);

  mode('contained')
    ? validate(colors.button)
    : mode('outlined')
    ? validate(colors.primary)
    : mode('text')
    ? validate(colors.primary)
    : null;

  return (
    <PaperButton
      mode={current.type}
      {...props}
      dark={true}
      color={current.color}
    />
  );
};
