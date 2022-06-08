import {Image, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";

export default class CircleButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={styles.imgTouch}
                              onPress={this.props.onPress}
            >
                <Image style={styles.img} source={this.props.gfx}/>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    img: {
        width: 60,
        height: 60,
    },
    imgTouch: {
        padding: 20,
        backgroundColor: "rgba(255,255,255,0.37)",
        borderRadius: 100,
    },
})