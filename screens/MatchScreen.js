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

export default function MatchScreen() {
    const [matchId, setMatchId] = useState(null);
    const [isValid, setIsValid] = useState(false);
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
                <Text style={{ textAlign: "center" }}>
                    {JSON.stringify(matchData)}
                </Text>
            ) : (
                <Text style={styles.noMatchIdText}>Enter Match ID</Text>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        marginTop: Platform.OS !== "ios" ? 30 : 0,
    },
    searchView: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
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
});

/*
NEXT STEPS

-FIANALLY-
 
create design for match details(based on test fetch)

start with designing top portion with placeholder data
 
*/
