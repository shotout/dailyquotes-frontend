import React, {useCallback, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Portal} from 'react-native-paper';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Search from '../../../components/search';
import styles from './styles';
import CardCategories from '../../../components/card-categories';
import states from './states';
import ModalCategoriesSearch from '../modal-categories-search';
import {handlePayment, isUserPremium} from '../../../helpers/user';
import {sizing} from '../../../shared/styling';

const ios = Platform.OS === 'ios';

const iconClose = require('../../../assets/icons/close.png');

function ModalCategories({
  onClose,
  categories,
  userProfile,
  contentRef,
  panelRef,
  fullSize,
}) {
  const draggableRange = {
    top: fullSize
      ? sizing.getDimensionHeight(1)
      : sizing.getDimensionHeight(1) - StatusBar.currentHeight,
    bottom: 0,
  };
  const [showModalSearch, setModalSearch] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [allowDragging, setAllowDragging] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [panelPositionVal] = useState(
    new Animated.Value(draggableRange.bottom),
  );
  const snappingPoints = [draggableRange.top, draggableRange.bottom];

  // fired when panel is finished being dragged up or down
  // if panel is dragged to 'top' position, then we switch to scrollmode
  const onMomentumDragEnd = useCallback(
    value => {
      // console.log('onMomentumDragEnd', value === draggableRange.top);
      if (value === draggableRange.top && !scrollEnabled) {
        setScrollEnabled(true);
        setAtTop(true);
        if (ios) {
          setAllowDragging(false);
        }
      }
    },
    [draggableRange, scrollEnabled],
  );

  // if panel is at the top and scrolling is allowed
  // check the velocity of the drag,
  // if the velocity is downward, then we animate the panel to its bottom state
  // if the velocity is upward, we treat the drag like a scroll instead
  const onDragStart = useCallback(
    (_, gestureState) => {
      // console.log('Check onDragStart', atTop, scrollEnabled, gestureState.vy);
      if (atTop && scrollEnabled) {
        if (gestureState.vy > 0) {
          setScrollEnabled(false);
          if (ios) {
            setAllowDragging(true);
          }
        } else {
          setAtTop(false);
          setScrollEnabled(true);
          if (ios) {
            setAllowDragging(false);
          }
        }
      }
    },
    [atTop, scrollEnabled],
  );

  // fired when scroll is finished inside the panel,
  // if the content in the panel has scrolled to the very top,
  // then we allow the panel to be dragged down
  // (only if the next gesture is down, not up)
  const onMomentumScrollEnd = useCallback(event => {
    const {nativeEvent} = event;
    // console.log(
    //   'Check scroll nativeEvent.contentOffset.y:',
    //   nativeEvent.contentOffset.y,
    // );
    if (nativeEvent.contentOffset.y === 0) {
      setAtTop(true);
      if (ios) {
        setAllowDragging(true);
      }
    }
  }, []);

  const getInitialCategory = () => {
    if (userProfile.data.categories?.length > 0) {
      return userProfile.data.categories.map(item => item.id);
    }
    return [];
  };

  function renderHeader(dragHandler = {}) {
    return (
      <View style={styles.ctnHeader} {...dragHandler}>
        <View style={styles.ctnTextHeader}>
          <Text style={styles.boldHeader}>Categories</Text>
        </View>
        {!isUserPremium() && (
          <View style={styles.rowHeaderText}>
            <View />
            {/* <TouchableOpacity onPress={onClose}>
            <Text style={[styles.txtHeaderBtn, styles.txtBlack]}>Done</Text>
          </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                handlePayment('in_app_paywall');
              }}
              style={styles.ctnJustifyEnd}>
              <Text style={styles.txtHeaderBtn}>Unlock all</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            setModalSearch(true);
          }}>
          <Search isSelect placeholder="Search" />
        </TouchableOpacity>
      </View>
    );
  }

  function renderLabel() {
    return (
      <View style={styles.ctnLabel}>
        <Text style={styles.txtMix}>Make your own mix</Text>
      </View>
    );
  }

  function renderIconClose() {
    return (
      <TouchableOpacity style={styles.btnStyle} onPress={onClose}>
        <Image source={iconClose} style={styles.btnClose} />
      </TouchableOpacity>
    );
  }

  // console.log('Check is scroll enable:', allowDragging, scrollEnabled, atTop);

  return (
    <Portal>
      <SlidingUpPanel
        ref={contentRef}
        animatedValue={panelPositionVal}
        draggableRange={draggableRange}
        snappingPoints={snappingPoints}
        backdropOpacity={0}
        showBackdrop={false}
        height={draggableRange.top}
        allowDragging
        // allowDragging={allowDragging}
        // onMomentumDragEnd={onMomentumDragEnd}
        // onDragStart={onDragStart}
      >
        {dragHandler => (
          <View style={styles.ctnRoot}>
            <TouchableWithoutFeedback onPress={onClose}>
              <View style={styles.ctnClose} />
            </TouchableWithoutFeedback>
            <View style={styles.ctnContent}>
              {/* <LineGestureSlide dragHandler={dragHandler} /> */}
              {renderHeader(dragHandler)}
              <ScrollView
                // scrollEnabled={scrollEnabled}
                showsVerticalScrollIndicator={false}
                bounces={false}
                // onMomentumScrollEnd={onMomentumScrollEnd}
                scrollsToTop={false}
                contentContainerStyle={styles.ctnScroll}>
                {renderLabel()}
                {/* <View style={{height: sizing.getDimensionHeight(200)}} /> */}
                <CardCategories
                  initialSelect={getInitialCategory()}
                  listData={categories}
                />
              </ScrollView>
              {renderIconClose()}
            </View>
            {showModalSearch && (
              <ModalCategoriesSearch
                onClose={() => {
                  setModalSearch(false);
                }}
                isVisible={showModalSearch}
              />
            )}
          </View>
        )}
      </SlidingUpPanel>
    </Portal>
  );
}

ModalCategories.propTypes = {
  categories: PropTypes.object,
  userProfile: PropTypes.object.isRequired,
};

ModalCategories.defaultProps = {
  categories: {
    popular: [],
    category: [],
  },
};

export default connect(states)(ModalCategories);
