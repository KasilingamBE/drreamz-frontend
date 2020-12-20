import React from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import SignInStack from './SignInStack';
import SignUpStack from './SignUpStack';
import Tabs from './Tabs';
import InitialLoadingScreen from '../screens/InitialLoadingScreen';
import AdminStack from './AdminStack';

const Stack = createStackNavigator();

function MainStack(props) {
  if (!props.initial) {
    return <InitialLoadingScreen />;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      {props.authenticated ? (
        props.adminMode ? (
          <Stack.Screen
            name="AdminStack"
            component={AdminStack}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{headerShown: false}}
          />
        )
      ) : (
        <>
          <Stack.Screen
            name="SignInStack"
            component={SignInStack}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUpStack"
            component={SignUpStack}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const mapStateToProps = ({auth, user}) => {
  return {
    authenticated: auth.authenticated,
    initial: auth.initial,
    adminMode: user.adminMode,
  };
};

export default connect(mapStateToProps)(MainStack);
