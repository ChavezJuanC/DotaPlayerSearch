import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useLayoutEffect, useState } from "react";
import heroInfo from "../assets/heroInfo";

const RecentGameCard = ({ heroImg, heroName, kills, deaths, assists }) => {
    return (
        <View style={styles.cardContainer}>
            <Image source={{ uri: heroImg }} style={styles.heroImg} />
            <View style={styles.textContainer}>
                <Text style={styles.heroName}>{heroName}</Text>
            </View>
            <View style={styles.kdaContainer}>
                <Text style={[styles.kdaText, styles.killsText]}>
                    K: {kills}
                </Text>
                <Text style={styles.kdaText}> / </Text>
                <Text style={[styles.kdaText, styles.deathsText]}>
                    D: {deaths}
                </Text>
                <Text style={styles.kdaText}> / </Text>
                <Text style={[styles.kdaText, styles.assistsText]}>
                    A: {assists}
                </Text>
            </View>
        </View>
    );
};

export default function RecentGamesScreen({ route }) {
    const { playerId } = route.params;
    const [recentMatchData, setRecentMatchData] = useState([]);

    useLayoutEffect(() => {
        const fetchRecentGames = async () => {
            const res = await fetch(
                `https://api.opendota.com/api/players/${playerId}/matches?limit=20&significant=0`
            );
            const data = await res.json();
            setRecentMatchData(data);
            console.log(data); //DEBUG
        };

        fetchRecentGames();
    }, [playerId]);

    return (
        <View style={styles.container}>
            <FlatList
                data={recentMatchData}
                keyExtractor={(item) => item.match_id.toString()}
                renderItem={({ item }) => {
                    const heroData = heroInfo.find(
                        (element) => element.heroId === item.hero_id
                    );

                    return (
                        <RecentGameCard
                            heroImg={heroData.heroImg}
                            heroName={heroData.heroName}
                            kills={item.kills}
                            deaths={item.deaths}
                            assists={item.assists}
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
        position: "relative",
    },
    textContainer: {
        marginLeft: 15,
        flex: 1,
    },
    heroImg: {
        height: 75,
        width: 75,
        borderRadius: 37.5,
    },
    heroName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#e0e0e0",
    },
    kdaContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 10,
        right: 10,
    },
    kdaText: {
        fontSize: 16,
        fontWeight: "400",
        color: "#b0b0b0",
    },
    killsText: {
        color: "#22b88b",
    },
    deathsText: {
        color: "#d23201",
    },
    assistsText: {
        color: "#2176FF",
    },
});

/* 
Add error handling to the fetching.. check all other fetches for error handling as well.
add win or l and display by borderIndicator

*/
