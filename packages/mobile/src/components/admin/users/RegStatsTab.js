import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import dateFilter from '@parkyourself-frontend/shared/config/dateFilter';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ScreenTittle from '../../common/ScreenTittle';
import UsersList from './UsersList';
import FilterButton from '../../common/FilterButton';
import BookingFilter from '../bookings/BookingFilter';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <>
      <View style={styles.headerView}>
        <ScreenTittle title="REGISTRATION STATS" />
        <FilterButton>
          <BookingFilter />
        </FilterButton>
      </View>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.secondary,
          indicatorStyle: {
            backgroundColor: colors.primary
          },
          labelStyle: { fontWeight: 'bold' }
        }}>
        <Tab.Screen name="Today">
          {(props) => (
            <UsersList
              {...props}
              showTime={true}
              lowerRange={dateFilter.oneDayBack}
              higherRange={new Date()}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Last Week">
          {(props) => (
            <UsersList
              {...props}
              showTime={true}
              lowerRange={dateFilter.oneWeekBack}
              higherRange={new Date()}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Last Month">
          {(props) => (
            <UsersList
              {...props}
              showTime={true}
              lowerRange={dateFilter.oneMonthBack}
              higherRange={new Date()}
            />
          )}
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
