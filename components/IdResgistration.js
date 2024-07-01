import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

export default function IdResgistration({
    playerId,
    setPlayerId,
    storeProfileId,
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register ID</Text>
            <TextInput
                style={styles.idInput}
                value={playerId}
                onChangeText={setPlayerId}
                placeholder="Open Dota ID"
                placeholderTextColor="#888"
                keyboardType="numeric"
            />
            <Pressable
                style={styles.button}
                onPress={() => {
                    storeProfileId(playerId);
                }}
            >
                <Text style={styles.buttonText}>Register</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        backgroundColor: "#1f1f1f",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#e0e0e0",
        marginBottom: 20,
        textAlign: "center",
    },
    idInput: {
        width: "100%",
        height: 40,
        borderColor: "#888",
        borderWidth: 1,
        borderRadius: 5,
        color: "#e0e0e0",
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: "#1a1a1a",
    },
    button: {
        backgroundColor: "#22b88b",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
