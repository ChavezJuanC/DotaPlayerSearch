import { View, Image, Text, StyleSheet } from "react-native";

export default function TeamPlayerCard({
    heroImg,
    heroName,
    kills,
    deaths,
    assists,
}) {
    return (
        <View style={styles.cardView}>
            <Image source={{ uri: heroImg }} style={styles.heroImg} />
            <Text style={styles.heroName}>{heroName}</Text>
            <View style={styles.kdaView}>
                <Text style={styles.kdaText}>
                    K:{kills}/D:{deaths}/A:{assists}
                </Text>
            </View>
        </View>
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
    heroName: {
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
