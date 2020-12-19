import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppDrawer from '../components/AppDrawer';
import MyBookingsStack from './MyBookingsStack';
const drawer = createDrawerNavigator();

export default function MyBookingsDrawer() {
  return (
    <drawer.Navigator drawerContent={() => <AppDrawer />}>
      <drawer.Screen name='MyBookingsStack' component={MyBookingsStack} />
    </drawer.Navigator>
  );
}
