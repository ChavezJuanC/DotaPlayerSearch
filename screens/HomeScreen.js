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
    const [openDotaId, setopenDotaId] = useState("");
    const [playerList, setPlayerList] = useState([]);

    useLayoutEffect(() => {
        const getSavedPlayers = async () => {
            try {
                // Retrieve the existing list from AsyncStorage
                const jsonValue = await AsyncStorage.getItem("@savedPlayers");
                setPlayerList(
                    (jsonValue != null ? JSON.parse(jsonValue) : []).reverse()
                );
            } catch (error) {
                console.error("Error loading saved players : ", error);
            }
        };
        getSavedPlayers();
    }, [playerList]);

    const fetch_player_data = async () => {
        try {
            const res = await fetch(
                `https://api.opendota.com/api/players/${openDotaId}`
            );
            const data = await res.json();

            if (data.error) {
                console.error("Error: Please verify player ID");
                //navigation is handled here so that the navigation params object is only defined after fetch.
            } else {
                navigation.navigate("Player", {
                    playerId: data.profile.account_id,
                    playerName: data.profile.personaname,
                    playerAvatar: data.profile.avatarfull,
                    playerRank: data.rank_tier,
                    playerId: openDotaId,
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
                    onChangeText={setopenDotaId}
                    value={openDotaId}
                    placeholder="Open Dota ID"
                    keyboardType="numeric"
                />
                <Pressable
                    style={styles.searchButton}
                    onPress={() => {
                        fetch_player_data();
                    }}
                >
                    <Text style={styles.searchButtonText}>Search</Text>
                </Pressable>
            </View>
            <FlatList
                data={playerList} //reverse to show the latest saves on the top
                renderItem={({ item }) => (
                    <SavedPlayerCard
                        playerAvatar={item.savedPlayerAvar}
                        playerName={item.savedPlayerName}
                        playerId={item.savedPlayerId}
                    />
                )}
            />
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
    searchButtonText: {
        fontWeight: "600",
    },
    savedPlayerTitle: {
        margin: 5,
        fontSize: 20,
        fontWeight: "500",
        color: "#f5f5f5",
        paddingHorizontal: 10,
    },
    clearSavedPlayers: {
        backgroundColor: "#f5f5f5",
        width: 50,
        height: 20,
        borderRadius: 30,
        marginHorizontal: 20,
    },
    clearButtonText: {
        alignSelf: "center",
        fontWeight: "400",
    },
});
