import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '@parkyourself-frontend/shared/config/colors';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HeaderLogo from '../components/HeaderLogo';
import MenuButton from '../components/MenuButton';
import SpaceOwnerDashboard from '../screens/SpaceOwner/SpaceOwnerDashboard';
import ParkingOrders from '../screens/SpaceOwner/ParkingOrders';
import MyListings from '../screens/SpaceOwner/MyListings';
import MyBookings from '../screens/MyBookings';
// import FindParking from '../screens/FindParking';
import FindParking from '../screens/FindParkingScreen';
import DriverDashboard from '../screens/Dashboard';
import InboxScreen from '../screens/InboxScreen';

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
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Parking Orders') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Inbox') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
          } else if (route.name === 'My Bookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Find Parking') {
            iconName = focused ? 'car' : 'car-outline';
          }
          return <Icon name={iconName} size={30} color={color} />;
        }
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.primary,
        tabStyle: {
          paddingBottom: Platform.OS === 'ios' ? 0 : 3
        }
      }}
      swipeEnabled
      animationEnabled
      initialRouteName="Profile">
      {isSpaceOwner ? (
        <>
          <Tab.Screen
            name="My Listings"
            component={MyListingsStack}
            options={{ tabBarLabel: 'Listings' }}
          />
          <Tab.Screen name="Parking Orders" component={ParkingOrdersStack} />
          <Tab.Screen name="Inbox" component={InboxStack} />
          <Tab.Screen name="Profile" component={SpaceOwnerDashboardStack} />
        </>
      ) : (
        <>
          <Tab.Screen name="My Bookings" component={MyBookingsStack} />
          <Tab.Screen name="Find Parking" component={FindParkingStack} />
          <Tab.Screen name="Inbox" component={InboxStack} />
          <Tab.Screen name="Profile" component={DriverDashboardStack} />
        </>
      )}
    </Tab.Navigator>
  );
}

function InboxStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InboxStack"
        component={InboxScreen}
        options={({ navigation }) => ({
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
          headerTitle: () => <HeaderLogo />,
          // headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleAlign: 'center'
        })}
      />
    </Stack.Navigator>
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
          // headerLeft: () => <MenuButton navigation={navigation} />,
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
          // headerLeft: () => <MenuButton navigation={navigation} />,
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
          // headerLeft: () => <MenuButton navigation={navigation} />,
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
          // headerLeft: () => <MenuButton navigation={navigation} />,
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
          // headerLeft: () => <MenuButton navigation={navigation} />,
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
          // headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleAlign: 'center'
        })}
      />
    </Stack.Navigator>
  );
}
