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
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === "Home Page") {
                            iconName = "home";
                        } else if (route.name === "Profile") {
                            iconName = "person";
                        } else if (route.name === "Find Match") {
                            iconName = "search";
                        }

                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: "#22b88b",
                    tabBarInactiveTintColor: "#b0b0b0",
                    tabBarStyle: {
                        backgroundColor: "#1f1f1f",
                        borderTopWidth: 0,
                    },
                    headerStyle: {
                        backgroundColor: "#1f1f1f",
                    },
                    headerTintColor: "#e0e0e0",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                })}
            >
                <Tab.Screen
                    name="Home Page"
                    component={HomeNav}
                    options={{
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Find Match"
                    component={MatchScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
