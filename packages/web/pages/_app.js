import React, { useEffect } from "react";
import LogRocket from "logrocket";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ReduxLoadingBar from "react-redux-loading";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import Amplify, { Auth } from "aws-amplify";
import reducer from "@parkyourself-frontend/shared/redux/reducers";
import middleware from "@parkyourself-frontend/shared/redux/middleware";
import { ApolloProvider } from "@apollo/client";
import { client } from '@parkyourself-frontend/shared/graphql'
import aws_exports from "@parkyourself-frontend/shared/aws-exports";
import {
  setAuthUser,
  initialAuthUser,
  unsetAuthUser,
} from "@parkyourself-frontend/shared/redux/actions/auth";
import { loadUserType } from "@parkyourself-frontend/shared/redux/actions/user";

// import "../src/assets/scss/style.scss";
// import "../src/assets1/scss/style.scss";
import "../src/assets1/css/App.css";
import "../styles/styles.scss";
import "../src/app/assets/css/stripestyles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
// import "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-day-picker/lib/style.css";

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

// import "react-clock/dist/Clock.css";

// import { persistStore, persistReducer } from "redux-persist5";
// import storage from "redux-persist5/lib/storage";
// import { PersistGate } from "redux-persist5/integration/react";

Amplify.configure({ ...aws_exports, ssr: true });

const stripePromise = loadStripe(
  "pk_test_517LnJnDPrb5EfwdRchW3z9AVO6xddwRZtSHqD311B4HW5j9Ouh9dmzU6UDiwH5Hwgh7jWSaqiQn7phQGitMPS0C500jhmK4yHw"
);

LogRocket.init("pnextz/parkyourself");
LogRocket.identify("THE_USER_ID_IN_YOUR_APP", {
  name: "Vivek Thakur",
  email: "contactvivekvt@gmail.com",
  subscriptionType: "pro",
});

const store = createStore(reducer, middleware);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Elements stripe={stripePromise}>
          <ReduxLoadingBar
            style={{ color: "red", zIndex: 9989, position: "fixed", top: 0 }}
          />
          <GetData />
          <Component {...pageProps} />
        </Elements>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;

const GetData = connect()((props) => {
  // const {loadUserType} = props;
  const getAuthData = async () => {
    try {
      let user = await Auth.currentAuthenticatedUser();
      // console.log("User", user);
      if (user) {
        const data = {
          attributes: user.attributes,
          signInUserSession: user.signInUserSession,
          admin:
            user.signInUserSession.accessToken.payload[
              "cognito:groups"
            ].indexOf("superadmin") > -1,
        };
        props.dispatch(setAuthUser(data));
        if (localStorage.getItem("isSpaceOwner")) {
          props.dispatch(
            loadUserType(
              localStorage.getItem("isSpaceOwner") === "true" ? true : false
            )
          );
        }

        // props.dispatch(initialAuthUser());
      }
    } catch (error) {
      props.dispatch(initialAuthUser());
      // console.log("Erro", error);
      // router.push("/");
    }
  };

  useEffect(() => {
    getAuthData();
  }, []);
  return null;
});
