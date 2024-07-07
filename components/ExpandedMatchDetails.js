import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ExpandedMatchDetails({
    playerLevel,
    playerGold,
    damageDealt,
    lastHits,
    playerDenies,
    towerDamage,
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.level}>{playerLevel}</Text>
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Gold:</Text>
                    <Text style={styles.value}>{playerGold}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Last hits:</Text>
                    <Text style={styles.value}>{lastHits}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Denies:</Text>
                    <Text style={styles.value}>{playerDenies}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Player DMG:</Text>
                    <Text style={styles.value}>{damageDealt}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Tower DMG:</Text>
                    <Text style={styles.value}>{towerDamage}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 8,
    },
    level: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        color: "#FFA500", // Gold color for level to stand out
        marginBottom: 16,
        borderWidth: 2,
        borderRadius: 30,
        borderColor: "#f5f5f5",
        width: 60,
        height: 60,
        alignSelf: "center",
        textAlignVertical: "center",
    },
    detailsContainer: {
        paddingHorizontal: 8,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
    },
    label: {
        fontSize: 16,
        color: "#fff",
    },
    value: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
});
