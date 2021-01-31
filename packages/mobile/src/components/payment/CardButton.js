import React, { useState } from 'react';
import { NativeModules, Button, View, Text } from 'react-native';

// const { CalendarModule } = NativeModules;
const { StripeBridge } = NativeModules;

const NewModuleButton = () => {
  const [text, setText] = useState('Sample Text');
  const onPress = async () => {
    // CalendarModule.createCalendarEvent('testName', 'testLocation', (eventId) => {
    //   Alert.alert('Button Press', 'Native Module');
    //   console.log('We will invoke the native module here!');
    // });

    const encryptText = await encrypt('some text');
    setText(encryptText);
  };

  const encrypt = (plainText) => {
    // Add your additional custom logic here
    return StripeBridge.encrypt(plainText);
  };

  return (
    <View>
      <Button title="Click to invoke your native module!" color="#841584" onPress={onPress} />
      <Text>{text}</Text>
    </View>
  );
};

export default NewModuleButton;
