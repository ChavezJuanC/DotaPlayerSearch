import { View, Text, Image, StyleSheet } from "react-native";

export default function PlayerDetailsScreen({ route }) {
    const { playerId, playerName, playerAvatar } = route.params;

    return (
        <View>
            <View style={styles.infoView}>
                <Text>
                    Player Details, id:{playerId} name:{playerName} pfp:
                    {playerAvatar}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});

//1029733554
//106210714
//73149933
