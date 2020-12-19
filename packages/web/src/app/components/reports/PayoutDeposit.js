import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import { gql } from "@apollo/client";
import { client } from "../../graphql/index";
import { connect } from "react-redux";

const GET_DATA = gql`
  query GetData($userId: String!) {
    stripeRetrieveBalance(userId: $userId)
  }
`;

const PayoutDeposit = ({ userId }) => {
  const [data, setData] = useState({
    loading: false,
    data: null,
    error: false,
  });

  const getData = async () => {
    try {
      setData({ ...data, loading: true });
      const { data } = await client.query({
        query: GET_DATA,
        variables: { userId: userId },
      });
      console.log(
        "setData PayoutDeposit",
        JSON.parse(data.stripeRetrieveBalance)
      );
      if (data.stripeRetrieveBalance) {
        setData({
          data: JSON.parse(data.stripeRetrieveBalance),
          loading: false,
          error: false,
        });
      } else {
        setData({ data: null, loading: false, error: true });
      }
    } catch (error) {
      console.log("getBooking error", error);
      setData({ data: null, loading: false, error: true });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (data.loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (data.data) {
    return (
      <div>
        <h4>Payout Deposit Report</h4>
        <div className="more-info-btns">
          <Card>
            <Card.Body>
              <div>Current Balance</div>
              <div className="text-parkyourself">
                <b>${data.data.instant_available[0].amount / 100}</b>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div>Pending Funds</div>
              <div className="text-parkyourself">
                <b>${data.data.pending[0].amount / 100}</b>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div>Last Withdrawal</div>
              <div className="text-parkyourself">
                <b>$1</b>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div>Total Earnings</div>
              <div className="text-parkyourself">
                <b>$1</b>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div>Earning in March</div>
              <div className="text-parkyourself">
                <b>$1</b>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div>Available for Withdrawal</div>
              <div className="text-parkyourself">
                <b>${data.data.available[0].amount / 100}</b>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

const mapStateToProps = ({ auth }) => {
  return {
    userId: auth.authenticated ? auth.data.attributes.sub : null,
  };
};

export default connect(mapStateToProps)(PayoutDeposit);
