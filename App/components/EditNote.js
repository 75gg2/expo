import React, {Component} from 'react';
import {View, Text, Picker, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {Note} from "../Note";
// import { Picker } from '@react-native-picker/picker';

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
export default class EditNote extends Component {
    constructor(props) {
        super(props);
        console.log(props.route.params.data)
        this.state = {
            props,
            old: props.route.params.data,
            cat: props.route.params.data.cat,
            categories: [],
            titleInputValue: props.route.params.data.title,
            contentInputValue: props.route.params.data.content,
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
                    style={styles.picker}
                    selectedValue={this.state.cat}
                    onValueChange={(text) => this.setState({cat: text})}
                >
                    {this.state.categories}
                </Picker>
                <TouchableOpacity
                    style={styles.center}
                    onPress={() => {
                        let obj = this.state.old
                        obj.cat = this.state.cat
                        obj.title = this.state.titleInputValue
                        obj.content = this.state.contentInputValue
                        obj.date = Date.now()
                        Note.saveItem(obj.key, JSON.stringify(obj)).then(
                            this.state.props.navigation.navigate("notatki")
                        )
                    }}>
                    <Text
                        style={styles.button}>
                        AKTUALIZUJ
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
