import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    FlatList,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import SavedPlayerCard from "../components/SavedPlayerCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
    const [steamId, setSteamId] = useState("");
    const [playerList, setPlayerList] = useState([]);

    useLayoutEffect(() => {
        const getSavedPlayers = async () => {
            try {
                // Retrieve the existing list from AsyncStorage
                const jsonValue = await AsyncStorage.getItem("@savedPlayers");
                setPlayerList(jsonValue != null ? JSON.parse(jsonValue) : []);
            } catch (error) {
                console.error("Error loading saved players : ", error);
            }
        };
        getSavedPlayers();
    }, [playerList]);

    const fetch_player_data = async () => {
        try {
            const res = await fetch(
                `https://api.opendota.com/api/players/${steamId}`
            );
            const data = await res.json();

            if (data.error) {
                console.error("Error: Please verify player ID");
                //navigation is handled here so that the navigation params object is only define after fetch.
            } else {
                navigation.navigate("Player", {
                    playerId: data.profile.account_id,
                    playerName: data.profile.personaname,
                    playerAvatar: data.profile.avatarfull,
                    playerRank: data.rank_tier,
                    playerId: steamId,
                });
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const clearSavedPlayers = async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error("Error Clearing Async storage : ", error);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.searchView}>
                <TextInput
                    style={styles.idInput}
                    onChangeText={setSteamId}
                    value={steamId}
                    placeholder="Open Dota ID"
                    keyboardType="numeric"
                />
                <Pressable
                    style={styles.searchButton}
                    onPress={() => {
                        fetch_player_data();
                    }}
                >
                    <Text>Search</Text>
                </Pressable>
            </View>
            <View>
                <Text style={styles.savedPlayerTitle}>-Saved Players-</Text>
                <FlatList
                    data={playerList}
                    renderItem={({ item }) => (
                        <SavedPlayerCard
                            playerAvatar={item.savedPlayerAvar}
                            playerName={item.savedPlayerName}
                            playerId={item.savedPlayerId}
                            clearFunction={clearSavedPlayers}
                        />
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
    },
    searchView: {
        marginTop: 10,
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
    savedPlayerTitle: {
        marginTop: 15,
        margin: 5,
        fontSize: 20,
        fontWeight: "500",
        color: "#e0e0e0",
    },
});

/*
NEXT STEPS

add a button to clear instead of each pressble having the function (next to -Saved Players-)
add a button to clear each card independetly. (fetch, parse, delete(filter !, repost item))
add restriction for cant add existing saved player (show error instead, else navigate to home)

-FIANALLY-
Start Creating search section and play returned layout for match search

*/
