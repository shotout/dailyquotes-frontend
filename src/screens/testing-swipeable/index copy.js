/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';

const data = [
  {id: 1, nama: 'Arohim', jk: 'Laki-laki'},
  {id: 2, nama: 'Rani', jk: 'Perempuan'},
  {id: 3, nama: 'Farell', jk: 'Laki-laki'},
  {id: 4, nama: 'Riski', jk: 'Laki-laki'},
];

export default function TesSwipeable() {
  function renderRight() {
    return (
      <View style={{backgroundColor: '#006699', direction: 'rtl'}}>
        <Text>Testing Swipeable</Text>
      </View>
    );
  }

  const LeftActions = () => {
    return (
      <View
        style={{flex: 1, backgroundColor: 'blue', justifyContent: 'center'}}>
        <Text
          style={{
            color: 'white',
            paddingHorizontal: 10,
            fontWeight: '600',
          }}>
          Left Action
        </Text>
      </View>
    );
  };

  function renderContent(item) {
    return (
      <Swipeable renderLeftActions={LeftActions}>
        <View
          style={{
            paddingVertical: 10,
            borderColor: '#000',
            borderWidth: 1,
            marginVertical: 10,
          }}>
          <Text>{item.nama}</Text>
          <Text>{item.jk}</Text>
        </View>
      </Swipeable>
    );
  }

  return (
    <View style={styles.flex}>
      <FlatList
        style={{paddingVertical: 10}}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => renderContent(item, index)}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
