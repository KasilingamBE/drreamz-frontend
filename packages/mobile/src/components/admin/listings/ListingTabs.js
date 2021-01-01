import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import { Text, View, StyleSheet } from 'react-native';
import ScreenTittle from '../../common/ScreenTittle';
import ListingList from './ListingList';
import FilterButton from '../../common/FilterButton';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs({ username = null, showHeader = true }) {
  return (
    <>
      {showHeader && (
        <View style={styles.headerView}>
          <ScreenTittle title="PARKING INVENTORY" />
          <FilterButton />
        </View>
      )}
      <Tab.Navigator
        tabBarOptions={{
          scrollEnabled: true,
          activeTintColor: colors.secondary,
          indicatorStyle: {
            backgroundColor: colors.primary
          },
          labelStyle: { fontWeight: 'bold' }
        }}>
        <Tab.Screen name="ALL">
          {(props) => <ListingList {...props} username={username} />}
        </Tab.Screen>
        <Tab.Screen name="PENDING">
          {(props) => <NoFound {...props} username={username} />}
        </Tab.Screen>
        <Tab.Screen name="ACTIVE">
          {(props) => <ListingList {...props} username={username} active={true} />}
        </Tab.Screen>
        <Tab.Screen name="INACTIVE">
          {(props) => <ListingList {...props} username={username} active={false} />}
        </Tab.Screen>
        <Tab.Screen name="DELETED">
          {(props) => <NoFound {...props} username={username} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

const NoFound = () => (
  <View
    style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontWeight: 'bold' }}>No Listings Found</Text>
  </View>
);

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
