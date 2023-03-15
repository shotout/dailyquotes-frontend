import notifee, {AuthorizationStatus} from '@notifee/react-native';

export const requestUserPermission = async () => {
  const settings = await notifee.requestPermission();
  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    console.log('Permission settings:', settings);
  } else {
    console.log('User declined permissions');
  }
};

export async function checkNotificationPermission() {
  try {
    const settings = await notifee.getNotificationSettings();
    if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      return true;
    }
  } catch (err) {
    console.log('Err notif permission:', err);
  }
  return false;
}
