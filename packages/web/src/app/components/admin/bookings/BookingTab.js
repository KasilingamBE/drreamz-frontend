import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { client } from '@parkyourself-frontend/shared/graphql';
import MyBookingItem from '../../MyBookingItem';
import Loading from '../../other/Loading';

let oneYearFromNow = new Date();
oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
let yearsBackFromNow = new Date();
yearsBackFromNow.setFullYear(yearsBackFromNow.getFullYear() - 20);
const defaultStartDate = yearsBackFromNow;
const defaultEndDate = oneYearFromNow;

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

const UPDATE_BOOKING = gql`
  mutation UpdateBookingStatus(
    $id: String!
    $status: String!
    $driverEmail: String!
    $ownerEmail: String!
  ) {
    updateBookingStatus(
      id: $id
      status: $status
      driverEmail: $driverEmail
      ownerEmail: $ownerEmail
    ) {
      _id
    }
  }
`;

const BookingTab = (props) => {
  const [updateBookingStatus] = useMutation(UPDATE_BOOKING);
  const [allData, setAllData] = useState({
    bookings: [],
    count: 0,
    limit: 10,
    page: 1
  });

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const getAllBookings2 = (search) => {
    setLoading(true);
    client
      .query({
        query: GET_ALL,
        variables: {
          username: props.username ? props.username : null,
          status: props.status,
          search: search,
          page: allData.page,
          limit: allData.limit,
          startDate: props.dateFilter ? props.filterStartDate : defaultStartDate,
          endDate: props.dateFilter ? props.filterEndDate : defaultEndDate,
          sortBy:
            props.status === 'completed' || props.status === 'cancelled'
              ? '-startDate'
              : 'startDate'
        }
      })
      .then(({ data }) => {
        if (props.status === 'upcoming') {
          const tempCB = data.getAllBookingsSearch.bookings.filter(
            (b) => Date.parse(b.start) < Date.parse(new Date())
          );
          if (tempCB.length > 0) {
            tempCB.map((b) => {
              updateBookingStatus({
                variables: {
                  id: b._id,
                  status: 'completed',
                  driverEmail: b.driverEmail,
                  ownerEmail: b.ownerEmail
                }
              }).catch((e) => alert('Something went wrong'));
            });
            setAllData({
              ...allData,
              ...data.getAllBookingsSearch.bookings.filter(
                (b) => Date.parse(b.start) > Date.parse(new Date())
              )
            });
          } else {
            setAllData({ ...allData, ...data.getAllBookingsSearch });
          }
        } else {
          setAllData({ ...allData, ...data.getAllBookingsSearch });
        }
        setLoading(false);
      })
      .catch((error) => {
        // console.log("Error = ", error);
        setLoading(false);
      });
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_ALL,
        variables: {
          username: props.username ? props.username : null,
          status: props.status,
          search: search,
          page: allData.page + 1,
          limit: allData.limit
        }
      });
      setAllData({
        ...allData,
        count: data.getAllBookingsSearch.count,
        bookings: [...allData.bookings, ...data.getAllBookingsSearch.bookings],
        page: allData.page + 1
      });
      setLoading(false);
    } catch (error) {
      // console.log("Error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings2(search);
  }, [search]);

  useEffect(() => {
    setAllData({ ...allData, bookings: [] });
    getAllBookings2('');
  }, [props.dateFilter]);

  return (
    <div>
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
      {allData.bookings.length > 0 ? (
        allData.bookings.map((item, index) => (
          <MyBookingItem key={index} {...item} tabStatus={props.status} />
        ))
      ) : loading ? (
        <Loading />
      ) : (
        <div className="loading">
          No <span className="text-capitalize">{props.status}</span> Bookings
        </div>
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
  );
};

export default BookingTab;
