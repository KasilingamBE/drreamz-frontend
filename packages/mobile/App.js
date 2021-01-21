import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import reducer from '@parkyourself-frontend/shared/redux/reducers';
import middleware from '@parkyourself-frontend/shared/redux/middleware';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist5';
import { PersistGate } from 'redux-persist5/integration/react';
import { ApolloProvider } from '@apollo/client';
import { client } from '@parkyourself-frontend/shared/graphql';
import AsyncStorage from '@react-native-community/async-storage';
import { setAuthUser, initialAuthUser } from '@parkyourself-frontend/shared/redux/actions/auth';
import config from '@parkyourself-frontend/shared/aws-exports';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Alert, Linking } from 'react-native';
import MainStack from './src/navigation/MainStack';

async function urlOpener(url, redirectUrl) {
  await InAppBrowser.isAvailable();
  const { type, url: newUrl } = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false
  });

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['tempListing', 'redirect']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

// Amplify.configure(config);
Amplify.configure({
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn: 'parkyourself://',
    redirectSignOut: 'parkyourself://',
    urlOpener
  }
});

const App = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <GetData />
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const GetData = connect()((props) => {
  const getAuthData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      // console.log('User', user);
      if (user) {
        const data = {
          attributes: user.attributes,
          signInUserSession: user.signInUserSession,
          admin: user.signInUserSession.accessToken.payload['cognito:groups']
            ? user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('superadmin') >
              -1
            : false
        };
        props.dispatch(setAuthUser(data));
      }
      props.dispatch(initialAuthUser());
    } catch (error) {
      props.dispatch(initialAuthUser());
      // console.log('Error', error);
    }
  };

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getAuthData();
          break;
        // case 'signOut':
        //   setUser(null);
        // break;
        // case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          // console.log('Sign in failure', data);
          Alert.alert('SignIn Failed');
          break;
      }
    });
    getAuthData();
  }, []);
  return null;
});
