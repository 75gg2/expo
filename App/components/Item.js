import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: props.key
        };
    }

    render() {
        return (
            <View>
                <Text> Item. Key={this.state.key}</Text>
            </View>
        );
    }
}

export default Item;
