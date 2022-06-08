import React from "react";
import {BackHandler, Platform, StyleSheet, Text, ToastAndroid, View} from "react-native";
import {Camera} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CircleButton from "./CircleButton";

const DESIRED_RATIO = "16:9";
export default class CameraComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
            type: Camera.Constants.Type.back,  // typ kamery
        };
    }

    handleBackPress = () => {
        this.props.navigation.goBack()
        return true;
    }

    componentDidMount = async () => {
        let {status} = await Camera.requestCameraPermissionsAsync();
        this.setState({hasCameraPermission: status === 'granted'});

        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    prepareRatio = async () => {
        if (Platform.OS === 'android' && this.camera) {
            const ratios = await this.camera.getSupportedRatiosAsync();
            const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];
            this.setState({ratio});
        }
    }

    render() {
        const {hasCameraPermission} = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View/>;
        } else if (hasCameraPermission === false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{flex: 1}}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{flex: 1}}
                        onCameraReady={this.prepareRatio} // You can only get the supported ratios when the camera is mounted
                        ratio={this.state.ratio}
                        type={this.state.type}>
                        <View style={styles.buttons}>
                            <CircleButton
                                gfx={require("../assets/flipCamera.png")}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}/>
                            <CircleButton
                                gfx={require("../assets/camera.png")}
                                onPress={async () => {
                                    if (this.camera) {
                                        let foto = await this.camera.takePictureAsync();
                                        let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
                                        // alert(JSON.stringify(asset, null, 4))
                                        ToastAndroid.showWithGravity(
                                            'Zapisano zdjęcie',
                                            ToastAndroid.SHORT,
                                            ToastAndroid.CENTER
                                        );
                                    }
                                }}
                            />
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({

    buttons: {
        flex: 1,
        justifyContent: "space-around",
        flexDirection: "row",
        flexWrap: "wrap-reverse",
        padding: 20
    }
})