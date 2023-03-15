import React, {useEffect} from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {connect} from 'react-redux';
import Button from '../../components/button';
import {navigate} from '../../shared/navigationRef';
import styles from './styles';
import Logo from '../../assets/svg/logo.svg';
import {askTrackingPermission} from '../../helpers/eventTracking';
import states from './states';
import {setCounterNumber} from '../../store/defaultState/actions';

const bgImage = require('../../assets/images/welcome_backround.png');

function WelcomePage({defaultData}) {
  useEffect(() => {
    if (defaultData.feeling?.length > 0) {
      setCounterNumber(99);
    }
  }, [defaultData]);

  return (
    <View style={styles.ctnRoot}>
      <ImageBackground source={bgImage} style={styles.ctnBackgroundImage}>
        <View style={styles.ctnIcon}>
          <View style={styles.ctnLogoIcon}>
            <Logo width="100%" height="100%" />
          </View>
          <View style={styles.ctnText}>
            <Text style={styles.txtTitle}>
              Take the first step{'\n'}towards self-growth today
            </Text>
            <Text style={styles.txtDesc}>
              and unlock the limitless potential within you!
            </Text>
          </View>
        </View>
        <View style={styles.btnWrapper}>
          <Button
            label="Get started"
            // onPress={handlePurchasely}
            onPress={() => {
              // handlePayment();
              navigate('Register');
              askTrackingPermission();
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export default connect(states)(WelcomePage);
