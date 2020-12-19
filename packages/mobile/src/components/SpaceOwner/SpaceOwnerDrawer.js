import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SpaceOwnerDashboardStack from './SpaceOwnerDashboardStack';
import SpaceOwnerDrawerComponent from './SpaceOwnerDrawerComponent';
const drawer = createDrawerNavigator();

export default function SpaceOwnerDrawer() {
  return (
    <drawer.Navigator drawerContent={() => <SpaceOwnerDrawerComponent />}>
      <drawer.Screen
        name="SpaceOwnerDashboardStack"
        component={SpaceOwnerDashboardStack}
      />
    </drawer.Navigator>
  );
}
