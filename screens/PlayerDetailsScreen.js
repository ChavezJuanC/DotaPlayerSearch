import { View, Text, Image, StyleSheet } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";

export default function PlayerDetailsScreen({ route }) {
    const { playerId } = route.params;
    const [playerData, setPlayerData] = useState(null); // Initialize to null to handle loading state
    const OpenDotaApiKey = "7a647979-4ee8-4484-8990-813abcfeed73";
    const API_Link = `https://api.opendota.com/api/players/${playerId}?api_key=${OpenDotaApiKey}`;

    useLayoutEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const res = await fetch(API_Link);
                const data = await res.json();
                setPlayerData(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchPlayerData();
    }, [playerId]);

    // Use useEffect to log playerData whenever it changes only for DEV
    useEffect(() => {
        console.log(playerData);
    }, [playerData]);

    ///create a loading component here
    if (!playerData) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.infoView}>
                <Image
                    source={{ uri: playerData.profile.avatarfull }}
                    style={styles.avatarImage}
                />
                <Text style={styles.nameText}>
                    {playerData.profile.personaname}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoView: {
        margin: 30,
        alignItems: "center",
    },
    avatarImage: {
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "white",
    },
    nameText: {
        padding: 25,
        fontSize: 20,
    },
});
//1029733554
//106210714
//73149933