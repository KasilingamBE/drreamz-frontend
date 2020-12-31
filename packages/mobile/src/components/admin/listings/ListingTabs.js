import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import { View, StyleSheet } from 'react-native';
import ScreenTittle from '../../common/ScreenTittle';
import ListingList from './ListingList';
import FilterButton from '../../common/FilterButton';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <>
      <View style={styles.headerView}>
        <ScreenTittle title="PARKING INVENTORY" />
        <FilterButton />
      </View>
      <Tab.Navigator
        tabBarOptions={{
          scrollEnabled: true,
          activeTintColor: colors.secondary,
          indicatorStyle: {
            backgroundColor: colors.primary
          },
          labelStyle: { fontWeight: 'bold' }
        }}>
        <Tab.Screen name="ALL" component={ListingList} />
        <Tab.Screen name="PENDING" component={ListingList} />
        <Tab.Screen name="ACTIVE" component={ListingList} />
        <Tab.Screen name="INACTIVE" component={ListingList} />
        <Tab.Screen name="DELETED" component={ListingList} />
      </Tab.Navigator>
    </>
  );
}

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
