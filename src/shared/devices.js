import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const isIphone = Platform.OS === 'ios';

export const isIphoneXorAbove = () => isIphone && DeviceInfo.hasNotch();
export const isIphone14Pro = DeviceInfo.hasDynamicIsland();
