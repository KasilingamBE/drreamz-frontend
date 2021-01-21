import React, { useState } from 'react';
import { Modal, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { deleteTempListing } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import AddListingLocation from './AddListingLocation';
import AddListingSpaceDetails from './AddListingSpaceDetails';
import SpaceAvailable from './SpaceAvailable';
import SetPricingType from './SetPricingType';
import FlatBillingType from './FlatBillingType';
import SaveSpaceDetails from './SaveSpaceDetails';
import AddListingMenu from './AddListingMenu';

const AddListing = ({ navigation, tempListing, deleteTempListing }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [visible, setVisible] = useState(true);

  const onBackButtonPress = (count = 1) => {
    if (activeIndex > 0) {
      setActiveIndex(0);
      // setActiveIndex(activeIndex - count);
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
    if (activeIndex < 20) {
      setActiveIndex(activeIndex + count);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      {/* <SafeAreaView style={{ flex: 1,  }}> */}
      <StatusBar hidden showHideTransition="slide" />
      {activeIndex === 0 && (
        <AddListingMenu
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          setActiveIndex={setActiveIndex}
        />
      )}
      {/* <TouchableOpacity onPress={() => setActiveIndex(0)}>
        <Text style={{ marginTop: 50 }}>
          {activeIndex > 0 && activeIndex < 6 ? 'AddListingLocation' : 'some other'}Hello
          {activeIndex} {typeof activeIndex}
        </Text>
      </TouchableOpacity> */}
      {activeIndex >= 1 && activeIndex < 6 && (
        <AddListingLocation
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
        />
      )}
      {activeIndex >= 6 && activeIndex < 12 && (
        <AddListingSpaceDetails
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
        />
      )}
      {/* {activeIndex === 3 && (
        <SpaceAvailable
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
        />
      )}
      {activeIndex === 4 && (
        <SetPricingType
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
        />
      )}
      {activeIndex === 5 && (
        <FlatBillingType
          navigation={navigation}
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
        />
      )}
      {activeIndex === 6 && (
        <SaveSpaceDetails
          onBackButtonPress={onBackButtonPress}
          onNextButtonPress={onNextButtonPress}
          navigation={navigation}
        />
      )} */}
      {/* </SafeAreaView> */}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  listing: state.listing,
  tempListing: state.tempListing
});

export default connect(mapStateToProps, { deleteTempListing })(AddListing);
