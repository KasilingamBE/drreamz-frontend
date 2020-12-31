import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import { View, StyleSheet } from 'react-native';
import ScreenTittle from '../../common/ScreenTittle';
import BookingList from './BookingList';
import FilterButton from '../../common/FilterButton';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <>
      <View style={styles.headerView}>
        <ScreenTittle title="BOOKINGS" />
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
        <Tab.Screen name="PENDING" component={PendingBookingsTab} />
        <Tab.Screen name="UPCOMING" component={UpcomingBookingsTab} />
        <Tab.Screen name="CURRENT" component={CurrentBookingsTab} />
        <Tab.Screen name="COMPLETED" component={CompletedBookingsTab} />
        <Tab.Screen name="CANCELLED" component={CancelledBookingsTab} />
      </Tab.Navigator>
    </>
  );
}

const PendingBookingsTab = () => <BookingList status="pending" />;
const UpcomingBookingsTab = () => <BookingList status="upcoming" />;
const CurrentBookingsTab = () => <BookingList status="current" />;
const CompletedBookingsTab = () => <BookingList status="completed" />;
const CancelledBookingsTab = () => <BookingList status="cancelled" />;

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
