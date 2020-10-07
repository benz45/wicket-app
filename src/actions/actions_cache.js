import React from 'react';
import {setThemeToStore} from './index';
import Theme from './actions_theme';

// Set theme to cache and store.
export const setThemeToCacheAndStore = (value) => {
  return async (dispatch) => {
    dispatch(setThemeToStore(!!value ? Theme.light : Theme.dark, value));
  };
};
