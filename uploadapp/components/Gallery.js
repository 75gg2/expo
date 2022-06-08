import React from "react";
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as MediaLibrary from "expo-media-library";
import FotoItem from "./FotoItem";

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
        props.navigation.addListener("focus", () => this.refresh())
        this.state = {
            padding: 10,
            photos: [],
            quantity: 3,
            itemWidth: 100,
            itemHeight: 100,
            isList: false,
            selected: []
        }
    }

    async refresh() {
        console.log("refresh")
        let {status} = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }

        let album = await MediaLibrary.getAlbumAsync("DCIM")
        let obj = await MediaLibrary.getAssetsAsync({
            album: album,
            first: 100,
            mediaType: 'photo'
        })
        this.setState({selected: [], photos: obj})
    }

    async componentDidMount() {
        await this.refresh()
        this.renderGrid()
    }

    renderGrid() {
        const prefferedWidth = 60
        const prefferedPadding = 6
        const width = Dimensions.get("window").width - 2 * prefferedPadding
        const fullItems = Math.floor(width / prefferedWidth)
        const itemWidth = prefferedWidth + (width % prefferedWidth) / fullItems
        this.setState({
            itemWidth: itemWidth,
            itemHeight: itemWidth,
            quantity: fullItems,
            padding: prefferedPadding,
            isList: false,
        })
    }

    renderList() {
        const prefferedPadding = 6
        const prefferdHeight = 200

        const width = Dimensions.get("window").width - 2 * prefferedPadding
        this.setState({
            itemWidth: width,
            itemHeight: prefferdHeight,
            quantity: 1,
            padding: prefferedPadding,
            isList: true,
        })
    }

    selectOne = (id, selected) => {
        const tab = this.state.selected
        const index = tab.indexOf(id);
        if (index !== -1) {
            tab.splice(index, 1);
        }
        if (selected)
            tab.push(id)
        this.setState({
            selected: tab
        }, () => console.log(this.state.selected))

    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => {
                            this.refresh()
                            if (this.state.isList)
                                this.renderGrid()
                            else
                                this.renderList()

                        }}>
                        <Text
                            style={styles.buttons}>
                            GRID/LIST
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("camera")
                        }}>
                        <Text
                            style={styles.buttons}>
                            CAMERA
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => {
                            await MediaLibrary.deleteAssetsAsync(this.state.selected)
                            this.refresh()
                        }}>
                        <Text
                            style={styles.buttons}>
                            REMOVE
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={async () => {
                            const validPhotos = (this.state.photos.assets).filter((p) => {
                                return (this.state.selected).includes(p.id)
                            })
                            console.log(validPhotos)

                            const data = new FormData();

                            validPhotos.forEach((v) => {
                                data.append(v.id, {
                                    uri: v.uri,
                                    type: 'image/jpeg',
                                    name: v.filename
                                });
                            })

                            fetch("http://192.168.1.11:3000/upload", {
                                method: 'POST',
                                body: data
                            })

                            this.refresh()
                        }}>
                        <Text
                            style={styles.buttons}>
                            UPLOAD
                        </Text>
                    </TouchableOpacity>

                </View>
                <FlatList
                    numColumns={this.state.quantity}
                    key={this.state.quantity}
                    style={{padding: this.state.padding}}
                    // columnWrapperStyle={{flex: 1, justifyContent: "space-around"}}
                    data={this.state.photos.assets}
                    renderItem={({item}) =>
                        <FotoItem
                            data={item}
                            widthHeight={{
                                width: this.state.itemWidth,
                                height: this.state.itemHeight
                            }}
                            select={this.selectOne}
                            padding={this.state.padding}
                            navigation={this.props.navigation}
                        />}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    buttons: {
        padding: 10,
        fontSize: 20,
    }
})