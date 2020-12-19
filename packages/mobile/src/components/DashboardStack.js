import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MenuButton from './MenuButton';
import Filter from './Filter';
import HeaderLogo from './HeaderLogo';
import Dashboard from '../screens/Dashboard';
import MyBookings from '../screens/MyBookings';
import AddVehicle from '../screens/AddVehicle';
import Payments from '../screens/Payments';
import AddCreditDebitCard from '../screens/AddCreditDebitCard';
import Inbox from '../screens/Inbox';
import ChatScreen from '../screens/ChatScreen';
import MyReviews from '../screens/MyReviews';
import ReviewDetails from '../screens/ReviewDetails';
import ReferFriend from '../screens/ReferFriend';
import FAQScreen from '../screens/FAQScreen';
import FAQDetails from '../screens/FAQDetails';
import Settings from '../screens/Settings';
import TermsAndConditions from '../screens/TermsAndConditions';
import PrivacyPolicy from '../screens/PrivacyPolicy';

const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        title:"",
        headerTitle: () => <HeaderLogo />,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Stack.Screen
        name="DashboardScreen"
        component={Dashboard}
        options={({navigation}) => ({
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitle: () => <HeaderLogo />,
          headerRight: () => <Filter />,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="MyBookings"
        component={MyBookings}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="AddVehicle"
        component={AddVehicle}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="Payments"
        component={Payments}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="AddCreditDebitCard"
        component={AddCreditDebitCard}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="Inbox"
        component={Inbox}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="MyReviews"
        component={MyReviews}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="ReviewDetails"
        component={ReviewDetails}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="ReferFriend"
        component={ReferFriend}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQScreen}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="FAQDetails"
        component={FAQDetails}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
        })}
      />
    </Stack.Navigator>
  );
}
