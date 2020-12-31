import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';

const GET_ALL = gql`
  query GetAllBookings(
    $status: String!
    $search: String
    $page: Int
    $limit: Int
    $startDate: String
    $endDate: String
    $sortBy: String
    $username: String
  ) {
    getAllBookingsSearch(
      status: $status
      search: $search
      page: $page
      limit: $limit
      startDate: $startDate
      endDate: $endDate
      sortBy: $sortBy
      username: $username
    ) {
      bookings {
        _id
        driverId
        driverName
        driverEmail
        listingId
        ownerId
        ownerName
        ownerEmail
        address
        images
        start
        end
        payment
        paymentMethod
        vehicle
        profileCategory
        status
        createdAt
        qrCode
        spaceLabel
      }
      count
    }
  }
`;
let oneYearFromNow = new Date();
oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
let yearsBackFromNow = new Date();
yearsBackFromNow.setFullYear(yearsBackFromNow.getFullYear() - 20);
const defaultStartDate = yearsBackFromNow;
const defaultEndDate = oneYearFromNow;

export function useGetAllBookings({ status }) {
  const [filter, setFilter] = useState({
    limit: 20,
    page: 1,
    search: '',
    status: 'upcoming',
    sortBy: '-startDate',
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    username: null
  });
  const { loading, error, data } = useQuery(GET_ALL, {
    variables: { ...filter, status },
    fetchPolicy: 'network-only' //'cache-and-network' // 'network-only'
  });
  const [allData, setAllData] = useState({
    count: 0,
    bookings: []
  });

  useEffect(() => {
    if (data && data.getAllBookingsSearch) {
      if (filter.page > 1) {
        setAllData({
          ...allData,
          bookings: [...allData.bookings, ...data.getAllBookingsSearch.bookings]
        });
      } else {
        setAllData(data.getAllBookingsSearch);
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
