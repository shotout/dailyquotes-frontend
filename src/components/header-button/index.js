import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import IconBack from '../../assets/svg/icon_back.svg';
import styles from './styles';
import IconPencil from '../../assets/svg/icon_pencil.svg';

export default function HeaderButton({
  title,
  onPress,
  rightPencil,
  rightText,
  labelRight,
  onRightText,
  onRight,
  dragHandler = {},
}) {
  function renderRightMenu() {
    if (rightPencil) {
      return (
        <TouchableWithoutFeedback onPress={onRight}>
          <View style={styles.iconRight}>
            <IconPencil width="100%" height="100%" />
          </View>
        </TouchableWithoutFeedback>
      );
    }
    if (rightText) {
      return (
        <TouchableWithoutFeedback onPress={onRightText}>
          <Text style={styles.rightText}>{labelRight}</Text>
        </TouchableWithoutFeedback>
      );
    }
    return null;
  }

  return (
    <View style={styles.ctnWrap} {...dragHandler}>
      <View style={styles.rowWrap}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.iconWrap}>
            <IconBack width="100%" height="100%" />
          </View>
        </TouchableOpacity>
        <View style={styles.titleWrap}>
          <Text style={styles.ctnTitle} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
      </View>
      {renderRightMenu()}
    </View>
  );
}
