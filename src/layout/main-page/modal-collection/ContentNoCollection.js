import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import ImgCollection from '../../../assets/svg/img_collection.svg';

export default function ContentNoCollection({ctnRoot}) {
  return (
    <View style={[styles.ctnWrapper, ctnRoot]}>
      <View style={styles.ctnKet}>
        <Text style={styles.ctnTxtKet}>
          You can use collections to group quotes, like ‘Loving myself’ or
          ‘Reaching my goals’.
        </Text>
      </View>
      <View style={styles.ctnImgWrap}>
        <View style={styles.ctnImg}>
          <ImgCollection width="100%" height="100%" />
        </View>
        <Text
          style={
            styles.ctnTxtImg
          }>{`You don’t have any \ncollections yet.`}</Text>
      </View>
    </View>
  );
}
