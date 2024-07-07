import { Image, Text, StyleSheet, Pressable, Animated } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import ExpandedMatchDetails from "./ExpandedMatchDetails";

export default function TeamPlayerCard({
    heroImg,
    playerName,
    kills,
    deaths,
    assists,
    playerId,
    playerGold,
    playerLevel,
    lastHits,
    playerDenies,
    dealtDamage,
    takenDamage,
    towerDamage,
}) {
    const navigation = useNavigation();
    const [isExpanded, setIsExpanded] = useState(false);

    const animatedHeight = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        if (isExpanded) {
            toggleExpand();
        }
        // the playerId could be the same from a different match, to avoid card rendering in
        // the expanded state, we "reset" height on any of there changes meaning it's a different match
    }, [playerId, assists, deaths, kills, playerName, heroImg]);

    const toggleExpand = () => {
        Animated.timing(animatedHeight, {
            toValue: isExpanded ? 100 : 400,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setIsExpanded(!isExpanded);
    };

    const showToast = () => {
        Toast.show({
            type: "error",
            text1: "Private Profile",
            position: "bottom",
            visibilityTime: 1300,
        });
    };

    return (
        <Animated.View style={[styles.cardView, { height: animatedHeight }]}>
            <Pressable
                style={styles.cardPressable}
                onPress={() => {
                    const fetchPlayerRank = async () => {
                        try {
                            const res = await fetch(
                                `https://api.opendota.com/api/players/${playerId}`
                            );
                            const data = await res.json();
                            navigation.navigate("Player", {
                                playerId: playerId,
                                playerName: data.profile.personaname,
                                playerAvatar: data.profile.avatarfull,
                                playerRank: data.rank_tier,
                            });
                        } catch (error) {
                            console.error(
                                "Error fetching player rank : ",
                                error
                            );
                        }
                    };

                    playerId ? fetchPlayerRank() : showToast();
                }}
            >
                <Image source={{ uri: heroImg }} style={styles.heroImg} />
                <Text style={styles.playerName}>{playerName}</Text>

                <Text style={styles.kdaText}>
                    K:{kills}/D:{deaths}/A:{assists}
                </Text>

                <Pressable
                    style={styles.arrowPressable}
                    onPress={() => {
                        toggleExpand();
                    }}
                >
                    <Icon
                        name={isExpanded ? "arrow-up" : "arrow-down"}
                        size={17}
                        color="white"
                    />
                </Pressable>
            </Pressable>

            {isExpanded && (
                <ExpandedMatchDetails
                    playerGold={playerGold}
                    damageDealt={dealtDamage}
                    lastHits={lastHits}
                    playerDenies={playerDenies}
                    towerDamage={towerDamage}
                    playerLevel={playerLevel}
                />
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    cardView: {
        height: 100,
        alignSelf: "center",
        borderWidth: 2,
        borderRadius: 10,
        width: "95%",
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#1f1f1f",
        borderColor: "#333",
    },
    cardPressable: {
        flexDirection: "row",
        alignItems: "center",
    },
    heroImg: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
    },
    playerName: {
        fontSize: 20,
        fontWeight: "500",
        color: "#e0e0e0",
        flex: 1,
    },
    kdaText: {
        fontSize: 16,
        fontWeight: "400",
        color: "#e0e0e0",
        padding: 5,
    },
    arrowPressable: {
        padding: 3,
        borderWidth: 2,
        marginLeft: 5,
        borderColor: "grey",
        borderRadius: 50,
    },
});

/*  

NEXT STEPS

create layout for macth details based on player
-test fetch a match from a browser
-choose data
-Design layout 
-code it with test data... respecting spaced for route params
-test
-feed data

(CONDSIDER that the ExpandedMatchDetails section can be a component of
its own just check {expanded? && <ExpandedMatchDetails/>})

*/
