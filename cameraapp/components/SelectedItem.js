import React from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as Sharing from 'expo-sharing'
import * as MediaLibrary from "expo-media-library";

export default class SelectedItem extends React.Component {
    constructor(props) {
        // console.log(props)
        super(props)
        this.state = {}
    }

    styles = StyleSheet.create({
            buttonText: {
                textAlignVertical:"center",
                height:50,
                fontSize:30
            },
            buttonTouchable: {
                height:50,
            },
            buttonContainer: {
                width: Dimensions.get("window").width - 20,
                height: 100,
                flexDirection: "row",
                justifyContent: "space-around",
            }

        }
    )

    render() {
        return (
            <View style={{
                padding: 10,
            }}>
                <Image
                    style={{
                        width: Dimensions.get("window").width - 20,
                        height: Dimensions.get("window").height - 120,
                    }}
                    source={{uri: this.props.route.params.data.uri}}
                />
                <View style={this.styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            Sharing.shareAsync(this.props.route.params.data.uri)
                        }}
                        style={this.styles.buttonTouchable}>
                        <Text style={this.styles.buttonText}>SHARE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => {
                            let res = await MediaLibrary.deleteAssetsAsync([this.props.route.params.data.id]);
                            console.log(res)
                            // this.props.route.params.refresh()
                            this.props.navigation.goBack();
                        }}
                        style={this.styles.buttonTouchable}>
                        <Text style={this.styles.buttonText}>DELETE</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}