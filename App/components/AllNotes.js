import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Note} from "../Note";
import SingleNote from "./SingleNote";

class AllNotes extends Component {
    constructor(props) {
        super(props);
        this.props = props
        this.state = {data: []};
        this.funkcja = null
    }

    refresh = () => {
        const data = Note.getAll()
        data.then((d) => {
            let tab = d
            if(tab.length%2===1)
                tab.push({
                    key:-1,
                    hidden:true,
                    color:"rgba(0,0,0,0)",
                    date:0,
                    title:"",
                    content:"",
                })
            this.setState({data: tab})
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
                <FlatList
                    numColumns={2}
                    style={{padding: 10}}
                    columnWrapperStyle={{flex: 1, justifyContent: "space-around"}}
                    data={this.state.data}
                    renderItem={({item}) => <SingleNote data={item} refresh={this.refresh}/>}

                />
            </View>
        );
    }
}

export default AllNotes;