import React, {useEffect, useState} from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import notifee from '@notifee/react-native';
import DeviceInfo from 'react-native-device-info';
import {changeIcon} from 'react-native-change-icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Purchasely from 'react-native-purchasely';

import Lottie from 'lottie-react-native';
import TimeZone from 'react-native-timezone';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {createAnimatableComponent} from 'react-native-animatable';
import Button from '../../components/button';
import ModalIconChanged from '../../components/modal-icon-changed';
import ContentName from '../../layout/register/content-step-1';
import ContentGender from '../../layout/register/content-step-2';
import ContentNotification from '../../layout/register/content-step-3';
import ContentStep5 from '../../layout/register/content-step-5';
import ContentStep6 from '../../layout/register/content-step-6';
import ContentStep7 from '../../layout/register/content-step-7';
import HeaderStep from '../../layout/register/header-step';
import styles from './styles';
import states from './states';
import dispatcher from './dispatcher';
import {
  checkDeviceRegister,
  postRegister,
  selectTheme,
  setSubcription,
  updateProfile,
} from '../../shared/request';
import {reset} from '../../shared/navigationRef';
import {
  handlePayment,
  handleSubscriptionStatus,
  iconNameToId,
  openPrivacyPolicy,
  openTermsofUse,
  reloadUserProfile,
  handlePaymentTwo,
} from '../../helpers/user';
import LoadingIndicator from '../../components/loading-indicator';
import {eventTracking, ONBOARDING_COMPLETE} from '../../helpers/eventTracking';
import {isIphoneXorAbove} from '../../shared/devices';
import ChangeLife from '../../layout/register/change-life';
import ChooseCommitment from '../../layout/register/choose-commitment';
import Contract from '../../layout/register/contract';
import {
  setCounterNumber,
  showLoadingModal,
  storeRegistrationData,
} from '../../store/defaultState/actions';
import {sizing} from '../../shared/styling';

const registerBackground = require('../../assets/images/background_register.png');
const Convetti = require('../../assets/lottie/hello.json');

const AnimateAbleTouch = createAnimatableComponent(View);

