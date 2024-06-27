import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import PlayerDetailsScreen from "../screens/PlayerDetailsScreen";
import HeroStatsScreen from "../screens/HeroStatsScreen";
import RecentGamesScreen from "../screens/RecentGamesScreen";

const Stacks = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#1f1f1f",
                },
                headerTintColor: "#e0e0e0",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                cardStyle: { backgroundColor: "#121212" },
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Player Search" }}
            />
            <Stack.Screen
                name="Hero Stats"
                component={HeroStatsScreen}
                options={{ title: "Hero Stats" }}
            />
            <Stack.Screen
                name="Player"
                component={PlayerDetailsScreen}
                options={{ title: "Player Details" }}
            />
            <Stack.Screen name="Recent Games" component={RecentGamesScreen} />
        </Stack.Navigator>
    );
};

export default Stacks;
