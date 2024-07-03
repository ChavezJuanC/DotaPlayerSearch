import { useState } from "react";
import {
    View,
    Text,
    Pressable,
    TextInput,
    StyleSheet,
    SafeAreaView,
    Platform,
} from "react-native";
import TeamPlayerCard from "../components/TeamPlayerCard";

export default function MatchScreen() {
    const [matchId, setMatchId] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [matchData, setMatchData] = useState({});

    const fetchMatchData = async () => {
        const res = await fetch(
            `https://api.opendota.com/api/matches/${matchId}`
        );
        const data = await res.json();
        if (data.error) {
            console.error("Invalid Match Id");
        } else {
            setIsValid(true);
            setMatchData(data);
            console.log(data);
        }
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
                        fetchMatchData();
                    }}
                >
                    <Text style={styles.searchButtonText}>Find</Text>
                </Pressable>
            </View>
            {isValid ? (
                <>
                    <View style={styles.baseMatchDetailsView}>
                        <Text style={styles.victoryText}>
                            {"Radiant"} Victory
                        </Text>
                        <Text style={styles.killsText}>
                            {15}-{15}
                        </Text>
                        <Text style={styles.timerText}>{"00:00"}</Text>
                    </View>

                    <View style={styles.teamView}>
                        <Text style={[styles.teamText, { color: "#22b88b" }]}>
                            Radiant
                        </Text>
                    </View>
                    <TeamPlayerCard
                        heroImg={"https://picsum.photos/200"}
                        heroName={"HeroName"}
                        kills={10}
                        deaths={10}
                        assists={10}
                    />
                    <View style={styles.teamView}>
                        <Text style={[styles.teamText, { color: "#d23201" }]}>
                            Dire
                        </Text>
                    </View>
                </>
            ) : (
                <Text style={styles.noMatchIdText}>Enter Match ID</Text>
            )}
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
        fontSize: 20,
        fontWeight: "400",
        color: "#e0e0e0",
        padding: 3,
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
    },
});

/*
NEXT STEPS

-FIANALLY-
 
create design for match details(based on test fetch)

start with designing top portion with placeholder data
 
*/
