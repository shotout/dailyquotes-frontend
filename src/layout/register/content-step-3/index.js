import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import styles from './styles';
import {colors} from '../../../shared/styling';

const bannerImage = require('../../../assets/images/notification_app.png');
const activateNotification = require('../../../assets/images/notification_step2.png');
const bannerHomeWidget = require('../../../assets/images/widget_home.png');
const bannerLockscreenWidget = require('../../../assets/images/lock_screen_widget.png');

export default function ContentStep3({values, handleChangeValue, contentStep}) {
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

  function getBannerContent() {
    if (contentStep === 4) {
      return bannerLockscreenWidget;
    }
    if (contentStep === 3) {
      return bannerHomeWidget;
    }
    if (contentStep === 2) {
      return activateNotification;
    }
    return bannerImage;
  }

  function getBannerStyle() {
    if (contentStep === 3 || contentStep === 4) {
      return styles.ctnBannerAlt;
    }
    return {};
  }

  function renderBanner() {
    return (
      <View style={[styles.ctnBanner, getBannerStyle()]}>
        <Image source={getBannerContent()} style={styles.iconBanner} />
      </View>
    );
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

  function renderInput() {
    if (contentStep === 4) {
      return (
        <View style={styles.inputWrapper}>
          <Text style={styles.txtInput}>New for iOS 16:</Text>
          <View style={styles.ctnCenter}>
            {renderBanner()}
            <Text style={styles.txtNotif}>
              {
                'Add Lock Screen Widgets and see your\nquotes directly on the Lock Screen.\n\nTouch and hold anywhere on your Lock\nScreen to quickly add and customize your\nWidgets.\n\nYou can find further information on how to\nactivate the Lock Screen Widgets inside the\nApp under '
              }
              <Text style={styles.txtBlod}>
                {'Settings > Lock Screen Widgets'}
              </Text>
              {'\nwhere you can find a simple tutorial.'}
            </Text>
          </View>
        </View>
      );
    }
    if (contentStep === 3) {
      return (
        <View style={styles.inputWrapper}>
          <Text style={styles.txtInput}>
            {'Add a Widget to your\nHome Screen'}
          </Text>
          <View style={styles.ctnCenter}>
            {renderBanner()}
            <Text style={styles.txtNotif}>
              {`From the Home Screen, touch and hold an\nempty area to customize your screen.\n\nThen tap the + button in the upper corner to\nadd the Widget.`}
            </Text>
          </View>
        </View>
      );
    }
    if (contentStep === 2) {
      return (
        <View style={styles.inputWrapper}>
          <Text style={styles.txtInput}>
            90% more successful with notifications
          </Text>
          <View style={styles.ctnCenter}>
            {renderBanner()}
            <Text style={styles.txtNotif}>
              {`Users who receive notifications with\nshort updates are more likely to form\na routine and reach their goals!`}
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>
          Get notified to stay on track with your goals.
        </Text>
        {renderInputOften()}
        {renderStartAt()}
        {renderEndAt()}
      </View>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      {contentStep === 1 && renderBanner()}
      {renderInput()}
    </View>
  );
}
