import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SavedPlayerCard({
    playerAvatar,
    playerName,
    playerId,
}) {
    const navigation = useNavigation();

    const deleteSavedPlayer = async () => {
        try {
            const playersList = await AsyncStorage.getItem("@savedPlayers");
            let parsedPlayerList =
                playersList != null ? JSON.parse(playersList) : [];
            parsedPlayerList = parsedPlayerList.filter(
                (item) => item.savedPlayerId !== playerId
            );
            const jsonStringList = JSON.stringify(parsedPlayerList);
            await AsyncStorage.setItem("@savedPlayers", jsonStringList);
        } catch (error) {
            console.error("Error removing player from saved players : ", error);
        }
    };

    const confirmSavedPlayerDelete = () =>
        Alert.alert("Warning", "Are you sure you want to delete this player?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel",
            },
            {
                text: "OK",
                onPress: () => {
                    deleteSavedPlayer();
                },
            },
        ]);

    return (
        <Pressable
            onPress={() => {
                navigation.navigate("Player", {
                    playerId: playerId,
                    playerAvatar: playerAvatar,
                });
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
                <Pressable onPress={confirmSavedPlayerDelete}>
                    <Icon name="trash" size={25} color="#363836" />
                </Pressable>
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


