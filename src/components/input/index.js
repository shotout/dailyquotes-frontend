/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import {colors} from '../../shared/styling';
import styles from './styles';

export default function Input(props) {
  const {ctnRootStyle, txtLimitStyle, ctnInputStyle, showLimit} = props;
  const [isFocus, setFocus] = useState(false);
  return (
    <View style={[styles.mainWrapper, ctnRootStyle]}>
      <View style={[styles.ctnInput, ctnInputStyle]}>
        <TextInput
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          style={styles.inputStyle}
          placeholderTextColor={colors.blue}
          {...props}
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
