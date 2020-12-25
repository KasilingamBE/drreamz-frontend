import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { gql } from '@apollo/client';
import { showLoading, hideLoading } from 'react-redux-loading';
import { Button, Form, Spinner, Tabs, Tab, Dropdown } from 'react-bootstrap';
// import { client } from "../../../graphql/";
import { client } from '@parkyourself-frontend/shared/graphql';
import { Menu } from 'react-feather';
import UserCard from './UserCard';

const GET_ALL = gql`
  query GetAllUsers(
    $limit: Int!
    $page: Int!
    $search: String
    $sortBy: String
    $createdAt: String
    $createdAtMax: String
  ) {
    getAllUsers(
      limit: $limit
      page: $page
      search: $search
      sortBy: $sortBy
      createdAt: $createdAt
      createdAtMax: $createdAtMax
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
      }
    }
  }
`;

function FormOptionCRUD(props) {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState({
    count: 0,
    users: []
  });
  const [filter, setFilter] = useState({
    active: false,
    block: false,
    limit: 10,
    page: 1,
    search: '',
    sortBy: '-createdAt',
    createdAt: '1',
    createdAtMax: new Date()
  });

  const getAllData = async () => {
    try {
      let tempFilter = '';
      setLoading(true);
      props.dispatch(showLoading());
      let { data } = await client.query({
        query: GET_ALL,
        variables: filter
      });
      console.log(data.adminListAllUsers);
      setAllData(data.getAllUsers);
      props.dispatch(hideLoading());
      setLoading(false);
    } catch (error) {
      // console.log(error);
      props.dispatch(hideLoading());
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getAllData();
  // }, [filter.active, filter.block]);

  useEffect(() => {
    getAllData();
  }, []);

  const handleUpdateUser = (username, status) => {
    setAllData({
      ...allData,
      Users: allData.Users.map((u) =>
        u.Username === username ? { ...u, Enabled: status ? 'true' : 'false' } : u
      )
    });
  };

  const handleFilterChange = (status) => {
    setAllData({
      Users: [],
      PaginationToken: null
    });
    if (status === 'active') {
      setFilter({ ...filter, active: !filter.active });
    } else {
      setFilter({ ...filter, block: !filter.block });
    }
  };

  return (
    <div className="admin-users pb-4">
      <div className="d-flex justify-content-between">
        <h1 className="heading">Users</h1>
        <Dropdown drop="left">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            <Menu size={25} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              <Form.Check
                type="checkbox"
                checked={filter.active}
                label="Active"
                onChange={() => handleFilterChange('active')}
              />
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              <Form.Check
                type="checkbox"
                checked={filter.block}
                label="Block"
                onChange={() => handleFilterChange('block')}
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="mb-2">
        <Form.Control type="email" placeholder="Search" />
      </div>
      <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
        <Tab eventKey="all" title="All">
          <div className="pt-2">
            {allData.Users.map((user, i) => (
              <UserCard key={i} user={user} handleUpdateUser={handleUpdateUser} />
            ))}
          </div>
          <div className="text-center mt-2">
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              allData.PaginationToken && (
                <Button variant="primary" size="sm" onClick={getAllData}>
                  Load More
                </Button>
              )
            )}
          </div>
        </Tab>
        <Tab eventKey="drivers" title="Drivers">
          <div className="pt-2">
            {allData.Users.map((user, i) => (
              <UserCard key={i} user={user} driver={true} handleUpdateUser={handleUpdateUser} />
            ))}
          </div>
          <div className="text-center mt-2">
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              allData.PaginationToken && (
                <Button variant="primary" size="sm" onClick={getAllData}>
                  Load More
                </Button>
              )
            )}
          </div>
        </Tab>
        <Tab eventKey="spaceowners" title="Space Owners">
          <div className="pt-2">
            {allData.Users.map((user, i) => (
              <UserCard key={i} user={user} spaceowner={true} handleUpdateUser={handleUpdateUser} />
            ))}
          </div>
          <div className="text-center mt-2">
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              allData.PaginationToken && (
                <Button variant="primary" size="sm" onClick={getAllData}>
                  Load More
                </Button>
              )
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default connect()(FormOptionCRUD);
