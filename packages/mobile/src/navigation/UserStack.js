import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppDrawer from '../components/common/AppDrawer';
import HeaderLogo from '../components/HeaderLogo';
import MenuButton from '../components/MenuButton';
import AddListing from '../screens/SpaceOwner/AddListing';
import UserTabs from './UserTabs';
import MyBookings from '../screens/MyBookings';
import AddVehicle from '../screens/AddVehicle';
import Payments from '../screens/Payments';
import AddCreditDebitCard from '../screens/AddCreditDebitCard';
import InboxScreen from '../screens/InboxScreen';
import ChatScreen from '../screens/ChatScreen';
import MyReviews from '../screens/MyReviews';
import ReviewDetails from '../screens/ReviewDetails';
import ReferFriend from '../screens/ReferFriend';
import FAQScreen from '../screens/FAQScreen';
import FAQDetails from '../screens/FAQDetails';
import Settings from '../screens/Settings';
import TermsAndConditions from '../screens/TermsAndConditions';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import MoreDetails from '../screens/MoreDetails';
import Reviews from '../screens/Reviews';
import SuccessfullyBooked from '../screens/SuccessfullyBooked';
import CodeScreen from '../screens/CodeScreen';
import PayNowScreen from '../screens/PayNowScreen';
import CreateSpaceOwnerProfile from '../screens/SpaceOwner/CreateSpaceOwnerProfile';
import WithdrawalSettings from '../screens/SpaceOwner/WithdrawalSettings';

const drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={UserTabs}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="AddListing" component={AddListing} />
      <Stack.Screen
        name="MyBookings"
        component={MyBookings}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="AddVehicle"
        component={AddVehicle}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="Payments"
        component={Payments}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="AddCreditDebitCard"
        component={AddCreditDebitCard}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="Inbox"
        component={InboxScreen}
        options={({ navigation }) => ({
          title: '',
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="MyReviews"
        component={MyReviews}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="ReviewDetails"
        component={ReviewDetails}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="ReferFriend"
        component={ReferFriend}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQScreen}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="FAQDetails"
        component={FAQDetails}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />
        })}
      />
      <Stack.Screen name="PayNow" component={PayNowScreen} />
      <Stack.Screen name="MoreDetails" component={MoreDetails} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="SuccessfullyBooked" component={SuccessfullyBooked} />
      <Stack.Screen name="CodeScreen" component={CodeScreen} />
      <Stack.Screen name="CreateSpaceOwnerProfile" component={CreateSpaceOwnerProfile} />
      <Stack.Screen name="WithdrawalSettings" component={WithdrawalSettings} />
    </Stack.Navigator>
  );
};

export default function UserDrawer() {
  return (
    <drawer.Navigator drawerContent={() => <AppDrawer />}>
      <drawer.Screen name="UserStack" component={UserStack} />
    </drawer.Navigator>
  );
}
