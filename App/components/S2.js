import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Item from './Item'
import { FlatList } from 'react-native-gesture-handler';
class S2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> S2 </Text>
        <FlatList
          data={
            [
              { key: 'a' },
              { key: 'b' },
              { key: 'c' },
            ]
          }
        />
      </View>
    );
  }
}

export default S2;
