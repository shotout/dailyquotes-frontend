import React from 'react';
import {Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../styling';

const imgWidget1 = require('../../assets/images/tutorial_widget_1.png');
const imgWidget2 = require('../../assets/images/tutorial_widget_2.png');
const imgWidget3 = require('../../assets/images/tutorial_widget_3.png');
const imgWidget4 = require('../../assets/images/tutorial_widget_4.png');
const imgWidget5 = require('../../assets/images/tutorial_widget_5.png');

const imgLockScreenWidget1 = require('../../assets/images/lock_screen_widget_1.png');
const imgLockScreenWidget2 = require('../../assets/images/lock_screen_widget_2.png');
const imgLockScreenWidget3 = require('../../assets/images/lock_screen_widget_3.png');
const imgLockScreenWidget4 = require('../../assets/images/lock_screen_widget_4.png');
const imgLockScreenWidget5 = require('../../assets/images/lock_screen_widget_5.png');
const imgLockScreenWidget6 = require('../../assets/images/lock_screen_widget_6.png');

export const listTutorialWidget = [
  {
    description:
      'Hold down any app your home screen to edit.\nYour apps will start to jiggle.',
    banner: imgWidget1,
  },
  {
    description:
      'Tap the “+” button on top of your screen to see\navailable widgets.',
    banner: imgWidget2,
  },
  {
    description:
      'Scroll down or search for Mooti. Tap on it to see\nthe available formats.',
    banner: imgWidget3,
  },
  {
    descriptionCustom: () => (
      <Text
        style={{
          fontFamily: fonts.InterRegular,
          color: '#000',
          textAlign: 'center',
          fontSize: moderateScale(14),
          lineHeight: moderateScale(22),
        }}>
        {'Once you chose your desired format, tap on '}
        <Text style={{fontFamily: fonts.InterBold}}>“Add Widget”</Text>
        {' and simply drag and drop to the desired position on your screen.'}
      </Text>
    ),
    banner: imgWidget4,
  },
  {
    descriptionCustom: () => (
      <Text
        style={{
          fontFamily: fonts.InterRegular,
          color: '#000',
          textAlign: 'center',
          fontSize: moderateScale(14),
          lineHeight: moderateScale(22),
        }}>
        {'Tap '}
        <Text style={{fontFamily: fonts.InterBold}}>“Done”</Text>
        {
          ' and you’re all set! You can now see\nthe Mooti Widget on your screen.'
        }
      </Text>
    ),
    banner: imgWidget5,
  },
];
export const listTutorialLockscreenWidget = [
  {
    description:
      'Hold down anywhere on your lock screen to edit.\nYour screen will start to zoom out.',
    banner: imgLockScreenWidget1,
  },
  {
    descriptionCustom: () => (
      <Text
        style={{
          fontFamily: fonts.InterRegular,
          color: '#000',
          textAlign: 'center',
          fontSize: moderateScale(14),
          lineHeight: moderateScale(22),
        }}>
        {'Tap the '}
        <Text style={{fontFamily: fonts.InterBold}}>“Customize”</Text>
        {' button. An '}
        <Text style={{fontFamily: fonts.InterBold}}>“Add Widget”</Text>
        {'\nbutton will appear below your clock.'}
      </Text>
    ),
    banner: imgLockScreenWidget2,
  },
  {
    descriptionCustom: () => (
      <Text
        style={{
          fontFamily: fonts.InterRegular,
          color: '#000',
          textAlign: 'center',
          fontSize: moderateScale(14),
          lineHeight: moderateScale(22),
        }}>
        {'Tap '}
        <Text style={{fontFamily: fonts.InterBold}}>“Add Widget”</Text>
        {' to see your available\nApps and Widgets.'}
      </Text>
    ),
    banner: imgLockScreenWidget3,
  },
  {
    descriptionCustom: () => (
      <Text
        style={{
          fontFamily: fonts.InterRegular,
          color: '#000',
          textAlign: 'center',
          fontSize: moderateScale(14),
          lineHeight: moderateScale(22),
        }}>
        {'Scroll down and search for the '}
        <Text style={{fontFamily: fonts.InterBold}}>“Mooti”</Text>
        {' Widget.\nSelect it and choose your favorite format.'}
      </Text>
    ),
    banner: imgLockScreenWidget4,
  },
  {
    description:
      'You can add up to two Widgets by tapping on it or dragging it directly to your screen.',
    banner: imgLockScreenWidget5,
  },
  {
    descriptionCustom: () => (
      <Text
        style={{
          fontFamily: fonts.InterRegular,
          color: '#000',
          textAlign: 'center',
          fontSize: moderateScale(14),
          lineHeight: moderateScale(22),
        }}>
        {'Tap '}
        <Text style={{fontFamily: fonts.InterBold}}>“Done”</Text>
        {
          ' and you’re all set! The Mooti Widget\nwill appear on your Lock Screen.'
        }
      </Text>
    ),
    banner: imgLockScreenWidget6,
  },
];
