import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdminDashboard from '../screens/admin/AdminDashboard';

const Stack = createStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{
          headerShown: false,
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}
