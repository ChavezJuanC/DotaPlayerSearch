import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";

const Stacks = ()=>{
    const Stack = createStackNavigator()
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>/
    )
}

export default function App() {
    
    const Tab = createBottomTabNavigator()
    
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home Page" component={HomeScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
