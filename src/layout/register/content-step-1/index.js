import React from 'react';
import {Image, Text, View} from 'react-native';
import {createAnimatableComponent} from 'react-native-animatable';
import Input from '../../../components/input';
import styles from './styles';

const AnimatableView = createAnimatableComponent(View);

const bannerImage = require('../../../assets/images/name_app.png');

export default function ContentStep1(props) {
  const {substep, keyboardShow} = props;

  function renderBanner() {
    return (
      <View style={styles.ctnBanner}>
        <Image source={bannerImage} style={styles.iconBanner} />
      </View>
    );
  }

  function renderInput() {
    return (
      <View style={styles.inputWrapper}>
        <View style={styles.ctnText}>
          <Text style={styles.txtInput}>What is your name?</Text>

          <Text style={styles.txtDescTitle}>
            {'Using your real name creates \na better experience with Mooti.'}
          </Text>
        </View>
        <Input autoFocus keepFocus placeholder="Your name" {...props} />
      </View>
    );
  }

  if (substep === 'b') {
    return (
      <View style={styles.ctnRoot}>
        <AnimatableView
          animation="bounceIn"
          duration={1300}
          style={styles.ctnSuccess}>
          <Text style={styles.txtSuccessTitle}>
            {props.value ? `Hey ${props.value}!` : 'Hey!'}
          </Text>
          <Text style={[styles.txtDescTitle, styles.welcomeText]}>
            Welcome to Mooti!
          </Text>
        </AnimatableView>
      </View>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      {/* {renderBanner()} */}
      {renderInput()}
    </View>
  );
}
