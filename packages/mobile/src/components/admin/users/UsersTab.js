import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '@parkyourself-frontend/shared/config/colors';
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
        <ScreenTittle title="USERS" />
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
