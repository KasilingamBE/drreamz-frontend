import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import { showLoading, hideLoading } from "react-redux-loading";
import { useMutation, gql } from "@apollo/client";
import { client } from "../../graphql/index";

const RUN_EMAIL_SUBMIT_TASK = gql`
  mutation RunEmailSubmitTask(

    $Email_id: String!

  ) {
    runEmailSubmitTask(
      Email_id: $Email_id
    )
  }
`;

const HomePage = ({ dispatch, authenticated, userId }) => {
    const [runEmailSubmitTask] = useMutation(RUN_EMAIL_SUBMIT_TASK);
    const [disabled, setDisabled] = useState(false);
    const [payload, setPayload] = useState({
      Email_id: "",
    });

    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          dispatch(showLoading());
          setDisabled(true);
          const response = await runLinkedinRequestTask({
            variables: {
              Email_id: payload.Email_id,
            },
          });
          
          dispatch(hideLoading());
          setDisabled(false);
          if (response.data.runLinkedinRequestTask.includes("Submitting Email")) {
            alert("Submitting Email");
          } else {
            alert("Something went wrong please try again");
          }
        } catch (error) {
          dispatch(hideLoading());
          setDisabled(false);
          console.log(userId)
          console.log(error)
          alert("Something went wrong please try again");
        }
      };

      return (
        <div className="py-5">
          <h1 className="text-center">Home Page</h1>
    
          <Form className="mt-3 container" onSubmit={handleSubmit}>
            
            <FormGroup>
              <Input
                type="text"
                name="Email_id"
                placeholder="Email_id"
                value={payload.Email_id}
                onChange={(e) =>
                  setPayload({ ...payload, Email_id: e.target.value })
                }
                required
              />
            </FormGroup>
            <Button
              type="submit"
              style={{ pointerEvents: disabled ? "none" : "auto" }}
              color="primary"
              block
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
                "Submit"
              )}
            </Button>
          </Form>
          
                  
        </div>
      );
    };
    
    const mapStateToProps = ({ auth }) => {
      return {
        authenticated: auth.authenticated,
        userId: auth.authenticated ? auth.data.attributes.sub : null,
        
      };
    };
    
    export default connect(mapStateToProps)(HomePage);
    