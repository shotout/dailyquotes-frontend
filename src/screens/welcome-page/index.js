import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import Button from '../../components/button';
import {navigate} from '../../shared/navigationRef';
import styles from './styles';

const backgroundImage = require('../../assets/images/welcome_backround.png');
const logoApp = require('../../assets/images/logo_welcome.png');

export default function WelcomePage() {
  return (
    <View style={styles.ctnRoot}>
      <ImageBackground
        source={backgroundImage}
        style={styles.ctnBackgroundImage}>
        <View style={styles.ctnIcon}>
          <Image source={logoApp} style={styles.ctnLogoIcon} />
        </View>
        <View style={styles.btnWrapper}>
          <Button
            label="Get started"
            onPress={() => {
              navigate('Register');
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
