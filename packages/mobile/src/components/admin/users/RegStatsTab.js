import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
import dateFilter from '@parkyourself-frontend/shared/config/dateFilter';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ScreenTittle from '../../common/ScreenTittle';
import UsersList from './UsersList';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <>
      <View style={styles.headerView}>
        <ScreenTittle title="REGISTRATION STATS" />
        <TouchableOpacity style={styles.filterRow} onPress={() => Alert.alert('Filter')}>
          <Text style={styles.filterText}>FILTER</Text>
          <AntDesignIcon name="downcircleo" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.secondary,
          indicatorStyle: {
            backgroundColor: colors.primary
          },
          labelStyle: { fontWeight: 'bold' }
        }}>
        <Tab.Screen name="Today" component={TodayTab} />
        <Tab.Screen name="Last Week" component={LastWeekTab} />
        <Tab.Screen name="Last Month" component={LastMonthTab} />
      </Tab.Navigator>
    </>
  );
}

const TodayTab = () => (
  <UsersList showTime={true} lowerRange={dateFilter.oneDayBack} higherRange={new Date()} />
);
const LastWeekTab = () => (
  <UsersList showTime={true} lowerRange={dateFilter.oneWeekBack} higherRange={new Date()} />
);
const LastMonthTab = () => (
  <UsersList showTime={true} lowerRange={dateFilter.oneMonthBack} higherRange={new Date()} />
);

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterRow: {
    flexDirection: 'row'
  },
  icon: {
    color: 'black',
    fontSize: 15,
    marginLeft: 3
  },
  filterText: {
    fontWeight: '500'
  }
});
