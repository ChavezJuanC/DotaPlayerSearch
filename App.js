//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNav from "./navigation/HomeNav";
//styling
import Ionicons from "@expo/vector-icons/Ionicons";

//temp
import MatchScreen from "./screens/MatchScreen";
import ProfileScreen from "./screens/ProfileScreen";

export default function App() {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home Page"
                    component={HomeNav}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <Ionicons name="home" />,
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <Ionicons name="person" />,
                    }}
                />
                <Tab.Screen
                    name="Find Match"
                    component={MatchScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <Ionicons name="search" />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
