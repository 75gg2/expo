import * as React from 'react';
import { Alert, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import AllNotes from './components/AllNotes';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import AddCateg from './components/AddCategory';

function App() {
    const styles = StyleSheet.create({
        bigImg: {
            width: 150,
            height: 150,
            alignSelf: "center",
            margin: 30
        },
        smallImg: {
            width: 30,
            height: 30,
            alignSelf: "center",
        }
    })
    const CustomDrawerContent = (props) => {
        return (
            <DrawerContentScrollView {...props}>

                {/*<DrawerItemList {...props} />*/}

                <Image style={styles.bigImg} source={require("./assets/pen.png")}></Image>
                <DrawerItem
                    label="notatki"
                    icon={() => <Image style={styles.smallImg} source={require("./assets/writing.png")}></Image>}
                    onPress={() => props.navigation.navigate("notatki")} />
                <DrawerItem
                    label="dodaj notatkę"
                    icon={() => <Image style={styles.smallImg} source={require("./assets/plus.png")}></Image>}
                    onPress={() => props.navigation.navigate("dodaj notatkę")} />
                <DrawerItem
                    label="dodaj kategorię"
                    icon={() => <Image style={styles.smallImg} source={require("./assets/emptyPlus.png")} />}
                    onPress={() => props.navigation.navigate("dodaj kategorię")}
                />
                {/*<DrawerItem*/}
                {/*    label="label"*/}
                {/*    icon={() => <Image />}*/}
                {/*    onPress={() => props.navigation.navigate("edytuj notatkę")}*/}
                {/*/>*/}
                <DrawerItem
                    label="info"
                    icon={() => <Image style={styles.smallImg} source={require("./assets/information.png")}></Image>}
                    onPress={() => Alert.alert("Notatnik", "Autor: Kamil Gargula", [{ text: "Ok", }])} />


            </DrawerContentScrollView>
        );
    }
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
                {/*navigation={Drawer}*/}
                <Drawer.Screen name="notatki" component={AllNotes} />
                <Drawer.Screen name="dodaj notatkę" component={AddNote} />
                <Drawer.Screen name="dodaj kategorię" component={AddCateg} />
                <Drawer.Screen name="edytuj notatkę" component={EditNote} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default App;


// <Image style={styles.bigImg} source={require("./assets/writing.png")}></Image>
// <DrawerItem
//     label="test"
//
//     onPress={() => console.log("test")}
// />
// <DrawerItem label="notatki" onPress={()=>props.navigation.navigate("AllNotes")}/>
// <DrawerItem label="dodaj notatkę" onPress={()=>props.navigation.navigate("AddNote")}/>
// <DrawerItem label="info" onPress={()=>props.navigation.navigate("Info")}/>
