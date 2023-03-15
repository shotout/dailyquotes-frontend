/* eslint-disable prettier/prettier */
import React, {createRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  State,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import {colors, fonts} from '../../shared/styling';
import {moderateScale} from 'react-native-size-matters';

const data = [
  {id: 1, nama: 'Arohim', jk: 'Laki-laki'},
  {id: 2, nama: 'Rani', jk: 'Perempuan'},
  {id: 3, nama: 'Farell', jk: 'Laki-laki'},
  {id: 4, nama: 'Riski', jk: 'Laki-laki'},
];

export default function TesSwipeable() {
  const doubleTapRef = createRef();

  const onDoubleTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // eslint-disable-next-line no-alert
      window.alert('Double tap, good job!');
    }
  };

  function renderTap() {
    return (
      <TapGestureHandler
        ref={doubleTapRef}
        onHandlerStateChange={onDoubleTap}
        numberOfTaps={2}>
        <View style={styles.box} />
      </TapGestureHandler>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.text}>Duration of the last long press:</Text>
      {renderTap()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  box: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    backgroundColor: 'plum',
    margin: 10,
    zIndex: 200,
  },
  text: {
    marginLeft: 20,
  },
});
