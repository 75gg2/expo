import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native';
import {Note} from "../Note";
import {TouchableOpacity} from "react-native";

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
        textAlign:"center",
        fontSize:20
    },
    center:{
        alignContent:"center"
    }
})

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props,
            titleInputValue: "",
            contentInputValue: ""
        };
    }

    clearForm = () => {
        this.setState({
            titleInputValue: "",
            contentInputValue: ""
        })
    }

    render() {
        return (
            <View>
                <TextInput style={styles.input}
                           underlineColorAndroid="gray"
                           placeholder="Tytuł..."
                           value={this.state.titleInputValue}
                           onChangeText={(text) => this.setState({titleInputValue: text})}
                           multiline={false}
                />
                <TextInput style={styles.input}
                           underlineColorAndroid="gray"
                           placeholder="Treść..."
                           value={this.state.contentInputValue}
                           onChangeText={(text) => this.setState({contentInputValue: text})}
                           multiline={true}
                />
                <TouchableOpacity
                    style={styles.center}
                    onPress={() => {
                        addAlert(this.state.titleInputValue, this.state.contentInputValue, this.clearForm)
                    }}>
                    <Text
                        style={styles.button}>
                        DODAJ
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}


export default AddNote;
