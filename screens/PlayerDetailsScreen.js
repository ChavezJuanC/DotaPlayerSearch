import React, { useLayoutEffect, useState } from "react";
import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { rankTiers } from "../assets/Ranks";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PlayerDetailsScreen({ route, navigation }) {
    const { playerName, playerAvatar, playerRank, playerId } = route.params;
    const [rankImg, setRankImage] = useState(null);

    const playerRankTier = playerRank
        ? rankTiers.find((element) => element.rankTier === playerRank).rankName
        : null;

    const [matchesData, setMatchesData] = useState({});

    useLayoutEffect(() => {
        try {
            const fetchLastMatches = async () => {
                const res = await fetch(
                    `https://api.opendota.com/api/players/${playerId}/wl?significant=0`
                );
                const data = await res.json();
                setMatchesData(data);
            };

            fetchLastMatches();
        } catch (error) {
            console.error("Error fetching win/loss ratio : ", error);
        }

        setRankImage(
            playerRankTier
                ? rankTiers.find(
                      (element) => element.rankName == playerRankTier
                  ).image
                : "https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_0.png"
        );
    }, [playerName]);

    const appendToList = async (newPlayer) => {
        try {
            // Retrieve the existing list from AsyncStorage
            const jsonValue = await AsyncStorage.getItem("@savedPlayers");
            let list = jsonValue != null ? JSON.parse(jsonValue) : [];

            // Append the new object to the list
            list.push(newPlayer);

            // Store the updated list back to AsyncStorage
            const jsonString = JSON.stringify(list);
            await AsyncStorage.setItem("@savedPlayers", jsonString);
        } catch (error) {
            console.error("Error saving player");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoView}>
                <Text style={styles.playerName}>{playerName}</Text>

                <Image
                    source={{ uri: playerAvatar }}
                    style={styles.playerAvatar}
                />

                <Image source={{ uri: rankImg }} style={styles.rankImg} />

                <View style={styles.wlRatioView}>
                    <Text style={styles.winText}>W:{matchesData.win}</Text>
                    <Text style={styles.looseText}> L:{matchesData.lose}</Text>
                </View>
            </View>

            <View style={styles.buttonsView}>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("Recent Games", {
                            playerId: playerId,
                        });
                    }}
                >
                    <Text style={styles.buttonText}>Recent Games</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("Hero Stats", {
                            playerId: playerId,
                        });
                    }}
                >
                    <Text style={styles.buttonText}>Hero Stats</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate("Peers", { playerId: playerId })
                    }
                >
                    <Text style={styles.buttonText}>With Friends</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, { backgroundColor: "#22b88b" }]}
                    onPress={() => {
                        const newPlayer = {
                            savedPlayerId: playerId,
                            savedPlayerName: playerName,
                            savedPlayerAvar: playerAvatar,
                        };
                        appendToList(newPlayer);
                        navigation.navigate("Home");
                    }}
                >
                    <Text style={[styles.buttonText, { color: "white" }]}>
                        Save Player
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#121212",
    },
    infoView: {
        alignItems: "center",
        flex: 1,
        marginTop: 10,
    },
    playerAvatar: {
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#333",
        marginBottom: 20,
    },
    rankImg: {
        width: 75,
        height: 75,
        marginBottom: 20,
    },
    rankText: {
        fontSize: 18,
        fontWeight: "400",
        paddingTop: 10,
        color: "#e0e0e0",
    },
    playerName: {
        fontSize: 30,
        fontWeight: "500",
        padding: 10,
        color: "#e0e0e0",
    },
    wlRatioView: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    winText: {
        fontSize: 20,
        fontWeight: "800",
        color: "#22b88b",
    },
    looseText: {
        fontSize: 20,
        fontWeight: "800",
        color: "#d23201",
    },
    buttonsView: {
        marginBottom: 30,
    },
    button: {
        borderWidth: 0,
        paddingHorizontal: "25%",
        borderRadius: 25,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 10,
        width: "80%",
        alignSelf: "center",
        backgroundColor: "#1f1f1f",
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "400",
        color: "#e0e0e0",
    },
});


//after this toast on player save?
// or error if player exists on async memory

