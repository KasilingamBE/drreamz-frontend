import React, { useState } from 'react';
import { NativeModules, Button, Alert, View, Text } from 'react-native';

const { CalendarModule } = NativeModules;

const NewModuleButton = () => {
  const [text, setText] = useState('Sample Text');

  // const onPress = () => {
  //   CalendarModule.createCalendarEvent('testName', 'testLocation');
  // };

  const onPress = () => {
    CalendarModule.createCalendarEventCallback('testName', 'testLocation', (error, eventId) => {
      if (error) {
        console.error(`Error found! ${error}`);
      }
      console.log(`event id ${eventId} returned`);
    });
  };

  return (
    <View>
      <Button title="Click to invoke your native module!" color="#841584" onPress={onPress} />
      <Text>{text}</Text>
    </View>
  );
};

export default NewModuleButton;
