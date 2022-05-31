import React, {Component} from 'react';
import {View, Text, FlatList, TextInput} from 'react-native';
import {Note} from "../Note";
import SingleNote from "./SingleNote";

class AllNotes extends Component {
    constructor(props) {
        super(props);
        this.props = props
        this.state = {data: [], searched:[], searchInputValue: ""};
        this.funkcja = null
    }
    reloadSearch=()=>{
        const pattern = this.state.searchInputValue
        const tab = this.state.data.filter((e)=>{
            if((e.title).includes(pattern))
                return e
            if((e.content).includes(pattern))
                return e
            if((e.cat).includes(pattern))
                return e
        })
        if (tab.length % 2 === 1)
            tab.push({
                key: -1,
                hidden: true,
                color: "rgba(0,0,0,0)",
                date: 0,
                title: "",
                content: "",
            })
        this.setState({searched:tab})
    }
    refresh = () => {
        const data = Note.getAll("keys")
        data.then((d) => {
            let tab = d
            this.setState({data: tab},this.reloadSearch)
        })
    }

    componentDidMount() {
        this.funkcja = this.props.navigation.addListener('focus', () => {
            this.refresh()
        });
        this.refresh()
    }

    componentWillUnmount() {
        this.funkcja();
    }

    render() {
        return (

            <View>
                <TextInput
                    style={ {
                            padding: 10,
                            margin: 10,
                            fontSize: 20,
                        }}
                    underlineColorAndroid="gray"
                    placeholder="Tytuł..."
                    value={this.state.searchInputValue}
                    onChangeText={(text) => this.setState({searchInputValue: text},this.reloadSearch)}
                    multiline={false}
                />
                <FlatList
                    numColumns={2}
                    style={{padding: 10}}
                    columnWrapperStyle={{flex: 1, justifyContent: "space-around"}}
                    data={this.state.searched}
                    renderItem={({item}) => <SingleNote
                        data={item}
                        refresh={this.refresh}
                        navigation={this.props.navigation}
                    />}

                />
            </View>
        );
    }
}

export default AllNotes;