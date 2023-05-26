/* eslint-disable react/jsx-props-no-spreading */
import React, {Fragment} from 'react';
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
  prependIcon,
  txtStyle,
}) {
  function getBgColor() {
    switch (type) {
      case 'white-button':
        return {backgroundColor: colors.white};
      case 'dark':
        return {backgroundColor: colors.dark};
      case 'green':
        return {backgroundColor: colors.green};
      case 'tosca':
        return {backgroundColor: colors.tosca};
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
        <>
          {prependIcon}
          <Text style={[styles.txtButton, getTextColor(), txtStyle]}>
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
