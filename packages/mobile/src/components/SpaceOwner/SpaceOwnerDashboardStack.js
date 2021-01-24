import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SpaceOwnerDashboard from '../../screens/SpaceOwner/SpaceOwnerDashboard';
import CreateSpaceOwnerProfile from '../../screens/SpaceOwner/CreateSpaceOwnerProfile';
import WithdrawalSettings from '../../screens/SpaceOwner/WithdrawalSettings';
import MyListings from '../../screens/SpaceOwner/MyListings';
import ParkingOrders from '../../screens/SpaceOwner/ParkingOrders';
import HeaderLogo from '../HeaderLogo';
import MenuButton from '../MenuButton';
import AddListing from '../../screens/SpaceOwner/AddListing';

const Stack = createStackNavigator();

const SpaceOwnerDashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
        headerTitle: () => <HeaderLogo />,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0
        }
      }}>
      <Stack.Screen
        name="SpaceOwnerDashboard"
        component={SpaceOwnerDashboard}
        options={({ navigation }) => ({
          title: '',
          headerTitle: () => <HeaderLogo />,
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleAlign: 'center'
        })}
      />
      <Stack.Screen name="CreateSpaceOwnerProfile" component={CreateSpaceOwnerProfile} />
      <Stack.Screen name="MyListings" component={MyListings} />
      <Stack.Screen name="ParkingOrders" component={ParkingOrders} />
      <Stack.Screen
        name="AddListing"
        component={AddListing}
        options={({ navigation }) => ({
          headerShown: false
        })}
      />
      <Stack.Screen name="WithdrawalSettings" component={WithdrawalSettings} />
    </Stack.Navigator>
  );
};

export default SpaceOwnerDashboardStack;
