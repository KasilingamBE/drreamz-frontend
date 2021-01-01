/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ALL = gql`
  query GetOwnerListingsSearch(
    $search: String
    $limit: Int
    $page: Int
    $username: String
    $active: Boolean
  ) {
    getAllListingsSearch(
      search: $search
      limit: $limit
      page: $page
      username: $username
      active: $active
    ) {
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

export function useGetAllListings({ username, active }) {
  const [filter, setFilter] = useState({
    limit: 20,
    page: 1,
    search: '',
    username: null,
    active: null
  });
  const { loading, error, data } = useQuery(GET_ALL, {
    variables: { ...filter, username, active },
    fetchPolicy: 'network-only' // 'cache-and-network' // 'network-only'
  });
  const [allData, setAllData] = useState({
    count: 0,
    listings: []
  });

  useEffect(() => {
    if (data && data.getAllListingsSearch) {
      if (filter.page > 1) {
        setAllData({
          ...allData,
          listings: [...allData.listings, ...data.getAllListingsSearch.listings]
        });
      } else {
        setAllData(data.getAllListingsSearch);
      }
    }
  }, [data]);

  const loadMore = () => {
    if (allData.count > filter.page * filter.limit) {
      setFilter({ ...filter, page: filter.page + 1 });
    }
  };

  return { allData, loading, filter, setFilter, loadMore };
}
