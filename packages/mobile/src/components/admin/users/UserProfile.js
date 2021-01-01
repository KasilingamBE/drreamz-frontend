import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import { View, StyleSheet, ScrollView } from 'react-native';
import ScreenTittle from '../../common/ScreenTittle';
import UserProfileCard from './UserProfileCard';
import BookingTabs from '../bookings/BookingTabs';
import ListingTabs from '../listings/ListingTabs';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs({ user }) {
  return (
    <>
      <View style={styles.headerView}>
        <ScreenTittle title="USER PROFILE" />
      </View>
      <UserProfileCard user={user} />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.secondary,
          indicatorStyle: {
            backgroundColor: colors.primary
          },
          labelStyle: { fontWeight: 'bold' }
        }}>
        <Tab.Screen name="Bookings">
          {(props) => <BookingTabs {...props} username={user.username} showHeader={false} />}
        </Tab.Screen>
        <Tab.Screen name="Listings">
          {(props) => <ListingTabs {...props} username={user.username} showHeader={false} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}
// const Bookings = () => <BookingTabs username={user.username} />;
// const Listings = () => <UsersList spaceOwner={true} />;

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
