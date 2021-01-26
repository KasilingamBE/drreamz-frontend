import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  updateTempListing,
  deleteTempListing
} from '@parkyourself-frontend/shared/redux/actions/tempListing';
import {
  useAddOneListing,
  useGetAllFormOptions
} from '@parkyourself-frontend/shared/hooks/listings';
import AddListingLocation from './AddListingLocation';
import AddListingSpaceDetails from './AddListingSpaceDetails';
import SpaceAvailable from './SpaceAvailable';
import SetPricingType from './SetPricingType';
import FlatBillingType from './FlatBillingType';
import AddListingMenu from './AddListingMenu';
import AddListingHeader from '../../components/SpaceOwner/AddListingHeader';
import NextButton from '../../components/SpaceOwner/NextButton';

const AddListing = ({ navigation, tempListing, updateTempListing, deleteTempListing }) => {
  const { handleSubmit, handleNext } = useAddOneListing();
  useGetAllFormOptions(JSON.stringify({ formName: 'addListing' }));

  const {
    activeIndex,
    locationDetails: { propertyName }
  } = tempListing;
  const setActiveIndex = (index) => updateTempListing({ activeIndex: index });

  const onBackButtonPress = (count = 1) => {
    if (activeIndex > 0) {
      updateTempListing({ activeIndex: 0 });
    } else {
      deleteTempListing();
      if (tempListing.edit) {
        navigation.navigate('My Listings');
      } else {
        navigation.navigate('Profile');
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
      <AddListingHeader
        onPress={onBackButtonPress}
        icon={activeIndex == 0 ? 'close' : 'arrowleft'}
        navigation={navigation}
        activeIndex={activeIndex}
        handleSubmit={handleSubmit}
        propertyName={propertyName}
      />
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
      {activeIndex >= 1 && activeIndex < 6 && (
        <AddListingLocation
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
      {activeIndex >= 6 && activeIndex < 11 && (
        <AddListingSpaceDetails
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
      {activeIndex >= 11 && activeIndex < 16 && (
        <SpaceAvailable
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
      {activeIndex === 16 && (
        <SetPricingType
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
        />
      )}
      {activeIndex === 17 && (
        <FlatBillingType
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
        />
      )}
      {activeIndex > 0 && activeIndex < 17 && <NextButton onPress={handleNext} />}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  listing: state.listing,
  tempListing: state.tempListing
});

export default connect(mapStateToProps, { updateTempListing, deleteTempListing })(AddListing);
