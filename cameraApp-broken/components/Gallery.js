import React from "react";
import {Button, Dimensions, FlatList, View} from "react-native";
import * as MediaLibrary from "expo-media-library";
import FotoItem from "./FotoItem";

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            padding: 10,
            photos: [],
            quantity: 3,
            itemWidth: 100,
            itemHeight: 100,
            isList: false,
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
        this.setState({photos: obj})
    }

    async componentDidMount() {
        await this.refresh()
        this.renderGrid()
    }

    async componentWillUnmount() {
        await this.refresh()
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

    render() {
        return (
            <View>
                <Button
                    onPress={() => {
                        if (this.state.isList)
                            this.renderGrid()
                        else
                            this.renderList()
                    }}
                    title="GRID/LIST"
                />
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
                            refresh={this.refresh}
                            padding={this.state.padding}
                            navigation={this.props.navigation}
                        />}
                />
            </View>
        )
    }

}