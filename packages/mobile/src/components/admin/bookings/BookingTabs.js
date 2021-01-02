import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import { View, StyleSheet } from 'react-native';
import ScreenTittle from '../../common/ScreenTittle';
import BookingList from './BookingList';
import FilterButton from '../../common/FilterButton';
import BookingFilter from './BookingFilter';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs({ username = null, showHeader = true }) {
  return (
    <>
      {showHeader && (
        <View style={styles.headerView}>
          <ScreenTittle title="BOOKINGS" />
          <FilterButton>
            <BookingFilter />
          </FilterButton>
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
        <Tab.Screen name="PENDING">
          {(props) => <BookingList {...props} status="pending" username={username} />}
        </Tab.Screen>
        <Tab.Screen name="UPCOMING">
          {(props) => <BookingList {...props} status="upcoming" username={username} />}
        </Tab.Screen>
        <Tab.Screen name="CURRENT">
          {(props) => <BookingList {...props} status="current" username={username} />}
        </Tab.Screen>
        <Tab.Screen name="COMPLETED">
          {(props) => <BookingList {...props} status="completed" username={username} />}
        </Tab.Screen>
        <Tab.Screen name="CANCELLED">
          {(props) => <BookingList {...props} status="cancelled" username={username} />}
        </Tab.Screen>
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
