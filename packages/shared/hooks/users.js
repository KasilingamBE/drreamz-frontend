import { useState, useEffect, useCallback } from 'react';
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';
import { useSelector } from 'react-redux';

const GET_ONE = gql`
  query QUERY($username: String!) {
    getOneUserSub(username: $username) {
      _id
      active
      confirmed
      email
      name
      picture
      status
      username
      bookings
      listings
    }
  }
`;

export function useGetOneUser(username) {
  const data = useQuery(GET_ONE, { variables: { username: username } });
  return data;
}

const GET_ALL = gql`
  query GetAllUsers(
    $limit: Int!
    $page: Int!
    $search: String
    $sortBy: String
    $bookings: Int
    $listings: Int
    $active: Boolean
    $lowerRange: String
    $higherRange: String
  ) {
    getAllUsersSearch(
      limit: $limit
      page: $page
      search: $search
      sortBy: $sortBy
      bookings: $bookings
      listings: $listings
      active: $active
      lowerRange: $lowerRange
      higherRange: $higherRange
    ) {
      count
      users {
        _id
        active
        confirmed
        email
        name
        picture
        status
        username
        bookings
        listings
        createdAt
      }
    }
  }
`;

const UPDATE_ONE = gql`
  mutation ToggleOneUserStatus($username: String!, $updatedBy: String!, $status: Boolean!) {
    toggleOneUserStatus(username: $username, updatedBy: $updatedBy, status: $status) {
      _id
    }
  }
`;

export function useGetAllUser({ driver, spaceOwner, lowerRange, higherRange }) {
  const [toggleOneUserStatus] = useMutation(UPDATE_ONE);
  const [filter, setFilter] = useState({
    active: null,
    block: false,
    limit: 20,
    page: 1,
    search: '',
    sortBy: '-createdAt',
    lowerRange: null,
    higherRange: null,
    bookings: driver ? 1 : 0,
    listings: spaceOwner ? 1 : 0
  });
  const [getAllUsers, { loading, data, error }] = useLazyQuery(GET_ALL, {
    variables: { ...filter, lowerRange, higherRange },
    fetchPolicy: 'network-only' // 'cache-and-network' //'network-only'
  });

  const [allData, setAllData] = useState({
    count: 0,
    users: []
  });
  const userId = useSelector(({ auth }) => (auth.authenticated ? auth.data.attributes.sub : null));

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (data && data.getAllUsersSearch) {
      if (filter.page > 1) {
        setAllData({ ...allData, users: [...allData.users, ...data.getAllUsersSearch.users] });
      } else {
        setAllData(data.getAllUsersSearch);
      }
    }
  }, [data]);

  const toggleUser = useCallback(async (username, status) => {
    await toggleOneUserStatus({
      variables: {
        username: username,
        status: status,
        updatedBy: userId
      }
    });
    setAllData({
      ...allData,
      users: allData.users.map((u) => (u.username === username ? { ...u, active: status } : u))
    });
  });

  return { filter, setFilter, allData, loading, toggleUser, userId };
}
