import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import { View, StyleSheet } from 'react-native';
import ScreenTittle from '../../common/ScreenTittle';
import FilterButton from '../../common/FilterButton';
import UsersList from './UsersList';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <>
      <View style={styles.headerView}>
        <ScreenTittle title="USERS" />
        <FilterButton />
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
        <Tab.Screen name="Drivers" component={DriverTab} />
        <Tab.Screen name="Space Owners" component={SpaceOwnerTab} />
      </Tab.Navigator>
    </>
  );
}

const DriverTab = () => <UsersList driver={true} />;
const SpaceOwnerTab = () => <UsersList spaceOwner={true} />;

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
