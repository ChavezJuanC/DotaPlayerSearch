import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import PlayerDetailsScreen from "../screens/PlayerDetailsScreen";
import HeroStatsScreen from "../screens/HeroStatsScreen";

const Stacks = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Player Search" }}
            />
            <Stack.Screen name="Hero Stats" component={HeroStatsScreen} />
            <Stack.Screen name="Player" component={PlayerDetailsScreen} />
        </Stack.Navigator>
    );
};

export default Stacks;
