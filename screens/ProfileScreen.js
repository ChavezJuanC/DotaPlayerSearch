import React, { useState, useLayoutEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import PersonalProfile from "../components/PersonalProfile";
import IdResgistration from "../components/IdResgistration";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
    const [playerId, setPlayerId] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);

    //on page load useEffect to check for existing data with async storage

    useLayoutEffect(() => {
        const checkPreviousId = async () => {
            try {
                const value = await AsyncStorage.getItem("profileId");
                if (value !== null) {
                    // value previously stored
                    setPlayerId(value);
                    setIsRegistered(true);
                    return value;
                } else return null;
            } catch (e) {
                // error reading value
                console.error("Error Reading ID : " + e);
            }
        };

        checkPreviousId();
    }, []);

    //create store and clear fucntions
    const storeProfileId = async (value) => {
        try {
            await AsyncStorage.setItem("profileId", value);
            setPlayerId(value);
            setIsRegistered(true);
        } catch (e) {
            // saving error
            console.error("Error Writting ID : " + e);
        }
    };

    const clearAll = async () => {
        try {
            await AsyncStorage.removeItem("profileId");
            setPlayerId(null);
            setIsRegistered(false);
        } catch (e) {
            // clear error
            console.error("Error Clearing Async storage : " + e);
        }
    };

    return (
        <View style={styles.mainContainer}>
            {isRegistered ? (
                <>
                    <PersonalProfile playerId={playerId} clearAll={clearAll} />
                </>
            ) : (
                <IdResgistration
                    playerId={playerId}
                    setPlayerId={setPlayerId}
                    storeProfileId={storeProfileId}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#121212",
        justifyContent: "center",
        alignItems: "center",
    },
});
