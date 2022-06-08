import React from "react";
import {Image, TouchableOpacity} from "react-native";

export default class FotoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false
        }
    }

    click = () => this.props.select(this.props.data.id, this.state.select)

    render() {
        return (
            <TouchableOpacity
                style={{
                    padding: this.props.padding,
                    backgroundColor: this.state.select ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)"
                }}
                onPress={() => this.props.navigation.navigate("clicked", {data: this.props.data})}
                onLongPress={() => {
                    this.setState({select: !this.state.select},
                        this.click)
                }}>
                <Image
                    style={{
                        borderRadius: 10,
                        width: this.props.widthHeight.width - 2 * this.props.padding,
                        height: this.props.widthHeight.height - 2 * this.props.padding
                    }}
                    source={{uri: this.props.data.uri}}
                />
                <Image
                    source={require("../assets/accept.png")}
                    style={{
                        opacity:this.state.select?1:0,
                        borderRadius: 10,
                        position: "absolute",
                        margin: this.props.padding,
                        width: 30,
                        height: 30,
                        backgroundColor: "red",
                    }}/>
            </TouchableOpacity>
        )
    }
}