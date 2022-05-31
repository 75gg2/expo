import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.funkcja = null
    }
    refresh = () => {
        console.log("refreshed")
    }
    componentDidMount = () => {
        this.funkcja = this.props.navigation.addListener('focus', () => {
            // ta funkcja wykona się za każdym razem kiedy ekran zostanie przywrócony 
            this.refresh()
        });

        // ta funkcja wykona się raz podczas uruchomienia ekranu
        this.refresh()

    }

    componentWillUnmount() {
        this.funkcja();
    }

    render() {
        return (
            <View>
                <Text> EditNote </Text>
                <Picker
                    selectedValue={this.state.cat}
                    onValueChange={(text) => this.setState({ cat: text })}
                >

                    <Picker.Item label="AAA" value="a" />
                    <Picker.Item label="BBB" value="b" />
                    <Picker.Item label="CCC" value="c" />

                </Picker>
            </View >
        );
    }
}
