import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TipsSettingRatesModal from '../../components/SpaceOwner/TipsSettingRatesModal';
import NextButton from '../../components/SpaceOwner/NextButton';
import AddListingHeader from '../../components/SpaceOwner/AddListingHeader';
import Input from '../../components/Input';
import { tempListingPricingD } from '@parkyourself-frontend/shared/redux/actions/tempListing';

function FlatBillingType({
  onBackButtonPress,
  onNextButtonPress,
  setListingPricingDetails,
  pricingDetails,
  tempListingPricingD,
  navigation
}) {
  const [width, setWidth] = useState(0);

  const [validate, setValidate] = useState(false);

  const [dailyMax, setDailyMax] = useState(
    pricingDetails && pricingDetails.pricingRates ? pricingDetails.pricingRates.dailyMax : '5.00'
  );
  const [visible, setVisible] = useState(false);

  const backButtonHandler = () => {
    onBackButtonPress();
  };

  const onSubmitHandler = () => {
    try {
      if (
        pricingDetails.pricingRates.perHourRate ||
        pricingDetails.pricingRates.perDayRate ||
        pricingDetails.pricingRates.perWeekRate ||
        pricingDetails.pricingRates.perMonthRate
      ) {
        setValidate(false);
        // let pricingDetails = {
        //   pricingType: 'Flat',
        //   pricingRates: {
        //     dailyMax,
        //   },
        // };
        // setListingPricingDetails(pricingDetails);
        // navigation.navigate('SaveSpaceDetails');
        onNextButtonPress(1);
      } else {
        setValidate(true);
      }
    } catch (error) {
      Alert.alert('Something Went wrong!', 'Unable to set pricing details');
    }
  };

  return (
    <>
      <AddListingHeader
        onPress={backButtonHandler}
        width={`${19 * 5.2}%`}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* <Text style={styles.setPricing1}>Set Pricing</Text> */}
        <Text style={styles.heading}>Set your desired rates</Text>
        <Text style={styles.subHeading}>
          {pricingDetails.pricingType === 'flat' ? 'Flat' : 'Variable'} Billing Type
        </Text>
        <Input
          placeholder="Per Hour"
          value={
            pricingDetails.pricingRates.perHourRate === 0
              ? ''
              : pricingDetails.pricingRates.perHourRate.toString()
          }
          validate={validate}
          keyboardType="number-pad"
          onChangeText={(input) =>
            tempListingPricingD({
              pricingRates: {
                ...pricingDetails.pricingRates,
                perHourRate: input
              }
            })
          }
          style={styles.placeholder}
        />
        <Input
          placeholder="Per Day"
          value={
            pricingDetails.pricingRates.perDayRate === 0
              ? ''
              : pricingDetails.pricingRates.perDayRate.toString()
          }
          validate={validate}
          keyboardType="number-pad"
          onChangeText={(input) =>
            tempListingPricingD({
              pricingRates: {
                ...pricingDetails.pricingRates,
                perDayRate: input
              }
            })
          }
          style={styles.placeholder}
        />
        <Input
          placeholder="Per Week"
          value={
            pricingDetails.pricingRates.perWeekRate === 0
              ? ''
              : pricingDetails.pricingRates.perWeekRate.toString()
          }
          validate={validate}
          keyboardType="number-pad"
          onChangeText={(input) =>
            tempListingPricingD({
              pricingRates: {
                ...pricingDetails.pricingRates,
                perWeekRate: input
              }
            })
          }
          style={styles.placeholder}
        />
        <Input
          placeholder="Per Month"
          value={
            pricingDetails.pricingRates.perMonthRate === 0
              ? ''
              : pricingDetails.pricingRates.perMonthRate.toString()
          }
          validate={validate}
          keyboardType="number-pad"
          onChangeText={(input) =>
            tempListingPricingD({
              pricingRates: {
                ...pricingDetails.pricingRates,
                perMonthRate: input
              }
            })
          }
          style={styles.placeholder}
        />
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text style={styles.loremIpsum2}>Tips for setting appropriate rates</Text>
        </TouchableOpacity>
        <TipsSettingRatesModal visible={visible} onPress={() => setVisible(false)} />
      </ScrollView>
      {/* <NextButton onPress={onSubmitHandler} /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 1
    // paddingTop: 50
  },
  setPricing1: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  heading: {
    color: 'rgba(11,64,148,1)',
    fontSize: 30,
    fontWeight: '700',
    // marginTop: 30,
    marginVertical: 20
  },
  subHeading: {
    color: '#27aae1',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20
  },
  loremIpsum: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    fontSize: 16,
    marginTop: 13
  },
  flatBillingType: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 17,
    marginTop: 45,
    fontWeight: '700'
  },
  dailyMaximum: {
    // fontFamily: 'roboto-regular',
    color: '#b6b6b6',
    fontSize: 16,
    marginTop: 22
  },
  placeholder: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 40,
    width: '100%',
    fontSize: 18,
    marginTop: 10,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    textDecorationLine: 'underline',
    marginTop: 37,
    fontSize: 16
  },
  materialButtonPrimary1: {
    width: 100,
    height: 36,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 10,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginTop: 136,
    alignSelf: 'center',
    backgroundColor: '#27aae1'
  }
});

const mapStateToProps = ({ tempListing }) => ({
  pricingDetails: tempListing.pricingDetails
});

export default connect(mapStateToProps, { tempListingPricingD })(FlatBillingType);
