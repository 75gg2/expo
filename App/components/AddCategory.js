import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {Note} from "../Note";



const styles = StyleSheet.create({
    input: {
        padding: 10,
        margin: 20,
        fontSize: 20,
    },
    button: {
        color: "#000000",
        backgroundColor: "rgba(0,0,0,0)",
        textAlign: "center",
        fontSize: 20
    },
    center: {
        alignContent: "center"
    }
})
export default class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextInput
                    style={styles.input}
                    defaultValue="KATEGORIA..."
                    underlineColorAndroid="gray"
                    value={this.state.categoryInputVal}
                    onChangeText={(text) => this.setState({ categoryInputVal: text })}
                    multiline={true} />
                <TouchableOpacity style={styles.center} onPress={() => {
                    const newCategory = this.state.categoryInputVal
                    if (newCategory.length < 3) {
                        Alert.alert("Błąd:", "Minimum 3 znaki")
                    }
                    else{
                        Note.createAndSaveCategory(this.state.categoryInputVal).then(() => console.log("Created Item"))
                        this.setState({categoryInputValue:""})
                    }

                }}>
                    <Text style={styles.button}>DODAJ</Text>
                </TouchableOpacity>
            </View >
        );
    }
}
