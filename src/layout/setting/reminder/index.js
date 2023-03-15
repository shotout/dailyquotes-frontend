import moment from 'moment';
import React, {useEffect, useState, useRef} from 'react';
import {
  Alert,
  AppState,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import * as RNPaper from 'react-native-paper';
import {connect} from 'react-redux';
import {Modal, Portal} from 'react-native-paper';
import HeaderButton from '../../../components/header-button';
import styles from './styles';
import Button from '../../../components/button';
import states from './states';
import {updateProfile} from '../../../shared/request';
import {reloadUserProfile} from '../../../helpers/user';
import {colors} from '../../../shared/styling';
import {checkNotificationPermission} from '../../../helpers/permissionHandler';

const bannerImage = require('../../../assets/images/notification_app.png');

function Reminder({isVisible, onClose, userProfile}) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isLoading, setLoading] = useState(false);
  const [isNotificationActive, setNotificationStatus] = useState(false);
  const [values, setFormValues] = useState({
    start_at: moment(new Date(2018, 11, 24, 8, 0, 30, 0)).format(
      'YYYY-MM-DD HH:mm',
    ),
    end_at: moment(new Date(2018, 11, 24, 21, 0, 30, 0)).format(
      'YYYY-MM-DD HH:mm',
    ),
    often: 10,
  });

  const handleSaveReminder = async () => {
    try {
      setLoading(true);
      await updateProfile({
        start: moment(values.start_at).format('HH:mm'),
        end: moment(values.end_at).format('HH:mm'),
        often: values.often,
        _method: 'PATCH',
      });
      setTimeout(() => {
        reloadUserProfile();
      }, 2000);
      onClose();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const getNotificationStatus = async () => {
          const notifcationStatus = await checkNotificationPermission();
          setNotificationStatus(notifcationStatus);
          if (notifcationStatus) {
            handleSaveReminder();
          }
        };
        getNotificationStatus();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isVisible === true) {
      const getNotificationStatus = async () => {
        const notifcationStatus = await checkNotificationPermission();
        setNotificationStatus(notifcationStatus);
      };
      getNotificationStatus();
    }
  }, [isVisible]);

  useEffect(() => {
    if (userProfile.data.schedule) {
      const mainData = userProfile.data.schedule;
      const startTime = mainData?.start.split(':');
      const endTime = mainData?.end.split(':');
      setFormValues({
        start_at: moment(
          new Date(2018, 11, 24, startTime[0], startTime[1], startTime[2], 0),
        ).format('YYYY-MM-DD HH:mm'),
        end_at: moment(
          new Date(2018, 11, 24, endTime[0], endTime[1], endTime[2], 0),
        ).format('YYYY-MM-DD HH:mm'),
        often: mainData?.often || 10,
      });
    }
  }, [userProfile]);

  const handleChangeValue = (stateName, value) => {
    setFormValues({
      ...values,
      [stateName]: value,
    });
  };
  const handleDecreaseTime = (stateName, time) => {
    const actualHours = moment(time).format('hh:mm A');
    if (actualHours === '11:59 PM') {
      handleChangeValue(stateName, moment(time).add(-29, 'minutes'));
    } else {
      handleChangeValue(stateName, moment(time).add(-30, 'minutes'));
    }
  };

  const handleIncreaseTime = (stateName, time) => {
    const actualHours = moment(time).format('hh:mm A');
    if (actualHours === '11:30 PM') {
      handleChangeValue(stateName, moment(time).add(29, 'minutes'));
    } else {
      handleChangeValue(stateName, moment(time).add(30, 'minutes'));
    }
  };

  function renderStartTime() {
    return moment(values.start_at).format('hh:mm A');
  }

  function renderEndTime() {
    return moment(values.end_at).format('hh:mm A');
  }

  function renderInputOften() {
    return (
      <View style={styles.ctnInput}>
        <View style={styles.leftInput}>
          <Text style={styles.txtLeftInput}>How often</Text>
        </View>
        <View style={styles.rightInput}>
          <TouchableOpacity
            style={styles.ctnSelect}
            disabled={values.often === 0}
            onPress={() => {
              handleChangeValue(
                'often',
                values.often === 0 ? 0 : values.often - 1,
              );
            }}>
            <Text
              style={[
                styles.txtDecrease,
                {color: values.often === 0 ? colors.gray : colors.red},
              ]}>
              -
            </Text>
          </TouchableOpacity>
          <View style={styles.ctnValue}>
            <Text style={styles.txtValue}>{`${values.often}x`}</Text>
          </View>
          <TouchableOpacity
            style={styles.ctnSelect}
            disabled={values.often === 15}
            onPress={() => {
              if (values.often < 15) {
                handleChangeValue('often', values.often + 1);
              }
            }}>
            <Text
              style={[
                styles.txtIncrease,
                {color: values.often === 15 ? colors.gray : colors.blue},
              ]}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderStartAt() {
    if (values.often === 0) {
      return null;
    }
    const disabledStartTime = renderStartTime() === '12:00 AM';
    const disableEndStartTime = renderStartTime() === '11:59 PM';
    return (
      <View style={styles.ctnInput}>
        <View style={styles.leftInput}>
          <Text style={styles.txtLeftInput}>
            {values.often === 1 ? 'Time' : 'Start at'}
          </Text>
        </View>
        <View style={styles.rightInput}>
          <TouchableOpacity
            style={styles.ctnSelect}
            disabled={disabledStartTime}
            onPress={() => {
              handleDecreaseTime('start_at', values.start_at);
            }}>
            <Text
              style={[
                styles.txtDecrease,
                disabledStartTime && {color: colors.gray},
              ]}>
              -
            </Text>
          </TouchableOpacity>
          <View style={styles.ctnValue}>
            <Text style={styles.txtValue}>
              {renderStartTime() === '12:00 AM'
                ? '00:00 AM'
                : renderStartTime() === '12:30 AM'
                ? '00:30 AM'
                : renderStartTime()}
            </Text>
          </View>
          <TouchableOpacity
            disabled={disableEndStartTime}
            style={styles.ctnSelect}
            onPress={() => {
              handleIncreaseTime('start_at', values.start_at);
            }}>
            <Text
              style={[
                styles.txtIncrease,
                disableEndStartTime && {color: colors.gray},
              ]}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderEndAt() {
    if (values.often < 2) {
      return null;
    }

    const disabledEndTime = renderEndTime() === '12:00 AM';
    const disableEndStartTime = renderEndTime() === '11:59 PM';
    return (
      <View style={styles.ctnInput}>
        <View style={styles.leftInput}>
          <Text style={styles.txtLeftInput}>End at</Text>
        </View>
        <View style={styles.rightInput}>
          <TouchableOpacity
            style={styles.ctnSelect}
            disabled={disabledEndTime}
            onPress={() => {
              handleDecreaseTime('end_at', values.end_at);
            }}>
            <Text
              style={[
                styles.txtDecrease,
                disabledEndTime && {color: colors.gray},
              ]}>
              -
            </Text>
          </TouchableOpacity>
          <View style={styles.ctnValue}>
            <Text style={styles.txtValue}>
              {renderEndTime() === '12:00 AM'
                ? '00:00 AM'
                : renderEndTime() === '12:30 AM'
                ? '00:30 AM'
                : renderEndTime()}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.ctnSelect}
            disabled={disableEndStartTime}
            onPress={() => {
              handleIncreaseTime('end_at', values.end_at);
            }}>
            <Text
              style={[
                styles.txtIncrease,
                disableEndStartTime && {color: colors.gray},
              ]}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderBanner() {
    return (
      <View style={styles.ctnBanner}>
        <Image source={bannerImage} style={styles.iconBanner} />
      </View>
    );
  }

  function renderContent() {
    return (
      <View style={styles.ctnRoot}>
        <View style={styles.ctnContent}>
          <HeaderButton title="Edit reminders" onPress={onClose} />
          <View style={styles.ctnFlex}>
            {renderBanner()}
            <Text style={styles.titleNoteReminder}>
              Set up your daily routine to make {'\n'}Mooti fit your habits.
            </Text>
            {renderInputOften()}
            {renderStartAt()}
            {renderEndAt()}
          </View>
          <Button
            label="Save"
            isLoading={isLoading}
            onPress={() => {
              if (isNotificationActive === false) {
                Alert.alert(
                  'You must enable notifications first to save changes.',
                  '',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        Linking.openSettings();
                      },
                    },
                  ],
                );
              } else {
                handleSaveReminder();
              }
            }}
          />
        </View>
      </View>
    );
  }

  // if (Platform.OS === 'android') {
  //   return (
  //     <RNPaper.Portal>
  //       <RNPaper.Modal
  //         visible={isVisible}
  //         animationType="fade"
  //         transparent
  //         contentContainerStyle={{flex: 1}}
  //         onDismiss={onClose}>
  //         {renderContent()}
  //       </RNPaper.Modal>
  //     </RNPaper.Portal>
  //   );
  // }

  return (
    <Portal>
      <Modal
        visible={isVisible}
        animationType="slide"
        contentContainerStyle={{flex: 1}}
        transparent
        onDismiss={onClose}>
        {renderContent()}
      </Modal>
    </Portal>
  );
}

export default connect(states)(Reminder);
