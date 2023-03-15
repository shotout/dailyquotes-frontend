import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from 'react-native';
// import * as RNPaper from 'react-native-paper';
import {connect} from 'react-redux';
import {Modal, Portal} from 'react-native-paper';
import HeaderButton from '../../../components/header-button';
import styles from './styles';
import states from './states';
import {colors, sizing} from '../../../shared/styling';
import WidgetDetail from '../../../components/widget-detail';
import {listTutorialWidget} from '../../../shared/static/tutorialWidget';

function HomeWidget({isVisible, onClose, standardWidget}) {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [showTutorialWidget, setShowTutorialWidget] = useState(false);
  const [activeIndexTutorial, setActiveIndexTutorial] = useState(0);

  const onMomentoumScrollEnd = e => {
    const width = sizing.getDimensionWidth(1);
    const pageNumber = Math.min(
      Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5) + 1, 0),
      listTutorialWidget.length,
    );
    setActiveIndexTutorial(pageNumber - 1);
  };

  function renderStandardWidget() {
    if (standardWidget) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            setSelectedTheme(standardWidget);
          }}>
          <View style={styles.themeWrapper}>
            <View style={styles.ctnWidgetText}>
              <Text style={styles.txtTheme}>Standard</Text>
            </View>
            <View style={styles.ctnImg}>
              <ImageBackground
                source={standardWidget.imgLocal}
                style={styles.imgTheme}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={3}
                  style={[
                    styles.txtPlaceholder,
                    {
                      fontFamily: standardWidget?.font_family,
                      color: standardWidget?.text_color || colors.white,
                    },
                  ]}>
                  Big journeys begin with small steps.
                </Text>
              </ImageBackground>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return null;
  }

  function renderListWidget() {
    return <View style={styles.ctnListWidget}>{renderStandardWidget()}</View>;
  }

  function renderContent() {
    if (showTutorialWidget) {
      return (
        <View style={styles.ctnRoot}>
          <View style={styles.ctnContent}>
            <HeaderButton
              title="Widgets"
              onPress={() => {
                setShowTutorialWidget(false);
                setActiveIndexTutorial(0);
              }}
            />
            <View style={styles.ctnDescDetail}>
              <Text style={[styles.txtTitleDesc, styles.txtTutorial]}>
                How to add Mooti Widgets
              </Text>
            </View>
            <FlatList
              data={listTutorialWidget}
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
              {listTutorialWidget.map((item, index) => (
                <View
                  style={[
                    styles.ctnDot,
                    index === activeIndexTutorial && styles.blackDot,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      );
    }
    if (selectedTheme) {
      return (
        <View style={styles.ctnRoot}>
          <View style={styles.ctnContent}>
            <HeaderButton
              title="Widgets"
              onPress={() => {
                setSelectedTheme(null);
              }}
              rightText
              labelRight="See tutorial"
              onRightText={() => {
                setShowTutorialWidget(true);
              }}
            />
            <View style={styles.ctnDescDetail}>
              <Text style={styles.txtTitleDesc}>Standard</Text>
              <Text style={styles.txtDesc}>
                The standard Widget reflects the theme and categories used
                within the app.
              </Text>
            </View>
            <WidgetDetail activeTheme={selectedTheme} />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.ctnRoot}>
        <View style={styles.ctnContent}>
          <HeaderButton title="Widgets" onPress={onClose} />
          <View style={styles.ctnDesc}>
            <Text style={styles.txtContent}>
              Customize your Widgets for your Home Screen.
            </Text>
          </View>
          {renderListWidget()}
        </View>
      </View>
    );
  }

  return (
    <Portal>
      <Modal
        visible={isVisible}
        animationType="slide"
        contentContainerStyle={{flex: 1}}
        transparent
        onDismiss={onClose}>
        {renderContent()}
      </Modal>
    </Portal>
  );
}

export default connect(states)(HomeWidget);
