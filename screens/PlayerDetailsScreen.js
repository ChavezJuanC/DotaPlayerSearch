import React, { useLayoutEffect, useState } from "react";
import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { rankTiers } from "../assets/Ranks";

export default function PlayerDetailsScreen({ route }) {
    const { playerName, playerAvatar, playerRank, playerId } = route.params;
    //The rank will only be set IF a rank is detected else use this placeholder img for no rank
    const [rankImg, setRankImage] = useState(
        "https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_0.png"
    );

    const playerRankTier = playerRank
        ? rankTiers.find((element) => element.rankTier === playerRank).rankName
        : null;

    const [matchesData, setMatchesData] = useState({ win: "-", lose: "-" });

    useLayoutEffect(() => {
        const fetchLastMatches = async () => {
            const res = await fetch(
                `https://api.opendota.com/api/players/${playerId}/wl?significant=0&limit=10`
            );
            const data = await res.json();
            setMatchesData(data);
            console.log(data); //DEBUG
        };

        fetchLastMatches();

        if (playerRankTier !== null) {
            setRankImage(
                rankTiers.find((element) => element.rankName === playerRankTier)
                    .image
            );
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.infoView}>
                <Text style={styles.playerName}>{playerName}</Text>

                <Image
                    source={{ uri: playerAvatar }}
                    style={styles.playerAvatar}
                />

                <Image source={{ uri: rankImg }} style={styles.rankImg} />

                <View style={[styles.wlRatioView]}>
                    <Text style={styles.looseText}>W:{matchesData.win} </Text>
                    <Text style={styles.winText}> L:{matchesData.lose}</Text>
                </View>
            </View>

            <View style={styles.buttonsView}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Recent Games</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Hero Stats</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>More Stats</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, { backgroundColor: "#22b88b" }]}
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
        borderColor: "black",
        marginBottom: 20,
    },
    rankImg: {
        width: 75,
        height: 75,
    },
    rankText: {
        fontSize: 18,
        fontWeight: "400",
        paddingTop: 10,
    },
    playerName: {
        fontSize: 30,
        fontWeight: "500",
        padding: 10,
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
        borderWidth: 2,
        paddingHorizontal: "25%",
        borderRadius: 100,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 10,
        width: "80%",
        alignSelf: "center",
        backgroundColor: "lightblue",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "400",
        color: "black",
    },
});

//1029733554
//106210714
//73149933
//168199092
//119220558
