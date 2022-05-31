import React from 'react';
import {Text, View, StyleSheet, Alert} from "react-native";
import {Note} from "../Note";
import {TouchableOpacity} from "react-native";

const SingleNote = (props) => {

    const addAlert = (key, title, refresh) => Alert.alert(
        "Usunąć Notatkę?",
        `Tytuł: ${title}`,
        [
            {
                text: "Anuluj",
                onPress: () => console.log("Cancelled"),
                style: "cancel"
            },
            {
                text: "OK", onPress: () => {
                    Note.deleteAndKey(key).then(() => refresh())
                }
            }
        ]
    )
    const date = new Date(props.data.date)
    const monthTabPL = [ "st", "lut", "mrz", "kw", "maj", "cz", "lip", "sier", "wrz", "paź", "lis", "gr"]
    const styles = StyleSheet.create({
        view:{
            backgroundColor: props.data.color,
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderRadius:15,
            flex:1/2,
            padding:15,
            margin:10,
            aspectRatio: 1,
            opacity:props.data.hidden?0:1

        },
        date:{
            color:'white',
            fontSize:18,
            fontVariant:["small-caps"],
            textAlign:"right"
        },
        title:{
            color:'white',
            fontSize:20,
        },
        content:{
            color:'white',
            fontSize:17,
        },
        cat:{
            backgroundColor:'#303030',
            color:'white',
            fontSize:17,
            padding:3,
            borderRadius:10
        }
    })
    return (
        <TouchableOpacity style={styles.view}
                          onLongPress={()=>{if(props.data.key!==-1)addAlert(props.data.key, props.data.title, props.refresh)}}
                          onPress={()=>{props.navigation.navigate("edytuj notatkę", {data:props.data})}}
        >
            <Text style={styles.cat}>{props.data.cat}</Text>
            <Text style={styles.date}>{date.getDay()+" "+monthTabPL[date.getMonth()].toUpperCase()}</Text>
            <Text style={styles.title}>{props.data.title}</Text>
            <Text style={styles.content}>{props.data.content}</Text>
        </TouchableOpacity>
    );
};

export default SingleNote;
