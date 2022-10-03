import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Button from '../../components/button';
import ContentName from '../../layout/register/content-step-1';
import ContentGender from '../../layout/register/content-step-2';
import ContentNotification from '../../layout/register/content-step-3';
import ContentStep4 from '../../layout/register/content-step-4';
import ContentStep5 from '../../layout/register/content-step-5';
import ContentStep6 from '../../layout/register/content-step-6';
import ContentStep7 from '../../layout/register/content-step-7';
import ContentStep8 from '../../layout/register/content-step-8';
import ContentStepWidget from '../../layout/register/content-step-widget';
import HeaderStep from '../../layout/register/header-step';
import styles from './styles';

export default function Register() {
  const [registerStep, setRegisterStep] = useState(1);
  const [feelingStep, setFeelingStep] = useState(1);
  const [toggleRandomCategories, setToggleRandomCategories] = useState(false);
  const [values, setFormValues] = useState({
    name: '',
    gender: 'Male',
    motivate_often: '10x',
    start_at: new Date(),
    end_at: new Date(),
    selectedFeeling: [],
    causeFeeling: [],
    selectedCategory: [],
  });

  function getStatusDisable() {
    if (registerStep === 1) {
      if (!values.name) {
        return true;
      }
    }
    if (registerStep === 7 && !values.selectedCategory.length) {
      return true;
    }
    return false;
  }

  function getLabelDarkButton() {
    if (registerStep === 4) {
      return 'Got it!';
    }
    return 'Continue';
  }

  const handleContinueStep = () => {
    if (registerStep === 6) {
      if (feelingStep === 1) {
        if (values.selectedFeeling.length > 0) {
          setFeelingStep(2);
        } else {
          setRegisterStep(registerStep + 1);
        }
      }
      if (feelingStep === 2) {
        setRegisterStep(registerStep + 1);
      }
      return true;
    }
    if (registerStep < 8) {
      setRegisterStep(registerStep + 1);
      return true;
    }
    return true;
  };

  const handleChangeValue = (stateName, value) => {
    setFormValues({
      ...values,
      [stateName]: value,
    });
    if (stateName === 'gender') {
      setRegisterStep(registerStep + 1);
    }
  };

  function renderContent() {
    if (registerStep === 8) {
      return <ContentStep8 />;
    }
    if (registerStep === 7) {
      return (
        <ContentStep7
          toggleRandomCategories={toggleRandomCategories}
          setOffToggleCategories={() => {
            setToggleRandomCategories(false);
          }}
          onSelect={value => {
            handleChangeValue('selectedCategory', value);
          }}
        />
      );
    }
    if (registerStep === 6) {
      if (feelingStep === 2) {
        return (
          <ContentStep6
            onSelect={value => {
              handleChangeValue('causeFeeling', value);
            }}
          />
        );
      }
      return (
        <ContentStep5
          onSelect={value => {
            handleChangeValue('selectedFeeling', value);
          }}
        />
      );
    }
    if (registerStep === 5) {
      return <ContentStep4 />;
    }
    if (registerStep === 4) {
      return <ContentStepWidget />;
    }
    if (registerStep === 3) {
      return (
        <ContentGender
          selectedGender={values.gender}
          handleSelect={handleChangeValue}
        />
      );
    }
    if (registerStep === 2) {
      return <ContentNotification />;
    }
    return (
      <ContentName
        value={values.name}
        onChangeText={name => {
          setFormValues({
            ...values,
            name,
          });
        }}
      />
    );
  }

  function renderSkipButton() {
    if (registerStep === 4 || registerStep === 5 || registerStep === 6) {
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
            setToggleRandomCategories(true);
          }}>
          <Text style={styles.txtSkip}>Give me anything</Text>
        </TouchableOpacity>
      );
    }
    if (registerStep === 2) {
      return (
        <TouchableOpacity
          style={styles.btnSkip}
          onPress={() => {
            setRegisterStep(registerStep + 1);
          }}>
          <Text style={styles.txtSkip}>Motivate me any time</Text>
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
    if (registerStep === 3) {
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
          label={getLabelDarkButton()}
          isDisable={getStatusDisable()}
          onPress={handleContinueStep}
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
