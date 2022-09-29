import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

const bannerImage = require('../../../assets/images/notification_app.png');

export default function ContentStep3() {
  function renderBanner() {
    return (
      <View style={styles.ctnBanner}>
        <Image source={bannerImage} style={styles.iconBanner} />
      </View>
    );
  }

  function renderInputOften() {
    return (
      <View style={styles.ctnInput}>
        <View style={styles.leftInput}>
          <Text style={styles.txtLeftInput}>How often</Text>
        </View>
        <View style={styles.rightInput}>
          <TouchableOpacity style={styles.ctnSelect}>
            <Text style={styles.txtDecrease}>-</Text>
          </TouchableOpacity>
          <View style={styles.ctnValue}>
            <Text style={styles.txtValue}>10x</Text>
          </View>
          <TouchableOpacity style={styles.ctnSelect}>
            <Text style={styles.txtIncrease}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderStartAt() {
    return (
      <View style={styles.ctnInput}>
        <View style={styles.leftInput}>
          <Text style={styles.txtLeftInput}>Start at</Text>
        </View>
        <View style={styles.rightInput}>
          <TouchableOpacity style={styles.ctnSelect}>
            <Text style={styles.txtDecrease}>-</Text>
          </TouchableOpacity>
          <View style={styles.ctnValue}>
            <Text style={styles.txtValue}>08:00 AM</Text>
          </View>
          <TouchableOpacity style={styles.ctnSelect}>
            <Text style={styles.txtIncrease}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderEndAt() {
    return (
      <View style={styles.ctnInput}>
        <View style={styles.leftInput}>
          <Text style={styles.txtLeftInput}>End at</Text>
        </View>
        <View style={styles.rightInput}>
          <TouchableOpacity style={styles.ctnSelect}>
            <Text style={styles.txtDecrease}>-</Text>
          </TouchableOpacity>
          <View style={styles.ctnValue}>
            <Text style={styles.txtValue}>10:00 AM</Text>
          </View>
          <TouchableOpacity style={styles.ctnSelect}>
            <Text style={styles.txtIncrease}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderInput() {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>
          {`How often would you like to be\nmotivated in a day?`}
        </Text>
        {renderInputOften()}
        {renderStartAt()}
        {renderEndAt()}
      </View>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      {renderBanner()}
      {renderInput()}
    </View>
  );
}
