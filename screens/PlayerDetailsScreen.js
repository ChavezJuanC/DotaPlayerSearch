import { View, Image, StyleSheet, Text } from "react-native";
import { rankTiers } from "../assets/Ranks";

export default function PlayerDetailsScreen({ route }) {
    const { playerId, playerName, playerAvatar, playerRank } = route.params;

    return (
        <View>
            <View style={styles.infoView}>
                <Image
                    source={{ uri: playerAvatar }}
                    style={styles.playerAvatar}
                />
                <Text style={styles.rankText}>
                    {playerRank
                        ? rankTiers.find(
                              (element) => element.rankTier === playerRank
                          ).rankName
                        : "Not Avail"}
                </Text>
                <Text style={styles.playerName}>{playerName}</Text>
                <View style={styles.wlRatioView}>
                    <Text style={styles.medText}>Last 10 Games: </Text>
                    <Text style={styles.looseText}>{5}</Text>
                    <Text style={{ color: "black" }}>-</Text>

                    <Text style={styles.winText}>{5}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoView: {
        marginTop: 50,
        alignItems: "center",
    },
    playerAvatar: {
        height: 200,
        width: 200,
        borderRadius: 100,
    },
    rankText:{
        fontSize: 18,
        fontWeight: " 400",
        paddingTop: 10,
    },
    playerName: {
        fontSize: 35,
        fontWeight: " 600",
        padding: 10,
    },
    medText: {
        fontSize: 17,
        fontWeight: "400",
    },
    wlRatioView: {
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderRadius: 10,
    },
    winText: {
        fontSize: 17,
        fontWeight: "400",
        color: "green",
        paddingHorizontal: 5,
    },
    looseText: {
        fontSize: 17,
        fontWeight: "600",
        color: "red",
        paddingHorizontal: 5,
    },
    scoreText: {
        fontSize: 17,
        fontWeight: "600",
    },
});

//1029733554
//106210714
//73149933
