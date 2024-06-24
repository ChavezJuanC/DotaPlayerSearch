import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";

export default function HomeScreen({ navigation }) {
    const [steamId, setSteamId] = useState("");

    return (
        <View style={styles.mainContainer}>
            <View style={styles.searchView}>
                <TextInput
                    style={styles.idInput}
                    onChangeText={setSteamId}
                    value={steamId}
                    placeholder="Steam ID"
                    keyboardType="numeric"
                />
                <Pressable
                    style={styles.searchButton}
                    onPress={() => {
                        console.log("Pressed");
                    }}
                >
                    <Text>Search</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
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
});
