import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import { View } from 'react-native';
import ScreenTittle from '../../common/ScreenTittle';
import UsersList from './UsersList';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <>
      <View style={{ backgroundColor: colors.white, paddingHorizontal: 20, paddingVertical: 5 }}>
        <ScreenTittle title="Users" />
      </View>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.secondary,
          indicatorStyle: {
            backgroundColor: colors.primary
          },
          labelStyle: { fontWeight: 'bold' }
        }}>
        <Tab.Screen name="All" component={UsersList} />
        <Tab.Screen name="Drivers" component={UsersList} />
        <Tab.Screen name="Space Owners" component={UsersList} />
      </Tab.Navigator>
    </>
  );
}
