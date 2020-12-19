import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import MoreDetailsOne from '../components/MoreDetailsOne';
import MoreDetailsTwo from '../components/MoreDetailsTwo';
import MoreDetailsThree from '../components/MoreDetailsThree';
import {connect} from 'react-redux';

function MoreDetails({route, listings, navigation, isSpaceOwner}) {
  const id = route.params.id;
  const listingDetail = listings.filter((item) => item._id === id)[0];
  const {
    locationDetails,
    spaceAvailable,
    spaceDetails,
    pricingDetails,
  } = listingDetail;
  const {startTime, endTime, scheduleType} = spaceAvailable;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MoreDetailsOne
        locationDetails={locationDetails}
        scheduleType={scheduleType}
        startTime={startTime}
        endTime={endTime}
        isSpaceOwner={isSpaceOwner}
      />
      <MoreDetailsTwo
        locationDetails={locationDetails}
        spaceAvailable={spaceAvailable}
      />
      <MoreDetailsThree
        locationDetails={locationDetails}
        spaceDetails={spaceDetails}
        pricingDetails={pricingDetails}
        navigation={navigation}
        isSpaceOwner={isSpaceOwner}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    width: '100%',
    backgroundColor: 'rgba(39,170,225,0)',
  },
});

const mapStateToProps = (state) => ({
  listings: state.user.listings,
  isSpaceOwner: state.user.isSpaceOwner,
});

export default connect(mapStateToProps)(MoreDetails);
