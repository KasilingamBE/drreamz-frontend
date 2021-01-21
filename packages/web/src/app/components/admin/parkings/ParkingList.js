import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { gql } from '@apollo/client';
import { client } from '@parkyourself-frontend/shared/graphql';
import { hideLoading, showLoading } from 'react-redux-loading';
import { Menu } from 'react-feather';
import MyListingItem from '../../MyListingItem';
import Loading from '../../other/Loading';

const GET_ALL = gql`
  query GetOwnerListingsSearch($search: String, $limit: Int, $page: Int, $username: String) {
    getAllListingsSearch(search: $search, limit: $limit, page: $page, username: $username) {
      count
      listings {
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
          code
          country
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
        ownerEmail
        ownerId
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
          customTimeRange {
            endDate
            startDate
          }
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
  }
`;

const MyListings = ({ hideLoading, showLoading, hideTitle, username }) => {
  const [allData, setAllData] = useState({
    listings: [],
    count: 0,
    limit: 10,
    page: 1
  });

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const getListings = () => {
    showLoading();
    setLoading(true);
    client
      .query({
        query: GET_ALL,
        variables: {
          search: search,
          page: allData.page,
          limit: allData.limit,
          username: username ? username : null
        }
      })
      .then(({ data }) => {
        // console.log(data.getAllListingsSearch);
        setAllData({ ...allData, ...data.getAllListingsSearch });
        hideLoading();
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        hideLoading();
        setLoading(false);
      });
  };

  const loadMore = async () => {
    try {
      showLoading();
      setLoading(true);
      const { data } = await client.query({
        query: GET_ALL,
        variables: {
          search: search,
          page: allData.page + 1,
          limit: allData.limit,
          username: username ? username : null
        }
      });
      setAllData({
        ...allData,
        count: data.getAllListingsSearch.count,
        listings: [...allData.listings, ...data.getAllListingsSearch.listings],
        page: allData.page + 1
      });
      setLoading(false);
      hideLoading();
    } catch (error) {
      // console.log("Error", error);
      setLoading(false);
      hideLoading();
    }
  };

  useEffect(() => {
    getListings();
  }, [search]);

  const [listBy, setListBy] = useState('address');

  return (
    <>
      <div className="dg__account">
        {!hideTitle && (
          <div className="d-flex justify-content-between">
            <h1 className="heading">Parkings</h1>
            <Menu size={25} className="cursor-pointer mt-2" />
          </div>
        )}
        <div className="mb-2 mt-2">
          <Form.Control
            type="text"
            value={search}
            onChange={(e) => {
              setAllData({ ...allData, page: 1 });
              setSearch(e.target.value);
            }}
            placeholder="Search"
          />
        </div>
        {allData.listings.length > 0 ? (
          allData.listings.map((item, i) => <MyListingItem key={i} {...item} listBy={listBy} />)
        ) : loading ? (
          <Loading />
        ) : (
          <div className="loading">No Listings Found</div>
        )}
        {allData.limit * allData.page < allData.count &&
          (loading ? (
            <Loading />
          ) : (
            <div className="text-center mt-2">
              <Button variant="primary" size="sm" onClick={loadMore}>
                Load More
              </Button>
            </div>
          ))}
      </div>
    </>
  );
};

export default connect(null, { hideLoading, showLoading })(MyListings);
