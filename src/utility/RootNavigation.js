import React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  // eslint-disable-next-line
  navigationRef.current?.navigate(name, params);
}
