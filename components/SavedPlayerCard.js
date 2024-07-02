import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export default function SavedPlayerCard({
    playerAvatar,
    playerName,
    playerId,
}) {
    return (
        <Pressable
            onPress={() => {
                console.log("Removing player");
            }}
        >
            <View style={styles.cardView}>
                <Image
                    source={{ uri: playerAvatar }}
                    style={styles.playerImg}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.playerName}>{playerName}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardView: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1f1f1f",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        elevation: 3,
        marginVertical: 10,
        width: "95%",
        alignSelf: "center",
    },
    playerImg: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    playerName: {
        fontSize: 18,
        fontWeight: "500",
        color: "#e0e0e0",
    },
});
