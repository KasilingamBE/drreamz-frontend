import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { gql } from '@apollo/client';
// import { client } from "../../../graphql";
import { client } from '@parkyourself-frontend/shared/graphql';
import MyListingItem from '../../MyListingItem';
import { hideLoading, showLoading } from 'react-redux-loading';
import { Menu } from 'react-feather';
import Loading from '../../other/Loading';

const GET_ALL = gql`
  query GetOwnerListingsSearch($search: String, $limit: Int, $page: Int, $username: String) {
    getAllListingsSearch(search: $search, limit: $limit, page: $page, username: $username) {
      count
      listings {
        _id
        ownerId
        ownerName
        ownerEmail
        published
        location {
          type
          coordinates
        }
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
            type
            coordinates
          }
          streetViewImages
          parkingEntranceImages
          parkingSpaceImages
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
        bookings
        reviews
        createdAt
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
