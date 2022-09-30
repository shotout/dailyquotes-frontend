/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {colors} from '../../shared/styling';
import styles from './styles';

export default function ButtonOutline({
  label,
  onPress = () => {},
  isSelected,
  isLoading,
  btnStyle,
  defaultTextColor,
  theme,
}) {
  function getBgColor() {
    if (isSelected) {
      return {backgroundColor: colors.blue};
    }
    return {};
  }

  function getTextColor() {
    if (isSelected) {
      return {color: colors.white};
    }
    if (defaultTextColor) {
      return {color: defaultTextColor};
    }
    return {};
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.ctnRoot, btnStyle, getBgColor()]}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.txtButton, getTextColor()]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
