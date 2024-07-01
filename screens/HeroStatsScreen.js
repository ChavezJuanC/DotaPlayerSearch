import { useLayoutEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import HeroInfo from "../assets/heroInfo";
import React from "react";

// Memoized HeroStatsCard component
const HeroStatsCard = React.memo(({ wins, losses, heroName, heroImg }) => {
    return (
        <View style={styles.heroCardView}>
            <Image source={{ uri: heroImg }} style={styles.heroImage} />
            <Text style={styles.heroName}>{heroName}</Text>
            <View style={styles.wlView}>
                <Text style={styles.wlRatio}>W:{wins}</Text>
                <Text style={styles.wlRatio}> - </Text>
                <Text style={styles.wlRatio}>L:{losses}</Text>
            </View>
        </View>
    );
});

export default function HeroStatsScreen({ route }) {
    const { playerId } = route.params;
    const [heroStats, setHeroStats] = useState([]);

    useLayoutEffect(() => {
        try {
            const fetchHeroStats = async () => {
                const res = await fetch(
                    `https://api.opendota.com/api/players/${playerId}/heroes?significant=0`
                );
                const data = await res.json();
                setHeroStats(data);
            };
            fetchHeroStats();
        } catch (error) {
            console.error("Error fetching hero stats info : ", error);
        }
    }, [playerId]);

    // Memoized renderItem function
    const renderItem = useCallback(({ item }) => {
        const heroInfo = HeroInfo.find(
            (element) => element.heroId === item.hero_id
        );
        return (
            <HeroStatsCard
                wins={item.win}
                losses={item.games - item.win}
                heroName={heroInfo.heroName}
                heroImg={heroInfo.heroImg}
            />
        );
    }, []);

    return (
        <View style={styles.mainView}>
            <FlatList
                data={heroStats}
                keyExtractor={(item) => item.hero_id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        padding: 10,
        backgroundColor: "#121212",
    },
    heroCardView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        marginVertical: 10,
        backgroundColor: "#1f1f1f",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    wlView: {
        flexDirection: "row",
        alignItems: "center",
    },
    heroImage: {
        width: 80,
        height: 80,
        marginRight: 15,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: "#333",
    },
    heroName: {
        fontSize: 18,
        fontWeight: "500",
        color: "#e0e0e0",
    },
    wlRatio: {
        fontSize: 16,
        fontWeight: "400",
        color: "#b0b0b0",
    },
});
