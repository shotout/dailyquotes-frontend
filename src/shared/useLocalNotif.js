import {useEffect, useState} from 'react';
import notifee, {TriggerType} from '@notifee/react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFutureDate,
  dateToUnix,
  isCompletedOnboarding,
} from '../helpers/user';
import {getNotifQuotes} from './request';

function useLocalNotif(userProfile) {
  const scheduleTime = userProfile.data?.schedule?.timer_local || [];
  const scheduleObj = userProfile.data.schedule;
  const [listTimer, setTimer] = useState(scheduleTime);
  const [currentTimezone, setTimezone] = useState(scheduleObj.timezone);

  const cancelAllNotification = () => {
    notifee.getTriggerNotificationIds().then(async ids => {
      console.log('Clear all notification', ids);
      if (ids.length > 0) {
        ids.forEach(idNotification => {
          notifee.cancelTriggerNotification(idNotification);
        });
      }
    });
  };

  const fetchListing = () =>
    new Promise(async resolve => {
      const res = await getNotifQuotes({length: scheduleTime.length || 0});
      resolve(res.data.data);
    });

  const triggerNotification = async (userTime, quoteObj) => {
    // Create a time-based trigger
    try {
      const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: userTime.getTime(), // fire at 11:10am (10 minutes before meeting)
      };

      const channelId = await notifee.createChannel({
        id: 'quote',
        name: 'Quote Channel',
        sound: 'circle.mp3',
      });
      await notifee.createTriggerNotification(
        {
          title: quoteObj.author || undefined,
          body: quoteObj.title,
          data: {id: (quoteObj.id || '').toString()},
          android: {
            channelId,
            smallIcon: 'ic_small_notif', // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
              id: 'default',
            },
            sound: 'circle.mp3',
          },
        },

        trigger,
      );
    } catch (err) {
      console.log('Error schedule:', err, userTime);
    }
  };

  const setScheduleNotif = async () => {
    try {
      if (scheduleTime && scheduleTime.length > 2) {
        cancelAllNotification();
        const listQuote = await fetchListing();

        const currentDate = getFutureDate(new Date(), 0);
        const item0 = dateToUnix(
          moment(
            `${currentDate} ${scheduleObj.start}`,
            'YYYY-MM-DD HH:mm',
          ).format('YYYY-MM-DD HH:mm'),
        );
        const item1 = dateToUnix(
          moment(
            `${currentDate} ${scheduleObj.end}`,
            'YYYY-MM-DD HH:mm',
          ).format('YYYY-MM-DD HH:mm'),
        );
        const compareDate = (item1 - item0) / scheduleTime.length / 60;
        if (compareDate < 6) {
          scheduleTime.forEach((item, index) => {
            const quoteObj = listQuote[index];
            const today = new Date();
            const normalizeDate = moment(
              `${currentDate} ${item}`,
              'YYYY-MM-DD HH:mm',
            ).format('YYYY-MM-DD HH:mm');
            const notificationTime = new Date(normalizeDate);
            if (notificationTime > today) {
              console.log('Trigger notif at:', item);
              triggerNotification(notificationTime, quoteObj);
            }
          });
        }
      }
    } catch (err) {
      console.log('ERROR SETSCHEDULE NOTIF:', err);
    }
  };
  // console.log('Check theme :', scheduleTime);

  useEffect(() => {
    if (isCompletedOnboarding()) {
      const handleLocalNotification = async () => {
        try {
          // console.log('Schedule change:', listTimer);
          const settedDate = await AsyncStorage.getItem('lastLocalNotifSet');
          const currentDate = getFutureDate(new Date(), 0);
          const compareItem =
            (listTimer || '').toString() !==
            (userProfile.data?.schedule?.timer_local || []).toString();
          const isTimezoneChange =
            userProfile.data.schedule.timezone !== currentTimezone;
          if (compareItem || settedDate !== currentDate || isTimezoneChange) {
            if (isTimezoneChange) {
              setTimezone(userProfile.data.schedule.timezone);
            }
            AsyncStorage.setItem('lastLocalNotifSet', currentDate);
            console.log('NOTIF SETTED');
            setTimer(userProfile.data?.schedule?.timer_local);
            setScheduleNotif();
          }
        } catch (err) {
          console.log('Error handleLocalNotification:', err);
        }
      };
      handleLocalNotification();
    }
  }, [userProfile.data.schedule]);
  return [scheduleTime];
}

export default useLocalNotif;
