import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyListingsStack from './MyListingsStack';
import SpaceOwnerDrawerComponent from './SpaceOwnerDrawerComponent';
const drawer = createDrawerNavigator();

export default function MyListingsDrawer() {
  return (
    <drawer.Navigator drawerContent={() => <SpaceOwnerDrawerComponent />}>
      <drawer.Screen name="MyListingsStack" component={MyListingsStack} />
    </drawer.Navigator>
  );
}
