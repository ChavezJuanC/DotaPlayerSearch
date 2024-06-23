import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "./screens/HomeScreen";
import MatchScreen from "./screens/MatchScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stacks = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default function App() {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home Page"
                    component={Stacks}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <Ionicons name="home" />,
                    }}
                />
                <Tab.Screen
                    name="Matches"
                    component={MatchScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <Ionicons name="home" />,
                    }}
                />{" "}
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <Ionicons name="home" />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
