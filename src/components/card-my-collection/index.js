import React, {Fragment, useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Popover, {
  PopoverMode,
  PopoverPlacement,
} from 'react-native-popover-view';
import Share from 'react-native-share';
import {moderateScale} from 'react-native-size-matters';
import styles from './styles';
import IconListMore from '../../assets/svg/icon_more_vertical_black.svg';
import IconLoveOutlineBlack from '../../assets/svg/icon_love_outline_black.svg';
import IconAddCollectionBlackFull from '../../assets/svg/icon_add_collection_black_full.svg';
import IconTrashBlack from '../../assets/svg/icon_trash_black_outline.svg';
import IconShareBlack from '../../assets/svg/icon_share_black_out.svg';
import {colors} from '../../shared/styling';

import IconAddCollectionBlack from '../../assets/svg/icon_add_collection_black_full.svg';
import IconTrashRed from '../../assets/svg/icon_trash_red_out.svg';
import IconDislikeBlack from '../../assets/svg/icon_dislike_black.svg';
import IconDislike from '../../assets/svg/icon_dislike.svg';
import {downloadText} from '../../shared/static';

export default function CardMyCollection({
  quote,
  author,
  date,
  onPresLiked,
  onPressAddCollection,
  onPressDelete,
  share,
  onPresShare,
  item,
  hideLoveQuotes,
  isMyCollection,
}) {
  const [likeStatus, setStatus] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    if (item) {
      if (isMyCollection) {
        if (item.quote?.like?.flag === 'like' && isMyCollection) {
          setStatus(true);
        }
      }

      if (item.like?.flag === 'like' && !isMyCollection) {
        setStatus(true);
      }
    }
  }, [item]);

  function renderShareOrLike() {
    if (share) {
      return (
        <TouchableWithoutFeedback onPress={onPresShare}>
          <View style={styles.ctnIconAction}>
            <IconShareBlack width="100%" height="100%" />
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (typeof onPresLiked === 'function') onPresLiked(likeStatus);
          setStatus(!likeStatus);
        }}>
        <View style={styles.ctnIconAction}>
          <IconLoveOutlineBlack
            fill={likeStatus ? '#000' : undefined}
            width="100%"
            height="100%"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  function renderIconAction() {
    return (
      <View style={styles.iconActionWrap}>
        {renderShareOrLike()}
        <TouchableWithoutFeedback onPress={onPressAddCollection}>
          <View style={styles.ctnIconAction}>
            <IconAddCollectionBlackFull width="100%" height="100%" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onPressDelete}>
          <View style={styles.ctnIconAction}>
            <IconTrashBlack width="100%" height="100%" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  function renderAuthor() {
    if (author) {
      return <Text style={styles.quoteStyle}>-{author}-</Text>;
    }
    return null;
  }

  function renderPopoverContent() {
    return (
      <View style={styles.ctnMoreWrap}>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowPopover(false);
            onPressAddCollection();
          }}>
          <View style={styles.ctnRowMore}>
            <Text style={styles.label}>Add to collection</Text>
            <View style={styles.ctnIconActionPopover}>
              <IconAddCollectionBlack width="100%" height="100%" />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.separator} />
        <TouchableWithoutFeedback
          onPress={() => {
            Share.open({
              message: `“${quote}”\n\n${downloadText}`,
            });
          }}>
          <View style={styles.ctnRowMore}>
            <Text style={styles.label}>Share this quote</Text>
            <View style={styles.ctnIconAction}>
              <IconShareBlack width="100%" height="100%" />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {!hideLoveQuotes && (
          <>
            <View style={styles.separator} />
            <TouchableWithoutFeedback
              onPress={() => {
                setShowPopover(false);
                if (typeof onPresLiked === 'function') onPresLiked(likeStatus);
                setStatus(!likeStatus);
              }}>
              <View style={styles.ctnRowMore}>
                <Text style={styles.label}>
                  {likeStatus ? 'Unlike quote' : 'Save to liked quotes'}
                </Text>
                <View style={styles.ctnIconAction}>
                  <IconLoveOutlineBlack
                    fill={likeStatus ? '#000' : undefined}
                    width="100%"
                    height="100%"
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </>
        )}
        <View style={styles.separator} />
        <TouchableWithoutFeedback
          onPress={() => {
            setShowPopover(false);
            onPressDelete();
          }}>
          <View style={styles.ctnRowMore}>
            <Text style={styles.label}>Remove</Text>
            <View style={styles.ctnIconAction}>
              <IconTrashRed width="100%" height="100%" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  function renderPopover() {
    return (
      <Popover
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}
        mode={PopoverMode.RN_MODAL}
        placement={PopoverPlacement.LEFT}
        arrowShift={-0.5}
        popoverStyle={{
          backgroundColor: colors.white,
          borderRadius: moderateScale(20 / 2),
          paddingVertical: moderateScale(15),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          // top: -30,
        }}
        from={
          <TouchableOpacity onPress={() => setShowPopover(true)}>
            <View style={styles.ctnIcon}>
              <IconListMore width="100%" height="100%" />
            </View>
          </TouchableOpacity>
        }>
        {renderPopoverContent()}
      </Popover>
    );
  }

  return (
    <View style={styles.ctnCard}>
      <View style={styles.ctnRowTop}>
        <View style={styles.topLeft}>
          <Text style={styles.quoteStyle}>"{quote}"</Text>
          {renderAuthor()}
        </View>
        {renderPopover()}
      </View>
      <View style={styles.ctnRowBottom}>
        <Text style={styles.ctnDateStyle}>{date}</Text>
        <View style={styles.wrapIcon}>{renderIconAction()}</View>
      </View>
    </View>
  );
}
