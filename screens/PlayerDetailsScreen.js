import React from "react";
import { View, Text } from "react-native";

export default function PlayerDetailsScreen({ route }) {
    const { playerId } = route.params;
    //set your api key or use .env var for OpenDota API//
    const OpenDotaApiKey = "7a647979-4ee8-4484-8990-813abcfeed73";
    const API_link = `https://api.opendota.com/api/players/${playerId}`;

    //use layout effect to fetch this data//
    return (
        <View>
            <Text>Player Details for ID#{playerId}</Text>
        </View>
    );
}
