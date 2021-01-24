import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { deleteTempListing } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import AddListingLocation from './AddListingLocation';
import AddListingSpaceDetails from './AddListingSpaceDetails';
import SpaceAvailable from './SpaceAvailable';
import SetPricingType from './SetPricingType';
import FlatBillingType from './FlatBillingType';
import AddListingMenu from './AddListingMenu';

const AddListing = ({ navigation, tempListing, deleteTempListing }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onBackButtonPress = (count = 1) => {
    if (activeIndex > 0) {
      setActiveIndex(0);
      // setActiveIndex(activeIndex - count);
    } else {
      deleteTempListing();
      if (tempListing.edit) {
        navigation.navigate('My Listings');
      } else {
        navigation.navigate('Dashboard');
      }
    }
  };

  const onNextButtonPress = (count = 1) => {
    if (activeIndex < 21) {
      setActiveIndex(activeIndex + count);
    }
  };

  return (
    <SafeAreaView>
      {activeIndex === 0 && (
        <AddListingMenu
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          edit={tempListing.edit}
        />
      )}
      {activeIndex >= 1 && activeIndex < 7 && (
        <AddListingLocation
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
      {activeIndex >= 7 && activeIndex < 13 && (
        <AddListingSpaceDetails
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
      {activeIndex >= 13 && activeIndex < 18 && (
        <SpaceAvailable
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
      {activeIndex === 18 && (
        <SetPricingType
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
        />
      )}
      {activeIndex === 19 && (
        <FlatBillingType
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
        />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  listing: state.listing,
  tempListing: state.tempListing
});

export default connect(mapStateToProps, { deleteTempListing })(AddListing);
