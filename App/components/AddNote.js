import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Button, Alert, Picker} from 'react-native';
import {Note} from "../Note";
import {TouchableOpacity} from "react-native";
// import { Picker } from '@react-native-picker/picker';

const addAlert = (title, content, cat, clearIfOk) => Alert.alert(
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
                Note.createAndSaveNote(title, content, cat).then(() => console.log("Created Item"))
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
    },
    picker: {
        margin: 20
    }
})

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props,
            cat: "",
            categories: [],
            titleInputValue: "",
            contentInputValue: ""
        };
    }

    refresh = () => {
        console.log("refreshed")
        const data = Note.getAll("categories")
        data.then((d) => {
            // console.log(d)
            let tab = d.map((c) => {
                return <Picker.Item label={c.title} key={c.key} value={c.title}/>
            })
            this.setState({categories: tab})
        })
    }
    componentDidMount = () => {
        this.funkcja = this.props.navigation.addListener('focus', () => {
            this.refresh()
        });
        this.refresh()
    }

    componentWillUnmount() {
        this.funkcja();
    }

    clearForm = () => {
        this.setState({
            titleInputValue: "",
            contentInputValue: "",
            cat: ""
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
                <Picker
                    style = {styles.picker}
                    selectedValue={this.state.cat}
                    onValueChange={(text) => this.setState({cat: text})}
                >
                    {this.state.categories}
                </Picker>
                <TouchableOpacity
                    style={styles.center}
                    onPress={() => {
                        addAlert(this.state.titleInputValue, this.state.contentInputValue, this.state.cat, this.clearForm)
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
