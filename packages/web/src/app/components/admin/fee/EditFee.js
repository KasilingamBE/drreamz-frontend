import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputGroup,
  Button,
  Form,
  Card,
  Spinner,
} from "react-bootstrap";
import { connect } from "react-redux";
import { useMutation, gql } from "@apollo/client";
import { showLoading, hideLoading } from "react-redux-loading";
// import { client } from "../../../graphql/index";
import { client } from '@parkyourself-frontend/shared/graphql'
import Loading from "../../other/Loading";
import { Edit } from "react-feather";

const GET_ONE = gql`
  query Query {
    getOneFee {
      fee
    }
  }
`;

const UPDATE_ONE = gql`
  mutation UpdateOne($fee: Int!, $updatedBy: String!) {
    updateOneFee(fee: $fee, updatedBy: $updatedBy) {
      fee
    }
  }
`;

const EditFee = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [payload, setPayload] = useState({ edit: false, fee: 15 });
  const [updateOne] = useMutation(UPDATE_ONE);
  const [loading, setLoading] = useState(false);
  const [oneData, setOneData] = useState(0);

  const getAllData = async () => {
    setLoading(true);
    props.dispatch(showLoading());
    try {
      let { data } = await client.query({
        query: GET_ONE,
      });
      setOneData(data.getOneFee.fee);
      setLoading(false);
      props.dispatch(hideLoading());
    } catch (error) {
      // console.log(error);
      setLoading(false);
      props.dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleSubmit = async (fee) => {
    // e.preventDefault();
    setDisabled(true);
    props.dispatch(showLoading());
    try {
      let { data } = await updateOne({
        variables: {
          fee: oneData === "" ? 0 : oneData,
          updatedBy: props.userId,
        },
      });
      // setOneData(data.updateOneFee.fee);
      props.dispatch(hideLoading());
      setDisabled(false);
      setPayload({ ...payload, edit: false });
    } catch (error) {
      // console.log(error);
      setDisabled(false);
      props.dispatch(hideLoading());
      alert("Something went wrong please try again");
    }
  };



  const onChangeFee = (e) => {
    const { value } = e.target;
    if (value <= 100) {
      setOneData(value)
    }
  }

  useEffect(() => {
    if (oneData !== 0) {
      handleSubmit();
    }
  }, [oneData]);

  return (
    <div className="admin-fee">
      <h1 className="heading">Application Fee</h1>
      {payload.edit ? (
        <div className="d-flex justify-content-center">
          <div className=" ">
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Application Fee"
                  aria-label="Application Fee"
                  aria-describedby="application-fee"
                  type="number"
                  value={payload.fee}
                  max="100"
                  onChange={(e) => {
                    if (e.target.value <= 100) {
                      setPayload({ ...payload, fee: e.target.value });
                    }
                  }}
                  required
                />
                <InputGroup.Prepend>
                  <InputGroup.Text id="application-fee">%</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
              <Button disabled={disabled} variant="primary" type="submit">
                {disabled ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                    "Update"
                  )}
              </Button>
              <Button
                disabled={disabled}
                variant="danger"
                className="ml-2"
                onClick={() => setPayload({ ...payload, edit: false })}
              >
                Cancel
              </Button>
            </Form>
          </div>
        </div>
      ) : loading ? (
        <Loading />
      ) : (
            <div>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-content-center">
                    <div>
                      Fee
                      {/* <b>{oneData}%</b> */}
                      <input onChange={onChangeFee} placeholder="Fee" type="text" value={oneData} className="fee-input border-0 right-align" /><b>%</b>
                    </div>
                    {/* <Edit
                      size={25}
                      className="cursor-pointer"
                      onClick={() => setPayload({ edit: true, fee: oneData })}
                    /> */}
                    {
                      disabled && <div>
                        <div class="spinner-border spinner-border-sm" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    }

                  </div>
                </Card.Body>
              </Card>
            </div>
          )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    userId: auth.authenticated ? auth.data.attributes.sub : null,
  };
};

export default connect(mapStateToProps)(EditFee);
