import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import {dateToUnix, unixToDate} from '../../../shared/dateHelper';
import styles from './styles';

const bannerImage = require('../../../assets/images/notification_app.png');

export default function ContentStep3() {
  const [values, setValues] = useState({
    often: 10,
    startDate: moment(new Date(2018, 11, 24, 8, 0, 30, 0)).format(
      'YYYY-MM-DD HH:mm',
    ),
    endDate: moment(new Date(2018, 11, 24, 21, 0, 30, 0)).format(
      'YYYY-MM-DD HH:mm',
    ),
  });

  const handleDecreaseTime = (stateName, time) => {
    setValues({
      ...values,
      [stateName]: moment(time).add(-30, 'minutes'),
    });
  };

  const handleIncreaseTime = (stateName, time) => {
    setValues({
      ...values,
      [stateName]: moment(time).add(30, 'minutes'),
    });
  };

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
          <TouchableOpacity
            style={styles.ctnSelect}
            onPress={() => {
              setValues({
                ...values,
                often: values.often === 0 ? 0 : values.often - 1,
              });
            }}>
            <Text style={styles.txtDecrease}>-</Text>
          </TouchableOpacity>
          <View style={styles.ctnValue}>
            <Text style={styles.txtValue}>{`${values.often}x`}</Text>
          </View>
          <TouchableOpacity
            style={styles.ctnSelect}
            onPress={() => {
              setValues({
                ...values,
                often: values.often + 1,
              });
            }}>
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
          <TouchableOpacity
            style={styles.ctnSelect}
            onPress={() => {
              handleDecreaseTime('startDate', values.startDate);
            }}>
            <Text style={styles.txtDecrease}>-</Text>
          </TouchableOpacity>
          <View style={styles.ctnValue}>
            <Text style={styles.txtValue}>
              {moment(values.startDate).format('hh:mm A')}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.ctnSelect}
            onPress={() => {
              handleIncreaseTime('startDate', values.startDate);
            }}>
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
          <TouchableOpacity
            style={styles.ctnSelect}
            onPress={() => {
              handleDecreaseTime('endDate', values.endDate);
            }}>
            <Text style={styles.txtDecrease}>-</Text>
          </TouchableOpacity>
          <View style={styles.ctnValue}>
            <Text style={styles.txtValue}>
              {moment(values.endDate).format('hh:mm A')}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.ctnSelect}
            onPress={() => {
              handleIncreaseTime('endDate', values.endDate);
            }}>
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
