import React, {useEffect, useState} from 'react';
import {View, Button} from 'react-native';
import notifee, {TriggerType} from '@notifee/react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import states from './states';
import {getFutureDate, dateToUnix} from '../../helpers/user';
import {getNotifQuotes} from '../../shared/request';

function NotificationTester({userProfile}) {
  async function onDisplayNotification() {
    try {
      // Request permissions (required for iOS)
      await notifee.requestPermission();

      // Create a channel (required for Android)
      await notifee.createChannel({
        id: 'quote',
        name: 'Quote Channel',
        sound: 'circle.mp3',
      });

      // Display a notification
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        data: {type: 'paywall', placement: 'in_app_paywall'},
      });
    } catch (err) {
      console.log('Err display:', err);
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />
    </View>
  );
}

export default connect(states)(NotificationTester);
