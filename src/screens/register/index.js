import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Button from '../../components/button';
import ContentStep1 from '../../layout/register/content-step-1';
import ContentStep2 from '../../layout/register/content-step-2';
import ContentStep3 from '../../layout/register/content-step-3';
import ContentStep4 from '../../layout/register/content-step-4';
import ContentStep5 from '../../layout/register/content-step-5';
import ContentStep6 from '../../layout/register/content-step-6';
import ContentStep7 from '../../layout/register/content-step-7';
import ContentStep8 from '../../layout/register/content-step-8';
import HeaderStep from '../../layout/register/header-step';
import styles from './styles';

export default function Register() {
  const [registerStep, setRegisterStep] = useState(1);
  const [values, setFormValues] = useState({
    name: '',
    gender: 'Male',
    motivate_often: '10x',
    start_at: new Date(),
    end_at: new Date(),
    selectedFeeling: null,
    causeFeeling: null,
    selectedCategory: [],
  });

  const handleChangeValue = (stateName, value) => {
    setFormValues({
      ...values,
      [stateName]: value,
    });
  };

  function renderContent() {
    if (registerStep === 8) {
      return <ContentStep8 />;
    }
    if (registerStep === 7) {
      return <ContentStep7 />;
    }
    if (registerStep === 6) {
      return <ContentStep6 />;
    }
    if (registerStep === 5) {
      return <ContentStep5 />;
    }
    if (registerStep === 4) {
      return <ContentStep4 />;
    }
    if (registerStep === 3) {
      return <ContentStep3 />;
    }
    if (registerStep === 2) {
      return (
        <ContentStep2
          selectedGender={values.gender}
          handleSelect={handleChangeValue}
        />
      );
    }
    return <ContentStep1 />;
  }

  function renderSkipButton() {
    if (registerStep === 5 || registerStep === 6) {
      return null;
    }
    if (registerStep === 8) {
      return (
        <Text style={styles.txtSubscription}>
          3 days free, then just USD 20/year
        </Text>
      );
    }
    if (registerStep === 7) {
      return (
        <TouchableOpacity
          style={styles.btnSkip}
          onPress={() => {
            setRegisterStep(registerStep + 1);
          }}>
          <Text style={styles.txtSkip}>I want to improve everything</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.btnSkip}
        onPress={() => {
          setRegisterStep(registerStep + 1);
        }}>
        <Text style={styles.txtSkip}>Skip for now</Text>
      </TouchableOpacity>
    );
  }

  function renderButton() {
    if (registerStep === 2) {
      return (
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.btnSkip}
            onPress={() => {
              setRegisterStep(registerStep + 1);
            }}>
            <Text style={styles.txtSkip}>Prefer not to say</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.btnWrapper}>
        {renderSkipButton()}
        <Button
          btnStyle={styles.btnContinue}
          label="Continue"
          onPress={() => {
            setRegisterStep(registerStep + 1);
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.ctnRoot}>
      <ScrollView
        style={styles.ctnRoot}
        contentContainerStyle={styles.ctnScroll}>
        <HeaderStep currentStep={registerStep} />
        {renderContent()}
        {renderButton()}
      </ScrollView>
    </View>
  );
}
