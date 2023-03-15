import React, {useState} from 'react';
import {Image, TextInput, View, Text} from 'react-native';
import {colors} from '../../shared/styling';
import styles from './styles';

const iconSearch = require('../../assets/icons/search.png');

export default function Search(props) {
  const {ctnRootStyle, ctnInputStyle, isSelect} = props;

  if (isSelect) {
    return (
      <View style={[styles.mainWrapper, ctnRootStyle]}>
        <View style={[styles.ctnInput, ctnInputStyle]}>
          <View style={styles.ctnRow}>
            <Text style={styles.inputStyle}>{props.placeholder || ''}</Text>
            <Image style={styles.searchIcon} source={iconSearch} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.mainWrapper, ctnRootStyle]}>
      <View style={[styles.ctnInput, ctnInputStyle]}>
        <View style={styles.ctnRow}>
          <TextInput
            style={styles.inputStyle}
            placeholderTextColor={colors.blue}
            {...props}
          />
          <Image style={styles.searchIcon} source={iconSearch} />
        </View>
      </View>
    </View>
  );
}
