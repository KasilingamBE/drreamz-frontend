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
import ScreenTittle from '../../components/common/ScreenTittle';

function SetPricingType({ onBackButtonPress, setActiveIndex, navigation, edit }) {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <ScreenTittle title={`${edit ? 'Update' : 'Add'} Listing`} />
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
    paddingBottom: 50
  },
  item: { marginTop: 20 },
  label: { color: colors.black, fontSize: 20, fontWeight: 'bold' }
});

const mapStateToProps = ({ tempListing }) => ({
  pricingDetails: tempListing.pricingDetails
});
export default connect(mapStateToProps, { tempListingPricingD })(SetPricingType);
