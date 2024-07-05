import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Pressable,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const PeerCard = ({ peerAvatar, peerName, wins, losses, peerId }) => {
    const navigation = useNavigation();
    return (
        <Pressable
            style={styles.cardContainer}
            onPress={() => {
                const fetchPlayerRank = async () => {
                    try {
                        const res = await fetch(
                            `https://api.opendota.com/api/players/${peerId}`
                        );
                        const data = await res.json();
                        console.log(data);
                        navigation.navigate("Player", {
                            playerId: peerId,
                            playerAvatar: peerAvatar,
                            playerName: peerName,
                            playerRank: data.rank_tier,
                        });
                    } catch (error) {
                        console.error("Error fetching rank for peer : ", error);
                    }
                };
                fetchPlayerRank();
            }}
        >
            <Image source={{ uri: peerAvatar }} style={styles.peerAvatar} />
            <View style={styles.textContainer}>
                <Text style={styles.peerName}>{peerName}</Text>
                <View style={styles.wlContainer}>
                    <Text style={[styles.wlText, styles.winsText]}>
                        W: {wins}
                    </Text>
                    <Text style={styles.wlText}> - </Text>
                    <Text style={[styles.wlText, styles.lossesText]}>
                        L: {losses}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default function PeersScreen({ route }) {
    const { playerId } = route.params;
    const [peersData, setPeersData] = useState([]);

    useLayoutEffect(() => {
        try {
            const fetchPeers = async () => {
                const res = await fetch(
                    `https://api.opendota.com/api/players/${playerId}/peers?significant=0`
                );
                const data = await res.json();
                setPeersData(data);
            };

            fetchPeers();
        } catch (error) {
            console.error("Error fetching peers : ", error);
        }
    }, [playerId]);

    return (
        <View style={styles.container}>
            <FlatList
                data={peersData}
                keyExtractor={(item) => item.account_id.toString()}
                renderItem={({ item }) => {
                    return (
                        <PeerCard
                            peerAvatar={item.avatarfull}
                            peerName={item.personaname}
                            wins={item.win}
                            losses={item.games - item.win}
                            peerId={item.account_id}
                        />
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#121212",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#e0e0e0",
        marginBottom: 20,
        textAlign: "center",
    },
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1f1f1f",
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    peerAvatar: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    textContainer: {
        marginLeft: 15,
        flex: 1,
    },
    peerName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#e0e0e0",
    },
    wlContainer: {
        flexDirection: "row",
        marginTop: 5,
    },
    wlText: {
        fontSize: 16,
        fontWeight: "400",
    },
    winsText: {
        color: "#22b88b",
    },
    lossesText: {
        color: "#d23201",
    },
});
