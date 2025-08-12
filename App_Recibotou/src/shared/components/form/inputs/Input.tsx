import React from 'react';
import {Input as KInput} from '@ui-kitten/components';
import Caption from './Caption';
import {DimensionValue, StyleSheet} from 'react-native';

interface InputProps {
  value?: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  onChange: (text: string) => void;
  style?: object;
  marginTop?: number;
  isPassword?: boolean;
  w?: DimensionValue;
  width?: DimensionValue;
  secureTextEntry?: boolean;
  accessoryRight?: React.JSX.Element
}

const Input: React.FC<InputProps> = ({
  value,
  label,
  helperText,
  placeholder,
  onChange,
  style,
  marginTop,
  w,
  width,
  secureTextEntry = false,
  accessoryRight
}) => {
  const styles = StyleSheet.create({
    container: {
      width: w ?? width ?? '80%',
      borderRadius: 10,
      marginTop: marginTop ?? 0,
    },
  });

  return (
    <KInput
      value={value}
      label={label}
      style={style ?? styles.container}
      caption={<Caption helperText={helperText} />}
      placeholder={placeholder}
      onChangeText={onChange}
      secureTextEntry={secureTextEntry}
      accessoryRight={accessoryRight}
    />
  );
};

export default Input;
