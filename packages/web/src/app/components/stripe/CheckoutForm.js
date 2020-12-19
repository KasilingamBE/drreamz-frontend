import React, { useState } from "react";
import { connect } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Spinner, Button, Modal } from "react-bootstrap";
import { CheckCircle, X } from "react-feather";
import { gql } from "@apollo/client";
import { client } from "../../graphql/index";
import { toast } from "react-toastify";

const ownerId = "8e2783ed-f09d-48e8-8158-43e7d42c7378";
// const amount = 10000;
// const fee = 1500;
const driverName = "Vivek Thakur";

const Create_Payment_Intent = gql`
  query StripeCreatePaymentIntent(
    $driverId: String!
    $name: String!
    $email: String!
    $type: String!
    $ownerId: String!
    $amount: Float!
    $fee: Float!
  ) {
    stripeCreatePaymentIntent(
      driverId: $driverId
      name: $name
      email: $email
      type: $type
      ownerId: $ownerId
      amount: $amount
      fee: $fee
    ) {
      id
      secret
      transferGroup
    }
  }
`;

const CheckoutForm = ({
  createBookingHandler,
  validateInputs,
  amount,
  fee,
  driverId,
  name,
  email,
  type,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(" ");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    const status = await validateInputs();
    if (status) {
      setShow(true);
    }
    // else {
    // toast.warn("Booking can't be done right now");
    // alert("Please select all fields");
    // }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setDisabled(true);

    try {
      let { data } = await client.query({
        query: Create_Payment_Intent,
        variables: {
          driverId: driverId,
          name: name,
          email: email,
          type: type,
          ownerId: ownerId,
          amount: parseInt(amount),
          fee: parseInt(fee),
        },
      });

      const client_secret = data.stripeCreatePaymentIntent.secret;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: driverName,
          },
        },
      });

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
        alert(result.error.message);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          handleClose();
          createBookingHandler(
            data.stripeCreatePaymentIntent.id,
            data.stripeCreatePaymentIntent.transferGroup
          );
          // alert("Payment was successful");
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
      console.log("error ", error);
    }
  };

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <>
      <div className="text-center">
        <Button variant="primary" onClick={handleShow}>
          Book Now
        </Button>
      </div>

      <Modal show={show} onHide={() => {}} centered>
        <Modal.Body>
          <div
            className="position-absolute"
            style={{ right: "10px", top: "10px" }}
          >
            <X
              onClick={handleClose}
              className="cursor-pointer"
              style={{ pointerEvents: disabled ? "none" : "auto" }}
            />
          </div>
          <div className="text-center py-3">
            <CheckCircle className="text-success mb-2" size={50} />
            <h3>{`Pay $${(amount / 100).toFixed(2)} to book the space now`}</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <button
              className="stripe-button"
              type="submit"
              disabled={error ? true : false}
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
                `Pay $${(amount / 100).toFixed(2)}`
              )}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {
    authenticated: auth.authenticated,
    name: auth.authenticated ? auth.data.attributes.name : null,
    email: auth.authenticated ? auth.data.attributes.email : null,
    driverId: auth.authenticated ? auth.data.attributes.sub : null,
    type: user.profileType,
  };
};

export default connect(mapStateToProps)(CheckoutForm);
