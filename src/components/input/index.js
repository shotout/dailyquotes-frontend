/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect, useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import {colors} from '../../shared/styling';
import styles from './styles';

export default function Input(props) {
  const {
    ctnRootStyle,
    txtLimitStyle,
    ctnInputStyle,
    showLimit,
    keepFocus,
    keyboardShow,
  } = props;
  const refInput = React.useRef(null);

  useEffect(() => {
    if (keepFocus) {
      if (!keyboardShow) {
        if (refInput.current) {
          refInput.current?.focus();
        }
      }
    }
  }, [keepFocus, keyboardShow]);

  return (
    <View style={[styles.mainWrapper, ctnRootStyle]}>
      <View style={[styles.ctnInput, ctnInputStyle]}>
        <TextInput
          style={styles.inputStyle}
          placeholderTextColor={colors.blue}
          {...props}
          ref={cref => {
            refInput.current = cref;
          }}
        />
      </View>
      {props.error && <Text style={styles.txtRed}>{props.error}</Text>}
      {showLimit && (
        <Text style={[styles.txtLimit, txtLimitStyle]}>{`${
          props.value?.length || '0'
        }/${props.maxLength}`}</Text>
      )}
    </View>
  );
}
