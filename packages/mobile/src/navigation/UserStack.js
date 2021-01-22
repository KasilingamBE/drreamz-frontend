import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppDrawer from '../components/common/AppDrawer';
import HeaderLogo from '../components/HeaderLogo';
import MenuButton from '../components/MenuButton';
import AddListing from '../screens/SpaceOwner/AddListing';
import UserTabs from './UserTabs';

const drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
        // title: '',
        // headerTitle: () => <HeaderLogo />,
        // headerStyle: {
        //   elevation: 0,
        //   shadowOpacity: 0
        // }
      }}>
      <Stack.Screen name="Tab" component={UserTabs} />
      <Stack.Screen name="AddListing" component={AddListing} />
    </Stack.Navigator>
  );
};

export default function UserDrawer() {
  return (
    <drawer.Navigator drawerContent={() => <AppDrawer />}>
      <drawer.Screen name="UserStack" component={UserStack} />
    </drawer.Navigator>
  );
}
