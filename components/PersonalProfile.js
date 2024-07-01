import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { rankTiers } from "../assets/Ranks";

export default function PersonalProfile({ playerId, clearAll }) {
    const [profileData, setProfileData] = useState({});
    const [rankImg, setRankImg] = useState(
        "https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_0.png"
    );
    const [isValidId, setIsValidId] = useState(false);
    const [matchesData, setMatchesData] = useState({});

    const navigation = useNavigation();

    useLayoutEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(
                    `https://api.opendota.com/api/players/${playerId}`
                );
                const data = await res.json();
                if (data.error) {
                    setIsValidId(false);
                } else {
                    setProfileData(data);
                    setIsValidId(true);

                    if (data.rank_tier !== null) {
                        setRankImg(
                            rankTiers.find(
                                (element) => element.rankTier === data.rank_tier
                            ).image
                        );
                    }
                }
            } catch (error) {
                console.error("Error fetching player info : ", error);
            }
        };

        const fetchLastMatches = async () => {
            try {
                const res = await fetch(
                    `https://api.opendota.com/api/players/${playerId}/wl?significant=0`
                );
                const data = await res.json();
                setMatchesData(data);
            } catch (error) {
                console.error("Error fetching win/loss ratio : ", error);
            }
        };

        fetchProfile();
        fetchLastMatches();
    }, [playerId]);

    return (
        <View style={styles.container}>
            {isValidId ? (
                <>
                    <View style={styles.infoView}>
                        <Text style={styles.playerName}>
                            {profileData.profile.personaname}
                        </Text>
                        <Image
                            source={{ uri: profileData.profile.avatarfull }}
                            style={styles.avatar}
                        />
                        <Image
                            source={{ uri: rankImg }}
                            style={styles.rankImg}
                        />
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.wRatio}>
                                W: {matchesData.win}{" "}
                            </Text>
                            <Text style={styles.lRatio}>
                                L : {matchesData.lose}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonsView}>
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                navigation.navigate("Recent Games", {
                                    playerId: playerId,
                                });
                            }}
                        >
                            <Text style={styles.buttonText}>Hero Stats</Text>
                        </Pressable>
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                navigation.navigate("Recent Games", {
                                    playerId: playerId,
                                });
                            }}
                        >
                            <Text style={styles.buttonText}>Recent Games</Text>
                        </Pressable>
                        <Pressable
                            style={styles.button}
                            onPress={() =>
                                navigation.navigate("Peers", {
                                    playerId: playerId,
                                })
                            }
                        >
                            <Text style={styles.buttonText}>
                                W-L With Friends
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.button,
                                { backgroundColor: "#d23201" },
                            ]}
                            onPress={() => clearAll()}
                        >
                            <Text
                                style={[styles.buttonText, { color: "white" }]}
                            >
                                Switch Profile
                            </Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <View style={styles.invalidIdContainer}>
                    <Text style={styles.loadingText}>Searching...</Text>
                    <Pressable
                        style={[styles.button, { backgroundColor: "#22b88b" }]}
                        onPress={() => clearAll()}
                    >
                        <Text style={[styles.buttonText, { color: "#e0e0e0" }]}>
                            Back
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#121212",
        width: "100%",
    },
    infoView: {
        alignItems: "center",
        marginVertical: 20,
    },
    playerName: {
        fontSize: 30,
        fontWeight: "500",
        padding: 10,
        color: "#e0e0e0",
    },
    avatar: {
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#333",
        marginBottom: 20,
    },
    rankImg: {
        width: 75,
        height: 75,
        marginBottom: 20,
    },
    wRatio: {
        fontSize: 20,
        fontWeight: "800",
        color: "#22b88b",
        marginBottom: 20,
        padding: 5,
    },
    lRatio: {
        fontSize: 20,
        fontWeight: "800",
        color: "#d23201",
        marginBottom: 20,
        padding: 5,
    },

    buttonsView: {
        marginBottom: 10,
        marginTop: 60,
        alignItems: "center",
    },
    button: {
        width: "80%",
        borderWidth: 0,
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: "#1f1f1f",
        elevation: 5,
        paddingHorizontal: "25%",
        paddingVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "400",
        color: "#e0e0e0",
    },
    invalidIdContainer: {
        alignItems: "center",
    },
    loadingText: {
        fontSize: 20,
        color: "white",
        margin: 20,
    },
});

/*
NEXT STEPS

Come up with plan to save users in the main screen using async storage??

onPress Save Player.... save an object to async  storage, This object should iclude. 
savedPlayerId: player_id
savedPlayerName: personaname
savedPlayerAvar: avatarfull

**This could be an array of objects, just read or and rewritte on change or find a way to append to arr**

now that this info is being saved...
with a useLayoutEffect hook in the homescreen... create an array of obs..  savedPlayersInfo
use this array to render flat list of savedPlayerCard comps (pressables that navigate with a preset playerId)

-FIANALLY-
Start Creating search section and play returned layout for match search

*/
