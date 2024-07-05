import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export default function TeamPlayerCard({
    heroImg,
    playerName,
    kills,
    deaths,
    assists,
    playerId,
}) {
    const navigation = useNavigation();

    const showToast = () => {
        Toast.show({
            type: "error",
            text1: "Private Profile",
            position: "bottom",
            visibilityTime: 1300,
        });
    };

    return (
        <Pressable
            style={styles.cardView}
            onPress={() => {
                //if playerId isnt null else hot toast
                const fetchPlayerRank = async () => {
                    try {
                        const res = await fetch(
                            `https://api.opendota.com/api/players/${playerId}`
                        );
                        const data = await res.json();
                        navigation.navigate("Player", {
                            playerId: playerId,
                            playerName: data.profile.personaname,
                            playerAvatar: data.profile.avatarfull,
                            playerRank: data.rank_tier,
                        });
                    } catch (error) {
                        console.error("Error fetching player rank : ", error);
                    }
                };

                playerId ? fetchPlayerRank() : showToast();
            }}
        >
            <Image source={{ uri: heroImg }} style={styles.heroImg} />
            <Text style={styles.playerName}>{playerName}</Text>
            <View style={styles.kdaView}>
                <Text style={styles.kdaText}>
                    K:{kills}/D:{deaths}/A:{assists}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardView: {
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 10,
        width: "90%",
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#1f1f1f",
        borderColor: "#333",
    },
    heroImg: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
    },
    playerName: {
        fontSize: 20,
        fontWeight: "500",
        color: "#e0e0e0",
        flex: 1,
    },
    kdaView: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },
    kdaText: {
        fontSize: 16,
        fontWeight: "400",
        color: "#e0e0e0",
        textAlign: "right",
    },
});

//after this toast on player save?
// or error if player exists on async memory
