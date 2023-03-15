/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  View,
} from 'react-native';
import {colors} from '../../shared/styling';
import styles from './styles';

export default function ButtonIcon({
  label,
  onPress = () => {},
  type,
  isLoading,
  btnStyle,
  isDisable,
  source,
  ctnIcon,
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
        <View style={styles.row}>
          <View
            style={[styles.ctnLogoIcon, label ? styles.space : {}, ctnIcon]}>
            {source}
          </View>
          {/* <Image
            source={source}
            style={[styles.ctnLogoIcon, label ? styles.space : false]}
          /> */}
          <Text style={[styles.txtButton, getTextColor(), txtStyle]}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
