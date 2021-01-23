import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@parkyourself-frontend/shared/config/colors';
import { createStackNavigator } from '@react-navigation/stack';
import HeaderLogo from '../components/HeaderLogo';
import MenuButton from '../components/MenuButton';
import SpaceOwnerDashboard from '../screens/SpaceOwner/SpaceOwnerDashboard';
import ParkingOrders from '../screens/SpaceOwner/ParkingOrders';
import MyListings from '../screens/SpaceOwner/MyListings';
import MyBookings from '../screens/MyBookings';
import FindParking from '../screens/FindParking';
import DriverDashboard from '../screens/Dashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function UserTabs() {
  const isSpaceOwner = useSelector(({ user }) => user.isSpaceOwner);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'My Listings') {
            iconName = 'calendar-clock';
          } else if (route.name === 'Parking Orders') {
            iconName = 'car-hatchback';
          } else if (route.name === 'Dashboard') {
            iconName = 'view-dashboard-outline';
          } else if (route.name === 'My Bookings') {
            iconName = 'calendar-clock';
          } else if (route.name === 'Find Parking') {
            iconName = 'car-hatchback';
          } else if (route.name === 'Dashboard') {
            iconName = 'view-dashboard-outline';
          }
          return <Icon name={iconName} size={30} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: colors.secondary,
        inactiveTintColor: colors.primary
      }}
      swipeEnabled
      animationEnabled
      initialRouteName="Dashboard">
      {isSpaceOwner ? (
        <>
          <Tab.Screen name="My Listings" component={MyListingsStack} />
          <Tab.Screen name="Parking Orders" component={ParkingOrdersStack} />
          <Tab.Screen name="Dashboard" component={SpaceOwnerDashboardStack} />
        </>
      ) : (
        <>
          <Tab.Screen name="My Bookings" component={MyBookingsStack} />
          <Tab.Screen name="Find Parking" component={FindParkingStack} />
          <Tab.Screen name="Dashboard" component={DriverDashboardStack} />
        </>
      )}
    </Tab.Navigator>
  );
}

function MyBookingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyBookingsStack"
        component={MyBookings}
        options={({ navigation }) => ({
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
          headerTitle: () => <HeaderLogo />,
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleAlign: 'center'
        })}
      />
    </Stack.Navigator>
  );
}

function FindParkingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FindParkingStack"
        component={FindParking}
        options={({ navigation }) => ({
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
          headerTitle: () => <HeaderLogo />,
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleAlign: 'center'
        })}
      />
    </Stack.Navigator>
  );
}

function DriverDashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DriverDashboardStack"
        component={DriverDashboard}
        options={({ navigation }) => ({
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
          headerTitle: () => <HeaderLogo />,
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleAlign: 'center'
        })}
      />
    </Stack.Navigator>
  );
}

function MyListingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyListingsStack"
        component={MyListings}
        options={({ navigation }) => ({
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
          headerTitle: () => <HeaderLogo />,
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleAlign: 'center'
        })}
      />
    </Stack.Navigator>
  );
}

function ParkingOrdersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ParkingOrdersStack"
        component={ParkingOrders}
        options={({ navigation }) => ({
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
          headerTitle: () => <HeaderLogo />,
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleAlign: 'center'
        })}
      />
    </Stack.Navigator>
  );
}

function SpaceOwnerDashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SpaceOwnerDashboardStack"
        component={SpaceOwnerDashboard}
        options={({ navigation }) => ({
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
          headerTitle: () => <HeaderLogo />,
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleAlign: 'center'
        })}
      />
    </Stack.Navigator>
  );
}
