import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import PlayerDetailsScreen from "../screens/PlayerDetailsScreen";

const Stacks = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Player" component={PlayerDetailsScreen} />
        </Stack.Navigator>
    );
};

export default Stacks;
