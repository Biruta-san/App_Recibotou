import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import IconProps from './iconProps';

const VisibleIcon = ({size, color}: IconProps) => (
  <Icon name="visibility" size={size ?? 16} color={color ?? 'white'} />
);

export default VisibleIcon;
