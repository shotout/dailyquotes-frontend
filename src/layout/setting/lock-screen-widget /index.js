import React, {useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import {Modal, Portal} from 'react-native-paper';
import HeaderButton from '../../../components/header-button';
import styles from './styles';
import states from './states';
import {sizing} from '../../../shared/styling';
import {listTutorialLockscreenWidget} from '../../../shared/static/tutorialWidget';

function LockScreenWidget({isVisible, onClose}) {
  const [activeIndexTutorial, setActiveIndexTutorial] = useState(0);

  const onMomentoumScrollEnd = e => {
    const width = sizing.getDimensionWidth(1);
    const pageNumber = Math.min(
      Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5) + 1, 0),
      listTutorialLockscreenWidget.length,
    );
    setActiveIndexTutorial(pageNumber - 1);
  };

  return (
    <Portal>
      <Modal
        visible={isVisible}
        animationType="slide"
        contentContainerStyle={{flex: 1}}
        transparent
        onDismiss={onClose}>
        <View style={styles.ctnRoot}>
          <View style={styles.ctnContent}>
            <HeaderButton
              title="Widgets"
              onPress={() => {
                onClose();
                setActiveIndexTutorial(0);
              }}
            />
            <View style={styles.ctnDescDetail}>
              <Text style={[styles.txtTitleDesc, styles.txtTutorial]}>
                How to add Mooti Widgets
              </Text>
            </View>
            <FlatList
              data={listTutorialLockscreenWidget}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View style={styles.ctWidgetTitle}>
                  <View style={styles.ctnStep}>
                    <Text style={styles.txtStep}>{`Step ${index + 1}`}</Text>
                  </View>
                  <View style={styles.ctnTextStep}>
                    {item?.descriptionCustom ? (
                      item.descriptionCustom()
                    ) : (
                      <Text style={styles.txtWidgetStep}>
                        {item.description}
                      </Text>
                    )}
                  </View>
                  <View style={styles.ctnBanner}>
                    <Image source={item.banner} style={styles.bannerImage} />
                  </View>
                </View>
              )}
              onMomentumScrollEnd={onMomentoumScrollEnd}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.dotWrapper}>
              {listTutorialLockscreenWidget.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.ctnDot,
                    index === activeIndexTutorial && styles.blackDot,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

export default connect(states)(LockScreenWidget);
