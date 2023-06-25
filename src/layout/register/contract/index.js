import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  Animated,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import moment from 'moment';
import Lottie from 'lottie-react-native';
import {createAnimatableComponent} from 'react-native-animatable';
import DeviceInfo from 'react-native-device-info';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles';
import {checkDeviceRegister} from '../../../shared/request';
import {handleSubscriptionStatus} from '../../../helpers/user';
import dispatcher from './dispatcher';
import states from './states';

const ViewAnimation = createAnimatableComponent(View);

const textiOS =
  'I understand it will take months to create this new habit\nof self-reflection. I am aware of this and fully willing to\nconstruct a better version of myself, week after week,\nby following the guidance and help of Mooti.';
const textAndroid =
  'I understand it will take months to create this new habit of self-reflection. I am aware of this and fully willing to construct a better version of myself, week after week, by following the guidance and help of Mooti.';

const listData = [
  {name: '1 year', value: '12'},
  {name: '6 months', value: '6'},
  {name: '3 months', value: '3'},
];

const target = require('../../../assets/images/target.png');
const consistent = require('../../../assets/images/consistent.png');
const time = require('../../../assets/images/time.png');

const checkLottie = require('../../../assets/lottie/checklist.json');

let intervalSec = null;
let currentSec = null;

function Contract({
  values,
  substep,
  onLongPress,
  listCategory,
  handleSetProfile,
}) {
  const [isAnimateHasStarted, setAnimatedStart] = useState(false);
  const contractAnimation = useRef(new Animated.Value(0.07)).current;
  const placeholderAnimation = useRef(new Animated.Value(0.07)).current;
  const [device_id, setDeviceId] = useState(null);

  useEffect(() => {
    handlePress();
  }, []);

  // useEffect(() => {
  //   getDeviceID(device_id);
  // }, [device_id]);
  // const getDeviceID = async id => {
  //   try {
  //     const res = await checkDeviceRegister({
  //       device_id: id,
  //     });
  //     handleSetProfile(res);
  //     handleSubscriptionStatus(res.data.subscription);
  //     console.log(res);
  //   } catch (err) {
  //     console.log('Device id not register');
  //   }
  // };

  const handlePress = async () => {
    // onLongPress()
    setAnimatedStart(true);
    intervalSec = setInterval(() => {
      currentSec = currentSec === null ? 100 : currentSec + 100;
    }, 100);
    await Animated.timing(contractAnimation).stop();
    await Animated.timing(placeholderAnimation).stop();
    console.log(
      'Check press:',
      currentSec,
      4300 - currentSec,
      3400 - currentSec,
    );
    Animated.timing(contractAnimation, {
      toValue: 1,
      duration: currentSec ? 4000 - currentSec : 4000,
      useNativeDriver: true,
    }).start(cb => {
      if (cb.finished) {
        onLongPress();
        clearInterval(intervalSec);
        currentSec = null;
      }
    });
    Animated.timing(placeholderAnimation, {
      toValue: 1,
      duration: currentSec ? 3800 - currentSec : 3800,
      useNativeDriver: true,
    }).start();
  };

  const stopAnimate = () => {
    clearInterval(intervalSec);
    Animated.timing(contractAnimation, {
      toValue: 0.07,
      duration: 2000,
      useNativeDriver: true,
    }).start(cb => {
      if (cb.finished) {
        currentSec = null;
        setAnimatedStart(false);
      }
    });
    Animated.timing(placeholderAnimation, {
      toValue: 0.07,
      duration: 2100,
      useNativeDriver: true,
    }).start();
  };

  function renderText() {
    const listCategoryText = [...values.selectedCategory];
    if (listCategoryText?.length === 1) {
      return listCategoryText.map(item => (
        <Text style={styles.txtBlue}>
          {listCategory.find(ctn => ctn.id === item).name}
        </Text>
      ));
    }
    if (listCategoryText?.length > 1) {
      return listCategoryText.map((item, index) => {
        if (index === listCategoryText.length - 1) {
          return (
            <>
              {' '}
              and
              <Text style={styles.txtBlue}>{` ${
                listCategory.find(ctn => ctn.id === item).name
              }`}</Text>
            </>
          );
        }
        return (
          <Text style={styles.txtBlue}>{`${index !== 0 ? ', ' : ''}${
            listCategory.find(ctn => ctn.id === item).name
          }`}</Text>
        );
      });
    }
    return '';
  }

  function renderAnimation() {
    return (
      <View
        style={[
          styles.btnWrapper,
          values.selectedCategory?.length >= 4 && styles.moreBtm,
        ]}>
        <View style={styles.ctnAnimate}>
          <Animated.View
            style={[
              styles.altBtnWrapper,
              {transform: [{scale: placeholderAnimation}]},
            ]}
          />
          <Animated.View
            style={[
              styles.ctnButton,
              {transform: [{scale: contractAnimation}]},
            ]}
          />
        </View>
      </View>
    );
  }

  function renderButtonAnimate() {
    return (
      <View
        style={[
          styles.btnWrapper,
          values.selectedCategory?.length >= 4 && styles.moreBtm,
        ]}>
        <TouchableWithoutFeedback
          onPressOut={() => {
            console.log('CHECK onPressOut');
            stopAnimate();
          }}
          delayLongPress={300}
          onLongPress={handlePress}>
          <View style={styles.ctnText}>
            <Text style={styles.txtButton}>{'HOLD TO\nACCEPT'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  function renderGoals() {
    if (values.commit_goal) {
      return listData.find(item => item.value === values.commit_goal).name;
    }
    return '';
  }

  if (substep === 'b') {
    const userName = values.name;
    return (
      <View style={styles.ctnRoot}>
        <View style={styles.mainWrapper}>
          <ViewAnimation
            delay={200}
            style={styles.ctnTextStepA}
            animation="fadeIn"
            duration={3000}>
            <Text style={styles.txtInput}>{'Make yourself\naccountable'}</Text>
            <Text style={styles.txtNotif}>
              {`I${
                userName ? `, ${userName},` : ''
              } make a commitment to myself to uphold my own expectations by establishing a timeline and holding myself accountable to:`}
            </Text>
          </ViewAnimation>
          <View style={styles.wrapperContract}>
            <ViewAnimation
              delay={1000}
              animation="fadeIn"
              duration={2000}
              style={styles.rowContract}>
              <Image source={target} style={styles.icnContract} />
              <View style={styles.descContract}>
                <Text style={styles.txtContract}>Improving {renderText()}</Text>
              </View>
            </ViewAnimation>
            <ViewAnimation
              delay={2000}
              animation="fadeIn"
              duration={1500}
              style={styles.borderContent}
            />
            <ViewAnimation
              delay={3000}
              animation="fadeIn"
              duration={2000}
              style={styles.rowContract}>
              <Image source={consistent} style={styles.icnContract} />
              <View style={styles.descContract}>
                <Text style={styles.txtContract}>
                  Be consistent with my goals for{' '}
                  <Text style={styles.txtBlue}>{renderGoals()}</Text>
                </Text>
              </View>
            </ViewAnimation>
            <ViewAnimation
              delay={4000}
              animation="fadeIn"
              duration={1500}
              style={styles.borderContent}
            />
            <ViewAnimation
              delay={5000}
              animation="fadeIn"
              duration={3000}
              style={styles.rowContract}>
              <Image source={time} style={styles.icnContract} />
              <View style={styles.descContract}>
                <Text style={styles.txtContract}>
                  Reflect
                  <Text style={styles.txtBlue}>{` ${values.often}x `}</Text>a
                  day
                  {'\n'}
                  between
                  <Text style={styles.txtBlue}>{` ${moment(
                    values.start_at,
                  ).format('hh:mm A')} `}</Text>
                  and
                  <Text style={styles.txtBlue}>{` ${moment(
                    values.end_at,
                  ).format('hh:mm A')} `}</Text>
                </Text>
              </View>
            </ViewAnimation>

            <ViewAnimation
              delay={6000}
              animation="fadeIn"
              duration={1500}
              style={styles.borderContent}
            />
          </View>
          <ViewAnimation
            delay={7000}
            animation="fadeIn"
            duration={1500}
            style={styles.ctnDesc}>
            <Text style={styles.txtDesc}>
              {Platform.OS === 'android' ? textAndroid : textiOS}
            </Text>
          </ViewAnimation>
        </View>
        <View style={styles.ctnMore} />
        <ViewAnimation delay={8000} animation="bounceIn" duration={2000}>
          {/* <ViewAnimation> */}
          {renderAnimation()}
          {renderButtonAnimate()}
        </ViewAnimation>
      </View>
    );
  }
  return (
    <View style={styles.ctnRootCenter}>
      <View style={styles.ctnTextStepA}>
        <Text style={styles.txtInput}>Creating a contract with yourself</Text>
      </View>
      <View style={styles.ctnChecklist}>
        <View style={styles.iconBanner}>
          <Lottie
            source={checkLottie}
            style={styles.animationStyle}
            autoPlay
            duration={2300}
            loop={false}
          />
        </View>
      </View>
    </View>
  );
}
Contract.propTypes = {
  handleSetProfile: PropTypes.func.isRequired,
};
export default connect(states, dispatcher)(Contract);
