import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as Font from "expo-font";

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fontLoaded: false
        }

    }

    componentDidMount = async () => {
        await Font.loadAsync({
            "mainfont": require('../fonts/seasideresortnf.ttf'),
        })
        this.setState({fontLoaded: true})
    }

    render() {
        return (
            this.state.fontLoaded
                ?
                <TouchableOpacity
                    style={styles.container}
                    onPress={
                        () => this.props.navigation.navigate("gallery")
                    }>
                    <View>
                        <Text style={styles.title}>Photos App</Text>
                        <Text style={styles.subTitle}>show gallery pictures</Text>
                        <Text style={styles.subTitle}>delete photo from device,</Text>
                        <Text style={styles.subTitle}>share photo</Text>
                    </View>
                </TouchableOpacity>
                :
                null
        )
    }

}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#034b00",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    title: {
        fontFamily: "mainfont",
        color: "white",
        textAlign: "center",
        fontSize: 50,
        marginBottom: 50,
    },
    subTitle: {
        // fontFamily: "mainfont",
        fontSize: 20,
        paddingHorizontal: 10,
        color: "white",
        textAlign: "center",
    }
})