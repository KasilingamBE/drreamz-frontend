import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ParkingOrdersStack from './ParkingOrdersStack';
import SpaceOwnerDrawerComponent from './SpaceOwnerDrawerComponent';
const drawer = createDrawerNavigator();

export default function ParkingOrderDrawer() {
  return (
    <drawer.Navigator drawerContent={() => <SpaceOwnerDrawerComponent />}>
      <drawer.Screen name="ParkingOrdersStack" component={ParkingOrdersStack} />
    </drawer.Navigator>
  );
}
