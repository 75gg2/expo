import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const addAlert = (title, content, clearIfOk) => Alert.alert(
    "Czy chcesz dodać notatkę?",
    `Tytuł: ${title}, treść: ${content}`,
    [
        {
            text: "Anuluj",
            onPress: () => console.log("Cancelled"),
            style: "cancel"
        },
        {
            text: "OK", onPress: () => {
                Note.createAndSave(title, content).then(() => console.log("Created Item"))
                clearIfOk()
            }
        }
    ]
)

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
export default class AddCateg extends Component {
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
                    value={this.state.categInputVal}
                    onChangeText={(text) => this.setState({ categInputVal: text })}
                    multiline={true} />
                <TouchableOpacity style={styles.center} onPress={() => {
                    const newCateg = this.state.categInputVal
                    if (newCateg.length < 3) {
                        Alert.alert("Błąd:", "Minimum 3 znaki")
                    }
                }}>
                    <Text style={styles.button}>DODAJ</Text>
                </TouchableOpacity>
            </View >
        );
    }
}
