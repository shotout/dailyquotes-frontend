/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import IconSwipeLeft from '../../../assets/svg/icon_swipe_left.svg';
import QuotesIcon from '../../../assets/icons/quotes_icon.svg';
import IconSwipeUp from '../../../assets/svg/icon_swipe_up.svg';
import IconDoubleTap from '../../../assets/svg/icon_double_tap.svg';
import IconLove from '../../../assets/svg/icon_love_tap.svg';
import TutorialStep from '../tutorial-step';

const backgroundImage = require('../../../assets/images/swipe_quotes_1.png');

export default function ContentTutorial({onPressFinish}) {
  const [tutorialStep, setTutorialStep] = useState(1);

  function renderIconTutorial() {
    if (tutorialStep === 1) {
      return (
        <View style={styles.ctnFirstIcon}>
          <IconSwipeLeft width="100%" height="100%" />
        </View>);
    }
    if (tutorialStep === 2) {
      return (
        <View style={styles.ctnLogoIcon}>
          <IconSwipeUp width="100%" height="100%" />
        </View>
      );
    }
    if (tutorialStep === 3 || tutorialStep === 4) {
      return (
        <View style={styles.ctnLogoIcon}>
          <IconDoubleTap width="100%" height="100%" />
        </View>
      )
    }
    return null;
  }

  function renderTextTutorial() {
    if (tutorialStep === 1) {
      return <Text style={styles.textStep}>Swipe left to change theme</Text>;
    }
    if (tutorialStep === 2) {
      return <Text style={styles.textStep}>Swipe up for next quote</Text>;
    }
    if (tutorialStep === 3 || tutorialStep === 4) {
      return <Text style={styles.textStep}>Double tap to like a quote</Text>;
    }
    return null;
  }

  function renderIconLove() {
    if (tutorialStep === 4) {
      return (
        <View style={styles.ctnTapLove}>
          <View style={styles.ctnImgLove}>
            <IconLove width="100%" height="100%" />
          </View>
        </View>
      );
    }
    return null;
  }

  function renderButtonSkip() {
    if (tutorialStep < 3) {
      return (
        <View style={styles.ctnCenter}>
          <TouchableOpacity
            style={styles.btnSkip}
            onPress={() => setTutorialStep(tutorialStep + 1)}>
            <Text style={styles.txtSkip}>Next</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.ctnCenter}>
        <TouchableOpacity
          style={styles.btnSkipGreen}
          onPress={onPressFinish}>
          <Text style={styles.txtSkip}>Got It!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderButtonSwipe() {
    return (
      <View style={styles.ctnTutorial}>
        {renderIconTutorial()}
        <View style={[styles.ctnCenter]}>
          <View style={styles.bgTextBottom}>{renderTextTutorial()}</View>
        </View>
        {renderButtonSkip()}
      </View>
    );
  }

  function renderContent() {
    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.ctnBackgroundImage}>
        <View style={styles.ctnIcon}>

          <TutorialStep currentStep={tutorialStep} />
          <View style={styles.quotesWrapper}>
            <View style={styles.ctnQuotesIcon}>
              <QuotesIcon width="100%" height="100%" />
            </View>
            <View style={styles.txtQuotesWrapper}>
              <Text style={styles.ctnQuotes}>
                “You can never cross the ocean until you have the courage to
                lose sight of the shore.”
              </Text>
              <Text style={styles.ctnQuotes}>
                - Christopher Columbus
              </Text>
            </View>
          {renderIconLove()}
          {renderButtonSwipe()}
          </View>
        </View>
      </ImageBackground>
    );
  }
  return <View style={styles.ctnRoot}>{renderContent()}</View>;
}
