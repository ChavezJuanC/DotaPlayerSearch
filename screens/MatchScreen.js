import { useState, useLayoutEffect } from "react";
import {
    View,
    Text,
    Pressable,
    TextInput,
    StyleSheet,
    SafeAreaView,
    Platform,
    FlatList,
} from "react-native";
import TeamPlayerCard from "../components/TeamPlayerCard";
import heroInfo from "../assets/heroInfo";
import Toast from "react-native-toast-message";

export default function MatchScreen({ route }) {
    const [matchId, setMatchId] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [direData, setDireData] = useState([]);
    const [radiantData, setRadiantData] = useState([]);
    const [matchData, setMatchData] = useState({});
    const matchNavId = route.params?.matchNavId;

    // if navigated to fetchMatchData and display.
    useLayoutEffect(() => {
        if (matchNavId) {
            setMatchId(matchNavId);
            fetchMatchData(matchNavId);
        }
    }, [matchNavId]);

    const fetchMatchData = async (matchId) => {
        const res = await fetch(
            `https://api.opendota.com/api/matches/${matchId}`
        );
        const data = await res.json();
        if (data.error) {
            console.error("Invalid Match Id : ", matchId);
        } else {
            setIsValid(true);
            setRadiantData(
                data.players.filter((item) => item.player_slot < 128)
            );
            setDireData(data.players.filter((item) => item.player_slot >= 128));
            setMatchData(data);
        }
    };

    const setTimeFormat = (rawTime) => {
        const minutes = Math.floor(rawTime / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (rawTime % 60).toString().padStart(2, "0");

        return `${minutes}:${seconds}`;
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.searchView}>
                <TextInput
                    style={styles.idInput}
                    onChangeText={setMatchId}
                    value={matchId}
                    placeholder="Match ID"
                    keyboardType="numeric"
                    placeholderTextColor="#7d7d7d"
                />
                <Pressable
                    style={styles.searchButton}
                    onPress={() => {
                        fetchMatchData(matchId);
                    }}
                >
                    <Text style={styles.searchButtonText}>Find</Text>
                </Pressable>
            </View>
            {isValid ? (
                <FlatList
                    data={radiantData}
                    ListHeaderComponent={
                        <>
                            <View style={styles.baseMatchDetailsView}>
                                <Text
                                    style={[
                                        styles.victoryText,
                                        {
                                            color: matchData.radiant_win
                                                ? "#22b88b"
                                                : "#d23201",
                                        },
                                    ]}
                                >
                                    {matchData.radiant_win ? "Radiant" : "Dire"}{" "}
                                    Victory
                                </Text>
                                <Text style={styles.killsText}>
                                    <Text style={{ color: "#d23201" }}>
                                        {matchData.radiant_score}{" "}
                                    </Text>
                                    -
                                    <Text style={{ color: "#22b88b" }}>
                                        {" "}
                                        {matchData.dire_score}
                                    </Text>
                                </Text>
                                <Text style={styles.timerText}>
                                    {setTimeFormat(matchData.duration)}
                                </Text>
                            </View>
                            <View style={styles.teamView}>
                                <Text
                                    style={[
                                        styles.teamText,
                                        { color: "#22b88b" },
                                    ]}
                                >
                                    Radiant
                                </Text>
                            </View>
                        </>
                    }
                    renderItem={({ item }) => {
                        const heroData = heroInfo.find(
                            (element) => element.heroId === item.hero_id
                        );
                        return (
                            ////IF PLAYER DAMAGE IS AVAIL CALC AND DISPLAY???
                            <TeamPlayerCard
                                heroImg={heroData.heroImg}
                                playerName={item.personaname || "Anonymous"}
                                kills={item.kills}
                                deaths={item.deaths}
                                assists={item.assists}
                                playerId={item.account_id}
                                playerGold={item.net_worth}
                                playerLevel={item.level}
                                lastHits={item.last_hits}
                                playerDenies={item.denies}
                                dealtDamage={item.hero_damage}
                                towerDamage={item.tower_damage}
                            />
                        );
                    }}
                    ListFooterComponent={
                        <>
                            <View style={styles.teamView}>
                                <Text
                                    style={[
                                        styles.teamText,
                                        { color: "#d23201" },
                                    ]}
                                >
                                    Dire
                                </Text>
                            </View>
                            <FlatList
                                data={direData}
                                renderItem={({ item }) => {
                                    const heroData = heroInfo.find(
                                        (element) =>
                                            element.heroId === item.hero_id
                                    );
                                    ////IF PLAYER DAMAGE IS AVAIL CALC AND DISPLAY???
                                    return (
                                        <TeamPlayerCard
                                            heroImg={heroData.heroImg}
                                            playerName={
                                                item.personaname || "Anonymous"
                                            }
                                            kills={item.kills}
                                            deaths={item.deaths}
                                            assists={item.assists}
                                            playerId={item.account_id || null}
                                            playerGold={item.net_worth}
                                            playerLevel={item.level}
                                            lastHits={item.last_hits}
                                            playerDenies={item.denies}
                                            dealtDamage={item.hero_damage}
                                            towerDamage={item.tower_damage}
                                        />
                                    );
                                }}
                            />
                        </>
                    }
                />
            ) : (
                <Text style={styles.noMatchIdText}>Enter Match ID</Text>
            )}
            <Toast />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#121212",
        paddingTop: Platform.OS !== "ios" ? 40 : 0,
    },
    searchView: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
    },
    idInput: {
        height: 40,
        flex: 5,
        backgroundColor: "white",
        margin: 10,
        fontSize: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 2,
        borderRadius: 150,
    },
    searchButton: {
        height: 40,
        flex: 1,
        backgroundColor: "white",
        margin: 10,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 50,
    },
    searchButtonText: {
        fontWeight: "600",
    },
    noMatchIdText: {
        alignSelf: "center",
        marginTop: "50%",
        fontSize: 18,
        fontWeight: "600",
        color: "#7d7d7d",
    },
    baseMatchDetailsView: {
        alignItems: "center",
        paddingTop: "3%",
        marginBottom: 20,
    },
    victoryText: {
        fontSize: 33,
        fontWeight: "600",
        color: "#e0e0e0",
        padding: 10,
    },
    killsText: {
        fontSize: 25,
        fontWeight: "500",
        color: "#e0e0e0",
    },
    timerText: {
        fontSize: 15,
        fontWeight: "400",
        color: "#e0e0e0",
        padding: 5,
    },
    teamView: {
        alignItems: "flex-end",
        marginBottom: 10,
        marginRight: 20,
    },
    teamText: {
        fontSize: 25,
        padding: 5,
        color: "#e0e0e0",
        fontWeight: "500",
    },
});
