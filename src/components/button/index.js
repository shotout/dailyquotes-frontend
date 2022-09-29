/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {colors} from '../../shared/styling';
import styles from './styles';

export default function Button({
  label,
  onPress = () => {},
  type,
  isLoading,
  btnStyle,
  isDisable,
}) {
  function getBgColor() {
    switch (type) {
      case 'white-button':
        return {backgroundColor: colors.white};
      case 'dark':
        return {backgroundColor: colors.dark};
      case 'green':
        return {backgroundColor: colors.green};
      default:
        if (isDisable) {
          return {backgroundColor: colors.gray};
        }
        return {};
    }
  }

  function getTextColor() {
    switch (type) {
      case 'white-button':
        return {color: colors.red};
      default:
        if (isDisable) {
          // return {backgroundColor: colors.white};
        }
        return {};
    }
  }

  return (
    <TouchableOpacity
      disabled={isLoading || isDisable}
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
