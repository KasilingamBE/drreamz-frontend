import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import FindParking from '../screens/FindParking';
import MoreDetails from '../screens/MoreDetails';
import Reviews from '../screens/Reviews';
import SuccessfullyBooked from '../screens/SuccessfullyBooked';
import CodeScreen from '../screens/CodeScreen';
import HeaderLogo from './HeaderLogo';
import MenuButton from './MenuButton';
import Filter from './Filter';
import PayNowScreen from '../screens/PayNowScreen';
import AddVehicle from '../screens/AddVehicle';
import AddCreditDebitCard from '../screens/AddCreditDebitCard';

const Stack = createStackNavigator();

export default function FindParkingStack({navigation}) {
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
        name="FindParkingScreen"
        component={FindParking}
        options={({navigation}) => ({
          //   headerStyle: {
          //     // paddingHorizontal: 10,
          //   },
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitle: () => <HeaderLogo />,
          headerRight: () => <Filter />,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen name="PayNow" component={PayNowScreen} />
      <Stack.Screen name="AddVehicle" component={AddVehicle} />
      <Stack.Screen name="AddCreditDebitCard" component={AddCreditDebitCard} />
      <Stack.Screen name="MoreDetails" component={MoreDetails} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="SuccessfullyBooked" component={SuccessfullyBooked} />
      <Stack.Screen name="CodeScreen" component={CodeScreen} />
    </Stack.Navigator>
  );
}
