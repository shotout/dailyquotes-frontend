import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import styles from './styles';

export default function ListContent({
  onPress,
  icon,
  title,
  titleStyle,
  styleList,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.listWrap, styleList]}>
        <View style={icon ? styles.iconWrap : styles.noIcon}>{icon}</View>
        <View style={styles.txtWrap}>
          <Text style={[styles.ctnTxt, titleStyle]}>{title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
