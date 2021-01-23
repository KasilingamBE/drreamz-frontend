/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import SignInStack from './SignInStack';
import SignUpStack from './SignUpStack';
// import InitialLoadingScreen from '../screens/InitialLoadingScreen';
import AdminStack from './AdminStack';
import UserStack from './UserStack';

const Stack = createStackNavigator();

function MainStack({ authenticated, admin, adminMode }) {
  // if (!props.initial) {
  //   return <InitialLoadingScreen />;
  // }
  return (
    <Stack.Navigator>
      {authenticated ? (
        admin && adminMode ? (
          <Stack.Screen name="AdminStack" component={AdminStack} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />
        )
      ) : (
        <>
          <Stack.Screen
            name="SignInStack"
            component={SignInStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpStack"
            component={SignUpStack}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const mapStateToProps = ({ auth, user }) => {
  return {
    authenticated: auth.authenticated,
    admin: auth.data.admin,
    initial: auth.initial,
    adminMode: user.adminMode
  };
};

export default connect(mapStateToProps)(MainStack);