function Register({
  handleSetProfile,
  defaultData,
  fetchListQuote,
  fetchCollection,
  registerData,
}) {
  const isIpad = DeviceInfo.getSystemName() === 'iPadOS' || Platform.isPad;
  const [isInitial, setInitial] = useState(true);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [isHasRegister, setHasRegister] = useState(false);
  const [registerStep, setRegisterStep] = useState(1);
  const [substep, setSubstep] = useState('a');
  const [notificationStep, setNotificationStep] = useState(1);
  const [toggleRandomCategories, setToggleRandomCategories] = useState(false);
  const [showModalIcon, setShowModalIcon] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [mutateForm, setMutateForm] = useState({
    style: 1,
    fcm_token: null,
    purchasely_id: null,
    device_id: null,
  });
  const [values, setFormValues] = useState({
    name: '',
    gender: '',
    start_at: moment(new Date(2018, 11, 24, 8, 0, 0, 0)).format(
      'YYYY-MM-DD HH:mm',
    ),
    end_at: moment(new Date(2018, 11, 24, 20, 0, 0, 0)).format(
      'YYYY-MM-DD HH:mm',
    ),
    often: 15,
    selectedFeeling: [],
    causeFeeling: [],
    selectedCategory: [],
    // selectedCategory: defaultData.areas,
    isAnytime: null,
    specific_goal: null,
    important_change: null,
    commit_goal: '12',
  });
  const handleAfterRegister = async () => {
    console.log('AFter register called');
    showLoadingModal();
    await fetchListQuote();
    await fetchCollection();
    eventTracking(ONBOARDING_COMPLETE);
    reset('MainPage', {isFromOnboarding: false});
    setLoading(false);
    setCounterNumber(99);
  };

  useEffect(() => {
    const handleInitial = async () => {
      setSubstep(registerData?.substep || substep);
      setRegisterStep(registerData?.registerStep || registerStep);
      setMutateForm(registerData?.mutateForm || mutateForm);
      setFormValues(registerData?.values || values);
      setHasRegister(registerData?.isHasRegister || isHasRegister);
      setNotificationStep(registerData?.notificationStep || notificationStep);
      setInitial(false);
      if (
        registerData &&
        registerData.registerStep &&
        registerData.registerStep === 8 &&
        registerData.substep === 'a'
      ) {
        nextStepAnimate();
      }
      await AsyncStorage.removeItem('isFinishTutorial');
    };

    DeviceInfo.getUniqueId().then(async uniqueId => {
      try {
        console.log('Device info running', uniqueId);
        const fcmToken = await messaging().getToken();
        const isSetBefore = await AsyncStorage.getItem('customIcon');
        const id = await Purchasely.getAnonymousUserId();
        setMutateForm({
          ...mutateForm,
          fcm_token: fcmToken,
          device_id: uniqueId,
          // device_id: Date.now().toString(),
          style: iconNameToId(isSetBefore),
          purchasely_id: id,
        });
      } catch (err) {
        console.log('Err get device info:', err);
      }
    });
    handleInitial();
    const backAction = () => {
      console.log('Back press');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (registerStep === 8) {
      const getDeviceID = async () => {
        try {
          const timeZone = await TimeZone.getTimeZone();
          const payload = {
            ...mutateForm,
            name: values.name,
            anytime: values.isAnytime,
            often: values.often,
            start: moment(values.start_at).format('HH:mm'),
            end: moment(values.end_at).format('HH:mm'),
            gender: values.gender,
            feel: values.selectedFeeling.length
              ? values.selectedFeeling[0]
              : null,
            ways: values.causeFeeling,
            areas: values.selectedCategory,
            timezone: timeZone,
          };
          const res = await checkDeviceRegister({
            device_id: mutateForm.device_id,
          });
          setHasRegister(true);
          handleSetProfile(res);
          handleSubscriptionStatus(res.data.subscription);
          fetchListQuote();
          fetchCollection();
          handlePaymentTwo('onboarding');
          if (res.data.subscription.type === 1 && res.data.themes[0].id !== 6) {
            await selectTheme({
              _method: 'PATCH',
              themes: [6],
            });
          }
          await updateProfile({
            ...payload,
            _method: 'PATCH',
          });
          setTimeout(() => {
            reloadUserProfile();
          }, 2000);
        } catch (err) {
          console.log('Device id not register new');
          handleSubmitRegist(true);
        }
      };
      getDeviceID();
    } else if (registerStep === 9) {
      const getDeviceID = async () => {
        try {
          const timeZone = await TimeZone.getTimeZone();
          const payload = {
            ...mutateForm,
            name: values.name,
            anytime: values.isAnytime,
            often: values.often,
            start: moment(values.start_at).format('HH:mm'),
            end: moment(values.end_at).format('HH:mm'),
            gender: values.gender,
            feel: values.selectedFeeling.length
              ? values.selectedFeeling[0]
              : null,
            ways: values.causeFeeling,
            areas: values.selectedCategory,
            timezone: timeZone,
          };
          const res = await checkDeviceRegister({
            device_id: mutateForm.device_id,
          });
          setHasRegister(true);
          handleSetProfile(res);
          handleSubscriptionStatus(res.data.subscription);
          setTimeout(() => {
            handlePayment('onboarding', () => {
              reset('MainPage', {isFromOnboarding: true});
            });
          }, 200);

          if (res.data.subscription.type === 1 && res.data.themes[0].id !== 6) {
            await selectTheme({
              _method: 'PATCH',
              themes: [6],
            });
          }
          await updateProfile({
            ...payload,
            _method: 'PATCH',
          });
          setTimeout(() => {
            reloadUserProfile();
          }, 2000);
        } catch (err) {
          console.log('Device id not register');
          handleSubmit(true);
        }
      };
      getDeviceID();
    }
  }, [registerStep]);

  useEffect(() => {
    if (!isInitial) {
      storeRegistrationData({
        substep,
        registerStep,
        mutateForm,
        values,
        isHasRegister,
        notificationStep,
      });
    }
  }, [
    substep,
    registerStep,
    mutateForm,
    values,
    isHasRegister,
    notificationStep,
    isInitial,
  ]);

  const handleSubmit = async showPaywall => {
    try {
      setLoading(true);

      const timeZone = await TimeZone.getTimeZone();
      const payload = {
        ...mutateForm,
        name: 'User',
        anytime: null,
        often: 15,
        start: '08:00',
        end: '20:00',
        gender: '',
        feel: 6,
        ways: [6],
        areas: [1, 2, 3, 4, 5, 6, 7, 8],
        timezone: timeZone,
      };
      const res = await postRegister(payload);
      handleSetProfile(res);
      if (res.data.subscription.type === 1 && res.data.themes[0].id !== 6) {
        await selectTheme({
          _method: 'PATCH',
          themes: [6],
        });
      }
      if (showPaywall) {
        await handlePayment('onboarding');
      }
      setHasRegister(true);
      await AsyncStorage.setItem('isFinishTutorial', 'yes');
      handleAfterRegister();
      setTimeout(() => {
        reloadUserProfile();
      }, 2000);
      eventTracking(ONBOARDING_COMPLETE);
    } catch (err) {
      console.log('Error register:', err);
      setLoading(false);
    }
  };

  const handleSubmitRegist = async showPaywall => {
    try {
      const timeZone = await TimeZone.getTimeZone();
      const payload = {
        ...mutateForm,
        name: values.name,
        anytime: values.isAnytime,
        often: values.often,
        start: moment(values.start_at).format('HH:mm'),
        end: moment(values.end_at).format('HH:mm'),
        gender: values.gender,
        feel: values.selectedFeeling.length ? values.selectedFeeling[0] : null,
        ways: values.causeFeeling,
        areas: values.selectedCategory,
        timezone: timeZone,
      };
      const res = await postRegister(payload);
      handleSetProfile(res);
      if (res.data.subscription.type === 1 && res.data.themes[0].id !== 6) {
        await selectTheme({
          _method: 'PATCH',
          themes: [6],
        });
      }

      await handlePaymentTwo('onboarding');

      await AsyncStorage.setItem('isFinishTutorial', 'no');
      setTimeout(() => {
        reloadUserProfile();
      }, 2000);
      const getDeviceID = async () => {
        try {
          const timeZone = await TimeZone.getTimeZone();
          const payload = {
            ...mutateForm,
            name: values.name,
            anytime: values.isAnytime,
            often: values.often,
            start: moment(values.start_at).format('HH:mm'),
            end: moment(values.end_at).format('HH:mm'),
            gender: values.gender,
            feel: values.selectedFeeling.length
              ? values.selectedFeeling[0]
              : null,
            ways: values.causeFeeling,
            areas: values.selectedCategory,
            timezone: timeZone,
          };
          const res = await checkDeviceRegister({
            device_id: mutateForm.device_id,
          });
          handleSetProfile(res);
          handleSubscriptionStatus(res.data.subscription);
          if (res.data.subscription.type === 1 && res.data.themes[0].id !== 6) {
            await selectTheme({
              _method: 'PATCH',
              themes: [6],
            });
          }
          await updateProfile({
            ...payload,
            _method: 'PATCH',
          });
          setTimeout(() => {
            reloadUserProfile();
          }, 2000);
        } catch (err) {}
      };
      getDeviceID();
    } catch (err) {
      console.log('Error register:', err);
    }
  };

  function getStatusDisable() {
    if (registerStep === 5 && !values.commit_goal) {
      return true;
    }
    if (registerStep === 1) {
      if (substep === 'b') {
        return false;
      }
      if (!values.name) {
        return true;
      }
    }
    if (registerStep === 3 && !values.selectedCategory.length) {
      return true;
    }
    return false;
  }

  function getLabelDarkButton() {
    if (registerStep === 7) {
      if (notificationStep === 2) {
        return 'Ok, let’s do it!';
      }
      if (notificationStep === 3 || notificationStep === 4) {
        return 'Got it!';
      }
    }
    // if (registerStep === 4) {
    //   return 'Got it!';
    // }
    return 'Continue';
  }

  function getLabelSkip() {
    if (registerStep === 7) {
      if (notificationStep === 2) {
        return 'I’m not ready yet';
      }
      return 'Motivate me any time';
    }
    if (registerStep === 3) {
      return 'I want to improve everything';
    }
    return 'Skip for now';
  }

  const handleChangeIconStep = async () => {
    const initialIcon = await AsyncStorage.getItem('customIcon');
    let iconName = initialIcon;
    switch (mutateForm.style) {
      case 2:
        iconName = 'second';
        break;
      case 3:
        iconName = 'third';
        break;
      case 4:
        iconName = 'fourth';
        break;
      default:
        iconName = 'first';
        break;
    }
    if (initialIcon === iconName) {
      setRegisterStep(registerStep + 1);
    } else {
      changeIcon(iconName)
        .then(async () => {
          setRegisterStep(registerStep + 1);
          await AsyncStorage.setItem('customIcon', iconName);
          if (Platform.OS === 'android') {
            setShowModalIcon(mutateForm.style);
          }
        })
        .catch(e => {
          console.log('Error change icon:', e.message);
          setRegisterStep(registerStep + 1);
        });
    }
  };

  const nextStepAnimate = () => {
    setTimeout(() => {
      setSubstep('b');
    }, 2300);
  };

  const handleContinueStep = async () => {
    if (registerStep === 1) {
      if (substep === 'a') {
        setSubstep('b');
        Keyboard.dismiss();
      } else {
        setRegisterStep(registerStep + 1);
        setSubstep('a');
      }
    } else if (registerStep === 7) {
      // FOR WIDGET  CONDITION
      // if (notificationStep === 4) {
      //   setRegisterStep(8);
      //   setSubstep('a');
      //   nextStepAnimate();
      // } else if (notificationStep === 3) {
      //   setNotificationStep(4);
      // } else if (notificationStep === 2) {
      //   const settings = await notifee.requestPermission();
      //   setNotificationStep(3);
      // } else {
      //   setNotificationStep(2);
      // }
      if (notificationStep === 2) {
        const settings = await notifee.requestPermission();
        setRegisterStep(8);
        setSubstep('a');
        nextStepAnimate();
      } else {
        setNotificationStep(2);
      }
    } else if (registerStep === 5) {
      setRegisterStep(registerStep + 1);
      setSubstep('a');
    } else if (registerStep === 6) {
      if (substep === 'a') {
        if (!values.selectedFeeling.length) {
          setRegisterStep(7);
        } else {
          setSubstep('b');
        }
      } else {
        setRegisterStep(7);
      }
    } else if (registerStep === 8) {
      setRegisterStep(registerStep + 1);
    } else {
      setRegisterStep(registerStep + 1);
      setSubstep('a');
    }
  };

  const handleChangeValue = (stateName, value) => {
    setFormValues({
      ...values,
      [stateName]: value,
    });
    if (stateName === 'gender') {
      setTimeout(() => {
        setRegisterStep(registerStep + 1);
      }, 300);
    }
  };

  // useEffect(() => {
  //   if (registerData) {
  //     setRegisterStep(registerData?.registerStep);
  //   }
  // }, [registerData]);

  const handleSkipBtn = async () => {
    if (registerStep === 1) {
      if (substep === 'a') {
        setSubstep('b');
        Keyboard.dismiss();
      } else {
        setRegisterStep(registerStep + 1);
        setSubstep('a');
      }
    } else if (registerStep === 7) {
      handleChangeValue('isAnytime', 1);
      // FOR WIDGET QUOTE
      // if (notificationStep === 4) {
      //   setRegisterStep(8);
      //   setSubstep('a');
      //   nextStepAnimate();
      // } else {
      //   setNotificationStep(notificationStep + 1);
      // }
      if (notificationStep === 2) {
        setRegisterStep(8);
        setSubstep('a');
        nextStepAnimate();
      } else {
        setNotificationStep(notificationStep + 1);
      }
    } else if (registerStep === 3) {
      setRegisterStep(registerStep + 1);
      handleChangeValue(
        'selectedCategory',
        defaultData.areas.map(item => item.id),
      );
    } else {
      setRegisterStep(registerStep + 1);
      setSubstep('a');
    }
  };

  function renderContent() {
    if (registerStep === 9) {
      // return (
      //   <ContentStep8
      //     onClose={() => {
      //       handleSubmit();
      //     }}
      //   />
      // );
      return <LoadingIndicator fullscreen />;
    }
    if (registerStep === 8) {
      return (
        <Contract
          values={values}
          substep={substep}
          listCategory={defaultData.areas}
          onLongPress={handleContinueStep}
        />
      );
    }
    if (registerStep === 7) {
      return (
        <ContentNotification
          values={values}
          contentStep={notificationStep}
          handleChangeValue={handleChangeValue}
        />
      );
    }
    if (registerStep === 6) {
      if (substep === 'a') {
        return (
          <ContentStep5
            listData={defaultData.feeling}
            userName={values.name}
            initialData={values.selectedFeeling}
            onSelect={value => {
              handleChangeValue('selectedFeeling', value);
            }}
          />
        );
      }
      return (
        <ContentStep6
          listData={defaultData.ways}
          initialData={values.causeFeeling}
          onSelect={value => {
            handleChangeValue('causeFeeling', value);
          }}
        />
      );
    }
    if (registerStep === 5) {
      return (
        <ChangeLife
          important_change={values.important_change}
          onPress={value => {
            handleChangeValue('important_change', value);
            setTimeout(() => {
              setRegisterStep(registerStep + 1);
            }, 500);
          }}
        />
      );
    }
    if (registerStep === 4) {
      return (
        <ChooseCommitment
          onPress={value => {
            handleChangeValue('commit_goal', value);
            // setTimeout(() => {
            //   setRegisterStep(registerStep + 1);
            // }, 500);
          }}
          commit_goal={values.commit_goal}
        />
      );
    }
    // if (registerStep === 4) {
    //   return <ContentStepWidget />;
    // }
    if (registerStep === 3) {
      return (
        <ContentStep7
          substep={substep}
          listData={defaultData.areas}
          initialCategory={values.selectedCategory}
          specific_goal={values.specific_goal}
          toggleRandomCategories={toggleRandomCategories}
          setOffToggleCategories={() => {
            setToggleRandomCategories(false);
          }}
          onPressGoals={value => {
            handleChangeValue('specific_goal', value);
            setTimeout(() => {
              setSubstep('b');
            }, 500);
          }}
          onSelect={value => {
            handleChangeValue('selectedCategory', value);
          }}
        />
      );
    }
    if (registerStep === 2) {
      return (
        <ContentGender
          name={values.name}
          selectedGender={values.gender}
          handleSelect={handleChangeValue}
        />
      );
    }
    return (
      <ContentName
        keyboardShow={keyboardShow}
        value={values.name}
        substep={substep}
        onSubmitEditing={handleContinueStep}
        onChangeText={name => {
          setFormValues({
            ...values,
            name,
          });
        }}
      />
    );
  }

  function renderBottomButton() {
    if (registerStep === 8) {
      return (
        <View style={styles.ctnRow}>
          <TouchableOpacity style={styles.btnTerms} onPress={openTermsofUse}>
            <Text style={styles.txtTerms}>Terms & Conditions</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.btnTerms}>
            <Text style={styles.txtTerms}>Already a member?</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.btnTerms} onPress={openPrivacyPolicy}>
            <Text style={styles.txtTerms}>Privacy policy</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (registerStep === 7 && notificationStep === 2) {
      return (
        <TouchableOpacity style={styles.btnSkip} onPress={handleSkipBtn}>
          <Text style={styles.txtSkip}>{getLabelSkip()}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  function renderSkipButton() {
    if (
      registerStep === 4 ||
      registerStep === 5 ||
      registerStep === 6 ||
      (registerStep === 7 && notificationStep !== 1)
    ) {
      return null;
    }
    if (registerStep === 1 && substep === 'b') {
      return null;
    }
    if (registerStep === 8) {
      return (
        <Text style={styles.txtSubscription}>
          3 days free, then just USD 19.99/year
        </Text>
      );
    }
    return (
      <TouchableOpacity style={styles.btnSkip} onPress={handleSkipBtn}>
        <Text style={styles.txtSkip}>{getLabelSkip()}</Text>
      </TouchableOpacity>
    );
  }

  function renderButton(ctnStyle) {
    if (registerStep === 8 || registerStep === 5 || registerStep === 9) {
      return null;
    }
    if (registerStep === 3 && substep === 'a') {
      return null;
    }
    if (registerStep === 2) {
      return (
        <View style={[styles.btnWrapper, ctnStyle]}>
          <TouchableOpacity
            style={styles.btnSkip}
            onPress={() => {
              handleChangeValue('gender', '');
            }}>
            <Text style={styles.txtSkip}>Prefer not to say</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (registerStep === 1 && substep === 'b') {
      return (
        <AnimateAbleTouch
          animation="fadeIn"
          duration={500}
          delay={800}
          style={[styles.btnWrapper, ctnStyle]}>
          {renderSkipButton()}
          <Button
            btnStyle={[
              styles.btnContinue,
              notificationStep === 2 && registerStep === 7 && styles.noMgBtm,
            ]}
            label={getLabelDarkButton()}
            isDisable={getStatusDisable()}
            onPress={handleContinueStep}
            isLoading={isLoading}
          />
          {renderBottomButton()}
        </AnimateAbleTouch>
      );
    }
    return (
      <View style={[styles.btnWrapper, ctnStyle]}>
        {renderSkipButton()}
        <Button
          btnStyle={[
            styles.btnContinue,
            notificationStep === 2 && registerStep === 7 && styles.noMgBtm,
          ]}
          label={getLabelDarkButton()}
          isDisable={getStatusDisable()}
          onPress={handleContinueStep}
          isLoading={isLoading}
        />
        {renderBottomButton()}
      </View>
    );
  }
  // if (isIphoneXorAbove()) {
  //   return (
  //     <View style={styles.ctnRoot}>
  //       <HeaderStep currentStep={registerStep} />
  //       {renderContent()}
  //       {renderButton()}
  //       <ModalIconChanged
  //         isVisible={showModalIcon !== false}
  //         selectedIcon={showModalIcon}
  //         onClose={() => {
  //           setShowModalIcon(false);
  //         }}
  //       />
  //     </View>
  //   );
  // }

  function renderAnimation() {
    if (registerStep === 1 && substep === 'b') {
      return (
        <View style={styles.ctnConvetti}>
          <Lottie
            source={Convetti}
            style={styles.animationStyle}
            autoPlay
            loop={false}
          />
        </View>
      );
    }
    return null;
  }

  function renderHeader() {
    if (registerStep === 1 && substep === 'b') {
      return null;
    }
    if (registerStep === 8 && substep === 'a') {
      return null;
    }
    if (registerStep === 9) {
      return null;
    }
    return <HeaderStep currentStep={registerStep} />;
  }

  return (
    <View style={styles.ctnRoot}>
      <Image source={registerBackground} style={styles.registerStyle} />
      {renderAnimation()}
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <KeyboardAwareScrollView
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
          onKeyboardDidHide={() => {
            setKeyboardShow(false);
          }}
          onKeyboardDidShow={() => {
            setKeyboardShow(true);
          }}
          style={styles.flexOne}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ctnScroll}
          scrollEnabled={
            (!isIphoneXorAbove() && registerStep === 8) ||
            (!isIphoneXorAbove() && registerStep !== 1) ||
            (sizing.getWindowHeight(1) < 844 && registerStep === 8)
          }>
          {renderHeader()}
          {renderContent()}
          {registerStep === 1 && substep === 'a'
            ? null
            : renderButton(styles.mgBtm40)}
        </KeyboardAwareScrollView>

        {registerStep === 1 && substep === 'a' && renderButton()}
      </KeyboardAvoidingView>
      <ModalIconChanged
        isVisible={showModalIcon !== false}
        selectedIcon={showModalIcon}
        onClose={() => {
          setShowModalIcon(false);
        }}
      />
    </View>
  );
}

Register.propTypes = {
  handleSetProfile: PropTypes.func.isRequired,
  fetchListQuote: PropTypes.func.isRequired,
  fetchCollection: PropTypes.func.isRequired,
  defaultData: PropTypes.object,
};

Register.defaultProps = {
  defaultData: {
    feeling: [],
    ways: [],
    areas: [],
  },
};

export default connect(states, dispatcher)(Register);
