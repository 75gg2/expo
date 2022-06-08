import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from "./components/Main"
import Gallery from "./components/Gallery"
import SelectedItem from "./components/SelectedItem";
import CameraComponent from "./components/CameraComponent";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="main" component={Main} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="gallery" component={Gallery}  />
                <Stack.Screen name="clicked" component={SelectedItem}  />
                <Stack.Screen name="camera" component={CameraComponent}  />
            </Stack.Navigator>
        </NavigationContainer>
    );

}

export default App;