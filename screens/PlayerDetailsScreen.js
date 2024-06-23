import React from "react";
import { View, Text } from "react-native";

export default function PlayerDetailsScreen({ route }) {
    const { playerId } = route.params;

    return (
        <View>
            <Text>Player Details for ID#{playerId}</Text>
        </View>
    );
}
