import React, {useState} from 'react';
import {DimensionValue} from 'react-native';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {retrieveColorString} from '../../../utils/constants/colorConstants';
import VisibleIcon from '../../icons/VisibleIcon';
import NoVisibleIcon from '../../icons/NoVisibleIcon';
import Input from './Input';

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
}

interface PasswordIconProps {
  isPassword?: boolean;
  passwordVisible?: boolean;
  handleVisibilityChange?: () => void;
}

const PasswordIcon = ({
  passwordVisible,
  handleVisibilityChange,
}: PasswordIconProps) => {
  return (
    <TouchableWithoutFeedback onPress={handleVisibilityChange}>
      {passwordVisible ? (
        <VisibleIcon size={20} color={retrieveColorString()} />
      ) : (
        <NoVisibleIcon size={20} color={retrieveColorString()} />
      )}
    </TouchableWithoutFeedback>
  );
};

const PasswordInput: React.FC<InputProps> = ({
  value,
  label,
  helperText,
  placeholder,
  onChange,
  style,
  marginTop,
  w,
  width,
}) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleVisibilityChange = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Input
      value={value}
      label={label}
      style={style}
      helperText={helperText}
      placeholder={placeholder}
      onChange={onChange}
      secureTextEntry={!passwordVisible}
      marginTop={marginTop}
      w={w}
      width={width}
      accessoryRight={
        <PasswordIcon
          passwordVisible={passwordVisible}
          handleVisibilityChange={handleVisibilityChange}
        />
      }
    />
  );
};

export default PasswordInput;
