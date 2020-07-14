import React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

// can use anywhere
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

// can use anywhere
export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

