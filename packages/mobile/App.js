import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
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
import { toggleLoadingModal } from '@parkyourself-frontend/shared/redux/actions/user';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import MainStack from './src/navigation/MainStack';
import LoadingModal from './src/components/common/LoadingModal';

async function urlOpener(url, redirectUrl) {
  await InAppBrowser.isAvailable();
  const { type, url: newUrl } = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false
  });
  let splitUrl = newUrl;
  if (splitUrl && splitUrl.includes('?code')) {
    splitUrl = `parkyourself://?${newUrl.split('#_=_')[0].split('?')[1] || ''}`;
  }
  if (type === 'success') {
    Linking.openURL(splitUrl);
  }
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['tempListing', 'redirect', 'findParking']
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
          <LoadingModal />
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
      // Alert.alert('Fecthing User');
      props.dispatch(toggleLoadingModal(true));
      const user = await Auth.currentAuthenticatedUser();
      // console.log('User', user);
      if (user) {
        // Alert.alert('User', 'Got user');
        const data = {
          attributes: user.attributes,
          signInUserSession: user.signInUserSession,
          admin: user.signInUserSession.accessToken.payload['cognito:groups']
            ? user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('superadmin') >
              -1
            : false
        };
        props.dispatch(toggleLoadingModal(false));
        props.dispatch(setAuthUser(data));
      }
      props.dispatch(initialAuthUser());
    } catch (error) {
      props.dispatch(initialAuthUser());
      props.dispatch(toggleLoadingModal(false));
      // Alert.alert('No Data Found', error.message);
      // console.log('Error', error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url2) => {
        handleOpenURL({ url: url2 });
      });
    } else {
      Linking.addEventListener('url', handleOpenURL);
    }
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          getAuthData();
          break;
        case 'cognitoHostedUI_failure':
          Alert.alert('Sign In Failed', `Please try again`);
          props.dispatch(toggleLoadingModal(false));
          break;
        default:
          return null;
      }
    });
    getAuthData();
    return () => Linking.removeEventListener('url', handleOpenURL);
  }, []);

  const handleOpenURL = (event) => {
    if (event.url && event.url.includes('?code')) {
      props.dispatch(toggleLoadingModal(true));
    }
  };
  return null;
});
