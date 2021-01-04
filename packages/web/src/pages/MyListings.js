import React, { useEffect, useState } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import { client } from '../app/graphql/index';
import MyListingItem from '../app/components/MyListingItem';
import { loadUserListings, toggleLoading } from '../app/redux/actions/user';
import AccessDenied from '../app/components/AccessDenied';
import AuthContainer from '../app/components/AuthContainer';
import SpaceOwnerContainer from '../app/components/SpaceOwnerContainer';
// import CarLoader from '../app/components/CarLoader';

const GET_OWNER_LISTINGS = gql`
  query GetOwnerListings($ownerId: String!) {
    getOwnerListings(ownerId: $ownerId) {
      _id
      bookingCount {
        total
      }
      bookings
      createdAt
      location {
        coordinates
        type
      }
      locationDetails {
        address
        city
        country
        code
        features
        listingType
        marker {
          coordinates
          type
        }
        parkingEntranceImages
        parkingSpaceImages
        phone
        postalCode
        propertyName
        propertyType
        state
        streetViewImages
        unitNum
      }
      ownerId
      ownerEmail
      ownerName
      pricingDetails {
        pricingRates {
          perDayRate
          perHourRate
          perMonthRate
          perWeekRate
        }
        pricingType
      }
      published
      reviews
      spaceAvailable {
        advanceBookingTime {
          unit
          value
        }
        customTimeRange
        friday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        hasNoticeTime
        instantBooking
        maxTime {
          unit
          value
        }
        minTime {
          unit
          value
        }
        monday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        noticeTime {
          unit
          value
        }
        saturday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        scheduleType
        sunday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        thursday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        tuesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        wednesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
      }
      spaceDetails {
        aboutSpace
        accessInstructions
        compact
        compactSpaces
        height1 {
          unit
          value
        }
        height2 {
          unit
          value
        }
        heightRestriction
        isLabelled
        large
        largeSpaces
        largestSize
        midsized
        midsizedSpaces
        motorcycle
        motorcycleSpaces
        oversized
        oversizedSpaces
        parkingSpaceType
        qtyOfSpaces
        sameSizeSpaces
        spaceLabels {
          isBooked
          label
          largestSize
        }
      }
      thumbnail
    }
  }
`;

const MyListings = ({ loading, listings, loadUserListings, toggleLoading, userId }) => {
  const getListings = async () => {
    toggleLoading();
    client
      .query({
        query: GET_OWNER_LISTINGS,
        variables: { ownerId: userId }
      })
      .then(({ data }) => {
        console.log(data.getOwnerListings);
        loadUserListings(data.getOwnerListings);
      })
      .catch((err) => {
        console.log(err);
        toggleLoading();
      });
  };

  useEffect(() => {
    getListings();
  }, []);

  const [listBy, setListBy] = useState('address');

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // if (error || data.getUserListings == null) {
  //   return <div className='loading'>No Listings Found!</div>;
  // }

  // loadUserListings(data.getUserListings);
  // console.log('listings : ', data.getUserListings);

  return (
    <SpaceOwnerContainer>
      <div className="dg__account">
        <div className="heading-bar">
          <h1 className="heading">My Listings</h1>
          <div className="header-btns">
            <Link href="/listings/add">
              <Button variant="primary">Add Listing</Button>
            </Link>
            <DropdownButton id="dropdown-basic-button" title="List By">
              <Dropdown.Item
                href="#/action-1"
                onClick={() => {
                  setListBy('address');
                }}>
                Address
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-2"
                onClick={() => {
                  setListBy('property-name');
                }}>
                Property Name
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        {listings.length > 0 ? (
          listings.map((item, i) => <MyListingItem key={i} {...item} listBy={listBy} />)
        ) : (
          <div className="loading">No Listings Found!</div>
        )}
      </div>
    </SpaceOwnerContainer>
  );
};

const mapStateToProps = ({ user, auth }) => ({
  isSpaceOwner: user.isSpaceOwner,
  listings: user.listings,
  loading: user.loading,
  userId: auth.data.attributes.sub
});

export default connect(mapStateToProps, { loadUserListings, toggleLoading })(MyListings);
