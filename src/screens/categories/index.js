/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { handleBasicPaywall, handlePayment } from '../../helpers/user';
import styles from './styles';

export default function Categories({onSelect}) {
  const [showModalIcon, setShowModalIcon] = useState(false);

  function renderHeader() {
    return (
      <View style={styles.rowHeaderText}>
        <Text style={styles.boldHeader}>Categories</Text>
        <TouchableOpacity onPress={handleBasicPaywall}>
          <Text>Unlock all</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      {renderHeader()}
      <ScrollView
        style={styles.ctnRoot}
        contentContainerStyle={styles.ctnScroll}
        showsVerticalScrollIndicator={false}>
        <Text>aa</Text>
      </ScrollView>
    </View>
  );
}
