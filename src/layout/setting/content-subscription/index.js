import React from 'react';
import {Linking, Text, View} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {Portal, Modal} from 'react-native-paper';
import HeaderButton from '../../../components/header-button';
import ListContent from '../../../components/list-content';
import styles from './style';
import IconStart from '../../../assets/svg/icon_start.svg';
import Button from '../../../components/button';
import IconChecklist from '../../../assets/svg/icon_checklist_color_tosca.svg';
import IconChecklistOutline from '../../../assets/svg/icon_checklist_tosca_outline.svg';
import states from './states';
import {isIphone} from '../../../shared/devices';

function Subscription({isVisible, onClose, userProfile}) {
  const subscriptionData = userProfile.data?.subscription;

  function renderDueDate() {
    return (
      <View style={styles.relativeWrap}>
        <View style={styles.rowWrap}>
          <View style={styles.rowLeft}>
            <View style={styles.iconWrap}>
              <IconChecklist width="100%" height="100%" />
            </View>
            <Text style={styles.dueBold}>Started:</Text>
          </View>
          <View style={styles.rowRight}>
            <Text style={styles.dueBold}>
              {moment(subscriptionData?.started).format('MM/DD/YYYY')}
            </Text>
          </View>
        </View>
        <View style={styles.lineSeparator} />
        <View style={styles.rowWrap}>
          <View style={styles.rowLeft}>
            <View style={styles.iconWrap}>
              <IconChecklistOutline width="100%" height="100%" />
            </View>
            <Text style={styles.dueBold}>Renewal:</Text>
          </View>
          <View style={styles.rowRight}>
            <Text style={styles.dueBold}>
              {moment(subscriptionData?.renewal).format('MM/DD/YYYY')}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <Portal>
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent
        contentContainerStyle={{flex: 1}}
        onDismiss={onClose}>
        <View style={styles.ctnRoot}>
          <View style={styles.ctnContent}>
            <HeaderButton title="Manage subscription" onPress={onClose} />
            <View style={styles.wrapper}>
              <Text style={styles.cttnNote}>You are subscribed to:</Text>
              <View style={styles.listContentWrap}>
                <ListContent
                  title={subscriptionData?.plan.title || 'Mooti free trial'}
                  icon={<IconStart width="100%" height="100%" />}
                  titleStyle={styles.titleListContent}
                />
              </View>
              {renderDueDate()}
              <View style={styles.ctnSeparator} />
              <View style={styles.relativeWrap}>
                <Text style={styles.cttnNote}>
                  You can cancel or change your subscription plan. If you
                  cancel, you can keep using the subscription until the next
                  billing date.
                </Text>
              </View>
            </View>
            <Button
              label="Cancel or change subscription"
              onPress={() => {
                if (isIphone) {
                  Linking.openURL('App-Prefs:APPLE_ACCOUNT&path=SUBSCRIPTIONS');
                } else {
                  Linking.openURL(
                    'https://play.google.com/store/account/subscriptions',
                  );
                }
              }}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

export default connect(states)(Subscription);
