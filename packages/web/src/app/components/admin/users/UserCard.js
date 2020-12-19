import React, { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
// import { client } from "../../../graphql/";
import { client } from '@parkyourself-frontend/shared/graphql'
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading";

const GET_OWNER_LISTINGS = gql`
  query GetOwnerListings($ownerId: String!) {
    getOwnerListings(ownerId: $ownerId) {
      _id
    }
  }
`;

const GET_DRIVER_BOOKINGS = gql`
  query GetDriverBookings($driverId: String!) {
    getDriverBookings(driverId: $driverId) {
      _id
    }
  }
`;

const UPDATE_ONE = gql`
  mutation adminToggleUserStatus($username: String!, $status: Boolean!) {
    adminToggleUserStatus(username: $username, status: $status)
  }
`;

const UserCard = ({ user, driver, spaceowner, dispatch, handleUpdateUser }) => {
  const [toggleUser] = useMutation(UPDATE_ONE);
  const [listings, setListings] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const userId =
    user.Attributes.filter((a) => a.Name === "sub").length > 0
      ? user.Attributes.filter((a) => a.Name === "sub")[0].Value
      : null;

  const getListings = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_OWNER_LISTINGS,
        variables: { ownerId: userId },
      });
      setListings(data.getOwnerListings.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_DRIVER_BOOKINGS,
        variables: { driverId: userId },
      });
      setBookings(data.getDriverBookings.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (spaceowner) {
      getListings();
    } else if (driver) {
      getBookings();
    }
  }, []);

  let name =
    user.Attributes.filter((a) => a.Name === "name").length > 0
      ? user.Attributes.filter((a) => a.Name === "name")[0].Value
      : null;
  let email =
    user.Attributes.filter((a) => a.Name === "email").length > 0
      ? user.Attributes.filter((a) => a.Name === "email")[0].Value
      : null;
  let picture =
    user.Attributes.filter((a) => a.Name === "picture").length > 0
      ? user.Attributes.filter((a) => a.Name === "picture")[0].Value
      : null;

  if ((spaceowner && !listings) || (driver && !bookings)) {
    return null;
  }

  // console.log("User == ", user);

  const handleToggle = async (status) => {
    setDisabled(true);
    dispatch(showLoading());
    try {
      await toggleUser({
        variables: {
          username: user.Username,
          status: status,
        },
      });
      handleUpdateUser(user.Username, status);
      dispatch(hideLoading());
      setDisabled(false);
    } catch (error) {
      console.log(error);
      setDisabled(false);
      dispatch(hideLoading());
      alert("Something went wrong please try again");
    }
  };

  return (
    <Card>
      <Card.Body>
        <div className="d-flex">
          <div className="user-picture-div">
            <img
              className="user-picture"
              // alt={name}
              src={
                picture
                  ? picture
                  : "https://parkyourselfbucket154227-dev.s3.amazonaws.com/public/default/default.jpg"
              }
            />
          </div>
          <div>
            <b>{name}</b>
            <br />
            <span>{email}</span>
            <br />
            {spaceowner &&
              (loading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <br />
                </>
              ) : (
                  <>
                    <span>Listings {listings}</span> <br />
                  </>
                ))}
            {driver &&
              (loading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <br />
                </>
              ) : (
                  <>
                    <span>Bookings {bookings}</span> <br />
                  </>
                ))}
            {user.Enabled === "true" ? (
              <Button
                size="sm"
                variant="dark"
                onClick={() => handleToggle(false)}
              >
                {disabled ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                    "Block"
                  )}
              </Button>
            ) : (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleToggle(true)}
                >
                  {disabled ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                      "Activate"
                    )}
                </Button>
              )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default connect()(UserCard);
