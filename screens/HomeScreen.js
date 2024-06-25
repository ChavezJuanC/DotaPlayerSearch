import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState, useLayoutEffect, useEffect } from "react";

export default function HomeScreen({ navigation }) {
    const [steamId, setSteamId] = useState("");
    const [playerData, setPlayerData] = useState(null);

    const API_KEY = "7a6479794ee844848990813abcfeed73";

    const fetch_player_data = async () => {
        try {
            const res = await fetch(
                `https://api.opendota.com/api/players/${steamId}`
            );
            const data = await res.json();
            setPlayerData(data);

            if (data.error) {
                console.error("Error: Please verify player ID");

                //navigation is handled here so that the navigation params object is only define after fetch.
            } else {
                console.log(data); /////DEBUG
                navigation.navigate("Player", {
                    playerId: data.profile.account_id,
                    playerName: data.profile.personaname,
                    playerAvatar: data.profile.avatarfull,
                    playerRank: data.rank_tier,
                });
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.searchView}>
                <TextInput
                    style={styles.idInput}
                    onChangeText={setSteamId}
                    value={steamId}
                    placeholder="Steam ID"
                    keyboardType="numeric"
                />
                <Pressable
                    style={styles.searchButton}
                    onPress={() => {
                        console.log("Pressed");
                        fetch_player_data();
                    }}
                >
                    <Text>Search</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
    },
    searchView: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    idInput: {
        height: 40,
        flex: 5,
        backgroundColor: "white",
        margin: 10,
        fontSize: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 2,
        borderRadius: 150,
    },
    searchButton: {
        height: 40,
        flex: 1,
        backgroundColor: "white",
        margin: 10,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 50,
    },
});
