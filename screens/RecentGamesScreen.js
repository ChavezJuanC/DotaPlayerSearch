import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    Pressable,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import heroInfo from "../assets/heroInfo";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const RecentGameCard = ({
    heroImg,
    heroName,
    kills,
    deaths,
    assists,
    result,
    matchId,
}) => {
    const navigation = useNavigation();
    const showToast = () => {
        Toast.show({
            type: "success",
            text1: "Match Id Copied",
            position: "bottom",
            visibilityTime: 1300,
        });
    };

    const copyIdToClip = async () => {
        try {
            await Clipboard.setStringAsync(matchId.toString());
            showToast();
        } catch (error) {
            console.error("Error copying id : ", error);
        }
    };

    return (
        <Pressable
            style={styles.cardContainer}
            onLongPress={() => {
                copyIdToClip();
            }}
            onPress={() => {
                navigation.navigate("Find Match", { matchNavId: matchId });
            }}
        >
            <Image
                source={{ uri: heroImg }}
                style={[
                    styles.heroImg,
                    {
                        borderColor: result === 1 ? "#22b88b" : "#d23201",
                        borderWidth: 2,
                    },
                ]}
            />
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
        </Pressable>
    );
};

export default function RecentGamesScreen({ route }) {
    const { playerId } = route.params;
    const [recentMatchData, setRecentMatchData] = useState([]);

    useLayoutEffect(() => {
        try {
            const fetchRecentGames = async () => {
                const res = await fetch(
                    `https://api.opendota.com/api/players/${playerId}/matches?limit=20&significant=0`
                );
                const data = await res.json();
                setRecentMatchData(data);
            };

            fetchRecentGames();
        } catch (error) {
            console.error("Error fetching recent matches : ", error);
        }
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

                    let result = null;

                    if (item.radiant_win) {
                        result = item.player_slot < 128 ? 1 : 0;
                    } else {
                        result = item.player_slot < 128 ? 0 : 1;
                    }

                    return (
                        <RecentGameCard
                            result={result}
                            heroImg={heroData.heroImg}
                            heroName={heroData.heroName}
                            kills={item.kills}
                            deaths={item.deaths}
                            assists={item.assists}
                            matchId={item.match_id}
                        />
                    );
                }}
            />
            <Toast />
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
        color: "#e0e0e0",
        //color: "#22b88b",
    },
    deathsText: {
        color: "#e0e0e0",
        //color: "#d23201",
    },
    assistsText: {
        color: "#e0e0e0",
        //color: "#2176FF",
    },
});
