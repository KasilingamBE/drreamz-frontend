import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SpaceOwnerDashboard from '../../screens/SpaceOwner/SpaceOwnerDashboard';
import CreateSpaceOwnerProfile from '../../screens/SpaceOwner/CreateSpaceOwnerProfile';
import MyListings from '../../screens/SpaceOwner/MyListings';
import ParkingOrders from '../../screens/SpaceOwner/ParkingOrders';
import AddListingLocation from '../../screens/SpaceOwner/AddListingLocation';
import AddListingSpaceDetails from '../../screens/SpaceOwner/AddListingSpaceDetails';
import SpaceAvailable from '../../screens/SpaceOwner/SpaceAvailable';
import SetPricingType from '../../screens/SpaceOwner/SetPricingType';
import FlatBillingType from '../../screens/SpaceOwner/FlatBillingType';
import VariableBillingType from '../../screens/SpaceOwner/VariableBillingType';
import SaveSpaceDetails from '../../screens/SpaceOwner/SaveSpaceDetails';
import CustomSchedule from '../../screens/SpaceOwner/CustomSchedule';
import HeaderLogo from '../HeaderLogo';
import MenuButton from '../MenuButton';
import AddListing from '../../screens/SpaceOwner/AddListing';
import WithdrawalSettings from '../../screens/SpaceOwner/WithdrawalSettings';

const Stack = createStackNavigator();

const SpaceOwnerDashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
        headerTitle: () => <HeaderLogo />,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Stack.Screen
        name="SpaceOwnerDashboard"
        component={SpaceOwnerDashboard}
        options={({navigation}) => ({
          title: '',
          headerTitle: () => <HeaderLogo />,
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="CreateSpaceOwnerProfile"
        component={CreateSpaceOwnerProfile}
        options={({navigation}) => ({
          title: '',
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="MyListings"
        component={MyListings}
        options={({navigation}) => ({
          title: '',
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="ParkingOrders"
        component={ParkingOrders}
        options={({navigation}) => ({
          title: '',
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="AddListing"
        component={AddListing}
        options={({navigation}) => ({
          title: '',
          //   headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="WithdrawalSettings"
        component={WithdrawalSettings}
        options={({navigation}) => ({
          title: '',
          //   headerTitle: () => <HeaderLogo />,
        })}
      />
    </Stack.Navigator>
  );
};

export default SpaceOwnerDashboardStack;
