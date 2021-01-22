import React, { useState } from 'react';
import { connect } from 'react-redux';
import { tempListingPricingD } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import colors from '@parkyourself-frontend/shared/config/colors';
import addListingMenu from '@parkyourself-frontend/shared/config/addListingMenu';
import AddListingHeader from '../../components/SpaceOwner/AddListingHeader';
import NextButton from '../../components/SpaceOwner/NextButton';
import ScreenTittle from '../../components/common/ScreenTittle';

function SetPricingType({
  onBackButtonPress,
  onNextButtonPress,
  pricingDetails,
  tempListingPricingD,
  setActiveIndex,
  navigation
}) {
  const [billingType, setBillingType] = useState(
    pricingDetails && pricingDetails.pricingType
      ? pricingDetails.pricingType == 'Flat'
        ? 1
        : 0
      : 1
  );

  //   const [width, setWidth] = useState(pricingDetails && pricingDetails.pricingType ? 100 : 0);

  const backButtonHandler = () => {
    onBackButtonPress();
  };

  const onSubmitHandler = () => {
    try {
      onNextButtonPress();
    } catch (error) {
      Alert.alert('Something Went wrong!', 'Unable to set pricing type');
    }
  };

  return (
    <>
      <AddListingHeader
        onPress={backButtonHandler}
        width={`${0}%`}
        navigation={navigation}
        icon="close"
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginTop: 30 }}>
          <ScreenTittle title="Add Listing" />
        </View>
        {addListingMenu.map((item) => (
          <TouchableOpacity
            key={item.index}
            style={styles.item}
            onPress={() => setActiveIndex(item.index)}>
            <Text style={styles.label}>
              {item.index}
              {'.  '}
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* <NextButton onPress={onSubmitHandler} /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 20,
    minHeight: Dimensions.get('window').height,
    paddingTop: 50
  },
  item: { marginTop: 20 },
  label: { color: colors.black, fontSize: 20, fontWeight: 'bold' }
});

const mapStateToProps = ({ tempListing }) => ({
  pricingDetails: tempListing.pricingDetails
});
export default connect(mapStateToProps, { tempListingPricingD })(SetPricingType);
