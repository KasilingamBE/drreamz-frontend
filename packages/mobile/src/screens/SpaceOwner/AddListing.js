import React, {useState} from 'react';
import {Modal} from 'react-native';
import AddListingLocation from './AddListingLocation';
import AddListingSpaceDetails from './AddListingSpaceDetails';
import SpaceAvailable from './SpaceAvailable';
import SetPricingType from './SetPricingType';
import FlatBillingType from './FlatBillingType';
import SaveSpaceDetails from './SaveSpaceDetails';
import {connect} from 'react-redux';
import {deleteTempListing} from '../../app/redux/actions/tempListing';

const AddListing = ({navigation, tempListing, deleteTempListing}) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const [visible, setVisible] = useState(true);

  const onBackButtonPress = (count = 1) => {
    if (activeIndex != 1) {
      setActiveIndex(activeIndex - count);
    } else {
      setVisible(false);
      if (tempListing.edit) {
        deleteTempListing();
        navigation.navigate('MyListingsScreen');
      } else {
        navigation.navigate('SpaceOwnerDashboard');
      }
    }
  };

  const onNextButtonPress = (count = 1) => {
    if (activeIndex != 6) {
      setActiveIndex(activeIndex + count);
    }
  };

  return (
    <Modal visible={visible}>
      {activeIndex == 1 && (
        <AddListingLocation
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          // locationDetails={locationDetails}
        />
      )}
      {activeIndex == 2 && (
        <AddListingSpaceDetails
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          // spaceDetails={spaceDetails}
        />
      )}
      {activeIndex == 3 && (
        <SpaceAvailable
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          // spaceAvailable={spaceAvailable}
        />
      )}
      {activeIndex == 4 && (
        <SetPricingType
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          // pricingDetails={pricingDetails}
        />
      )}
      {activeIndex == 5 && (
        <FlatBillingType
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          // pricingDetails={pricingDetails}
        />
      )}
      {activeIndex == 6 && (
        <SaveSpaceDetails
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          navigation={navigation}
        />
      )}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  listing: state.listing,
  tempListing: state.tempListing,
});

export default connect(mapStateToProps, {deleteTempListing})(AddListing);
