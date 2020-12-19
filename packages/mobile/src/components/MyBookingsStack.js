import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyBookings from '../screens/MyBookings';
import HeaderLogo from './HeaderLogo';
import MenuButton from './MenuButton';
import Filter from './Filter';

const Stack = createStackNavigator();

export default function MyBookingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <HeaderLogo />,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Stack.Screen
        name='MyBookingsScreen'
        component={MyBookings}
        options={({ navigation }) => ({
          //   headerStyle: {
          //     // paddingHorizontal: 10,
          //   },
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitle: () => <HeaderLogo />,
          headerRight: () => <Filter />,
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
}
