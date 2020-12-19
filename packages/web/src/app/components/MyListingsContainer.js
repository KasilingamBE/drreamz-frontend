import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
// import MyListingItem from '../app/components/MyListingItem';
import { client } from '../graphql/index';
import { loadUserListings } from '../redux/actions/user';
// import AccessDenied from '../app/components/AccessDenied';
// import AuthContainer from '../app/components/AuthContainer';
// import SpaceOwnerContainer from '../app/components/SpaceOwnerContainer';
import MyListings from '../../pages/MyListings';

const GET_USER_LISTINGS = gql`
  query GetUserListings($userId: String!) {
    getUserListings(userId: $userId) {
      _id
      userId
      published
      locationDetails {
        listingType
        propertyType
        propertyName
        address
        city
        state
        country
        postalCode
        code
        phone
        marker {
          lat
          lng
        }
        images
        features
      }
      spaceDetails {
        parkingSpaceType
        qtyOfSpaces
        heightRestriction
        height1 {
          value
          unit
        }
        height2 {
          value
          unit
        }
        sameSizeSpaces
        largestSize
        motorcycle
        compact
        midsized
        large
        oversized
        motorcycleSpaces
        compactSpaces
        midsizedSpaces
        largeSpaces
        oversizedSpaces
        isLabelled
        spaceLabels {
          label
          largestSize
        }
        aboutSpace
        accessInstructions
      }
      spaceAvailable {
        scheduleType
        instantBooking
        monday {
          isActive
          startTime
          endTime
        }
        tuesday {
          isActive
          startTime
          endTime
        }
        wednesday {
          isActive
          startTime
          endTime
        }
        thursday {
          isActive
          startTime
          endTime
        }
        friday {
          isActive
          startTime
          endTime
        }
        saturday {
          isActive
          startTime
          endTime
        }
        sunday {
          isActive
          startTime
          endTime
        }
        customTimeRange
        noticeTime {
          value
          unit
        }
        advanceBookingTime {
          value
          unit
        }
        minTime {
          value
          unit
        }
        maxTime {
          value
          unit
        }
        instantBooking
      }
      pricingDetails {
        pricingType
        pricingRates {
          perHourRate
          perDayRate
          perWeekRate
          perMonthRate
        }
      }
    }
  }
`;

const MyListingsContainer = ({ listings, userId, loadUserListings }) => {
  //   const { loading, error, data } = useQuery(GET_USER_LISTINGS, {
  //     variables: { userId: userId },
  //   });

  //   useEffect(() => {
  //     if (!error && data != null) {
  //       if (listings.length < data.getUserListings.length) {
  //   loadUserListings(data.getUserListings);
  //       }
  //       //       //       console.log(data.getUserListings);
  //       //       //       if (
  //       //       //         listings.length == 0 ||
  //       //       //         listings.length < data.getUserListings.length
  //       //       //       ) {
  //       //       //         loadUserListings(data.getUserListings);
  //       //       //       }
  //       //       //       console.log('listings : ', data.getUserListings);
  //     }
  //   }, [listings]);

  //   const getListings = async () => {
  //     // props.dispatch(showLoading());
  //     console.log('getting user listings');
  //     client
  //       .query({
  //         query: GET_USER_LISTINGS,
  //         variables: { userId: userId },
  //       })
  //       .then(({ data }) => {
  //         // setAllRooms(data.getAllRooms);
  //         console.log(data.getUserListings);
  //         loadUserListings(data.getUserListings);
  //         // props.dispatch(hideLoading());
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         // props.dispatch(hideLoading());
  //       });
  //   };

  //   useEffect(() => {
  //     getListings();
  //   }, [listings]);

  //   if (loading) {
  //     return <div className='loading'>Loading...</div>;
  //   }

  //   if (error || data.getUserListings == null) {
  //     return <div className='loading'>No Listings Found!</div>;
  //   }

  //   loadUserListings(data.getUserListings);
  // console.log('listings : ', data.getUserListings);

  return <MyListings listingData={[]} />;
};

const mapStateToProps = ({ user, auth }) => ({
  isSpaceOwner: user.isSpaceOwner,
  listings: user.listings,
  userId: auth.data.attributes.sub,
});

export default connect(mapStateToProps, { loadUserListings })(
  MyListingsContainer
);
