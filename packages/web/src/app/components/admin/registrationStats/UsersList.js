import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { showLoading, hideLoading } from 'react-redux-loading';
import { client } from '@parkyourself-frontend/shared/graphql';
import UserCard from './UserCard';
import Loading from '../../other/Loading';
import { Button } from 'react-bootstrap';

const GET_ALL = gql`
  query GetAllUsers(
    $limit: Int!
    $page: Int!
    $search: String
    $sortBy: String
    $createdAt: String
    $createdAtMax: String
    $bookings: Int
    $listings: Int
    $active: Boolean
  ) {
    getAllUsersSearch(
      limit: $limit
      page: $page
      search: $search
      sortBy: $sortBy
      createdAt: $createdAt
      createdAtMax: $createdAtMax
      bookings: $bookings
      listings: $listings
      active: $active
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

function UsersList(props) {
  const [toggleOneUserStatus] = useMutation(UPDATE_ONE);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [allData, setAllData] = useState({
    count: 0,
    users: []
  });

  const [filter, setFilter] = useState({
    active: true,
    limit: 10,
    page: 1,
    search: '',
    sortBy: '-createdAt',
    createdAt: null,
    createdAtMax: new Date(),
    bookings: 0,
    listings: 0
  });

  const getAllData = async () => {
    try {
      setLoading(true);
      props.dispatch(showLoading());
      let { data } = await client.query({
        query: GET_ALL,
        variables: {
          ...filter,
          search: props.search,
          createdAt: props.createdAt,
          createdAtMax: props.createdAtMax
        }
      });
      props.setUserCount(data.getAllUsersSearch.count);
      if (filter.page > 1) {
        setAllData({ ...allData, users: [...allData.users, ...data.getAllUsersSearch] });
      } else {
        setAllData(data.getAllUsersSearch);
      }
      props.dispatch(hideLoading());
      setLoading(false);
    } catch (error) {
      // console.log(error);
      props.dispatch(hideLoading());
      setLoading(false);
    }
  };

  const searchAllData = async () => {
    setLoading(true);
    props.dispatch(showLoading());
    client
      .query({
        query: GET_ALL,
        variables: {
          ...filter,
          search: props.search,
          createdAt: props.createdAt,
          createdAtMax: props.createdAtMax
        }
      })
      .then(({ data }) => {
        props.setUserCount(data.getAllUsersSearch.count);
        setAllData(data.getAllUsersSearch);
        props.dispatch(hideLoading());
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        props.dispatch(hideLoading());
        setLoading(false);
      });
  };
  const handleToggle = async (username, status) => {
    setDisabled(true);
    props.dispatch(showLoading());
    try {
      await toggleOneUserStatus({
        variables: {
          username: username,
          status: status,
          updatedBy: props.userId
        }
      });
      setAllData({
        ...allData,
        users: allData.users.map((u) => (u.username === username ? { ...u, active: status } : u))
      });
      props.dispatch(hideLoading());
      setDisabled(false);
    } catch (error) {
      // console.log(error);
      setDisabled(false);
      props.dispatch(hideLoading());
      alert('Something went wrong please try again');
    }
  };

  useEffect(() => {
    getAllData();
  }, [filter.page]);

  useEffect(() => {
    if (props.custom) {
      searchAllData();
    }
  }, [props.createdAtMax]);

  useEffect(() => {
    searchAllData();
  }, [props.search]);

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="mt-2">
      {allData.users.map((u) => (
        <UserCard user={u} handleToggle={handleToggle} disabled={disabled} />
      ))}
      {loading ? (
        <Loading />
      ) : (
        allData.count > filter.limit * filter.page && (
          <div className="text-center pt-3">
            <Button size="sm" onClick={() => setFilter({ ...filter, page: filter.page + 1 })}>
              Load More
            </Button>
          </div>
        )
      )}
    </div>
  );
}
const mapStateToProps = ({ auth }) => {
  return {
    userId: auth.authenticated ? auth.data.attributes.sub : null
  };
};

export default connect(mapStateToProps)(UsersList);
