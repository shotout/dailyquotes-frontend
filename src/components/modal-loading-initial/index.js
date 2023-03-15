import React, {useEffect} from 'react';
import {Modal, View, Text, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import styles from './styles';
import states from './states';
import dispatcher from './dispatcher';
import {
  hideLoadingModal,
  setCounterNumber,
} from '../../store/defaultState/actions';

const loadingImage = require('./loader.json');
const registerBackground = require('../../assets/images/background_register.png');

function ModalLoadingInitial({loadingModal}) {
  useEffect(() => {
    const interval = setInterval(() => {
      setCounterNumber(loadingModal.counter + Math.floor(Math.random() * 20));
    }, 1000);
    if (loadingModal.counter >= 100) {
      clearInterval(interval);
      hideLoadingModal();
    }

    return () => {
      clearInterval(interval);
    };
  }, [loadingModal.counter]);

  return (
    <Modal
      animationType="slide"
      transparent
      // visible
      visible={loadingModal.visible}
      onRequestClose={() => {}}>
      <View style={styles.ctnContent}>
        <Image source={registerBackground} style={styles.registerStyle} />
        <View style={styles.lottieWrapper}>
          <View style={styles.counterWrapper}>
            <Text style={[styles.txtPercentage]}>
              {loadingModal.counter >= 99 ? 99 : loadingModal.counter}
              {/* 22 */}
            </Text>
            <Text style={styles.percent}>%</Text>
          </View>
          <LottieView
            source={loadingImage}
            autoPlay
            loop
            style={styles.lottieStyle}
          />
        </View>
        {/* <Text style={styles.txtLoader}>
          {'NO FOMO...\nScanning the chain for hottest NFT...'}
        </Text> */}
      </View>
    </Modal>
  );
}

export default connect(states, dispatcher)(ModalLoadingInitial);
