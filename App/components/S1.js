import React from 'react';
import { Text, View, Button, Alert } from 'react-native';

const S1 = ({
  params,
}) => {
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  return (
    <View>
      <Button title={"2-Button Alert"} onPress={createTwoButtonAlert} />
      <Text>S1</Text>
    </View>
  );
}

export default S1;
