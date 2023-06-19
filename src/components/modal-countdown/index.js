import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {AdEventType, RewardedAdEventType} from 'react-native-google-mobile-ads';
import styles from './styles';
import useCountdown from './useCountdown';
import {getRewardedOutOfQuotesID} from '../../shared/static/adsId';
import {setTodayAdsLimit} from '../../store/defaultState/actions';

const bgTimer = require('../../assets/icons/timer_bg.png');
const iconClose = require('../../assets/icons/close.png');

const ModalCountDown = ({visible, handleClose, adsRef}) => {
  const count = useCountdown(visible);

  const [timeLeft, setTimeLeft] = useState({
    hour: 0,
    minutes: 0,
    second: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      );
      const timeUntilTomorrow = tomorrow - now;
      const hours = Math.floor(timeUntilTomorrow / (1000 * 60 * 60));
      const minutes = Math.floor((timeUntilTomorrow / (1000 * 60)) % 60);
      const seconds = Math.floor((timeUntilTomorrow / 1000) % 60);
      setTimeLeft({
        hour: hours,
        minutes,
        second: seconds,
      });
    }, 1000);

    // Handle interstial reward quote ads

    adsRef.load();
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (count === 0 && visible) {
      console.log('SHOW COUNTDOWN ADS');
      if (adsRef.loaded) {
        adsRef.show();
      }
    }
  }, [count, visible]);

  function renderIconClose() {
    return (
      <View style={styles.btnStyle}>
        <TouchableOpacity onPress={handleClose}>
          <Image source={iconClose} style={styles.btnClose} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <Portal>
      <Modal
        onDismiss={handleClose}
        contentContainerStyle={{flex: 1, justifyContent: 'center'}}
        visible={visible}>
        <View style={styles.ctnRoot}>
          <ImageBackground source={bgTimer} style={styles.ctnCountdown}>
            <Text style={styles.txtCountdown}>
              {`${timeLeft.hour}h ${timeLeft.minutes}m`}{' '}
              <Text style={styles.txtSmall}>{`${timeLeft.second}s`}</Text>
            </Text>
          </ImageBackground>
          <View style={styles.ctnText}>
            <Text style={styles.txtTitle}>You are out of Quotes!</Text>
            <Text style={styles.txtDesc}>
              Watch an ad now to unlock the next quotes without waiting!
            </Text>
          </View>
          <View style={styles.ctnBtn}>
            <TouchableWithoutFeedback onPress={handleClose}>
              <View style={[styles.btnWrapper, styles.mgRight]}>
                <Text style={styles.txtBtn}>No Thanks</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.btnWrapper}>
              <Text style={[styles.txtBtn, styles.txtStartAds]}>
                {`Ad starting in ... ${count}`}
              </Text>
            </View>
          </View>

          {renderIconClose()}
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalCountDown;
