import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {updatePostbackConversionValue} from '@brigad/react-native-skadnetwork';

const setAdsConversion = async () => {
  await updatePostbackConversionValue(0);
};

const requestAdsTracking = () => {
  request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY).then(reqResult => {
    switch (reqResult) {
      case RESULTS.GRANTED:
        console.log('The permission request is granted');
        // now you can make ad requests
        setAdsConversion();
        break;
      case RESULTS.BLOCKED:
        console.log(
          'The permission request is denied and not requestable anymore',
        );
        break;
      default:
        break;
    }
  });
};

export const checkAdsTracking = () => {
  check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          requestAdsTracking();
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          // now you can make ad requests
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
        default:
          console.log('DEFAULT HAH');
          break;
      }
    })
    .catch(error => {
      console.log('ERROR CHECK TRACKING:', error);
    });
};
