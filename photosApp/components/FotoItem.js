import React from "react";
import {Image, TouchableOpacity} from "react-native";

export default class FotoItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("clicked", {data: this.props.data, refresh:this.props.refresh})}
                style={{
                    padding: this.props.padding,
                }}>
                <Image
                    style={{
                        borderRadius: 10,
                        width: this.props.widthHeight.width - 2 * this.props.padding,
                        height: this.props.widthHeight.height - 2 * this.props.padding
                    }}
                    source={{uri: this.props.data.uri}}
                />
            </TouchableOpacity>
        )
    }
}