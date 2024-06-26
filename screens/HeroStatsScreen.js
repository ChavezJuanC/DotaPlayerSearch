import { useLayoutEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaViewComponent,
    FlatList,
} from "react-native";

const HeroStatsCard = ({ wins, losses, heroId }) => {
    return (
        <View style={styles.heroCardView}>
            <Text>{heroId}</Text>
            <View style={styles.wlView}>
                <Text>W:{wins}</Text>
                <Text> - </Text>
                <Text>L:{losses}</Text>
            </View>
        </View>
    );
};

export default function HeroStatsScreen({ route }) {
    const { playerId } = route.params;
    const [heroStats, setHeroStats] = useState([]);

    useLayoutEffect(() => {
        const fetchHeroStats = async () => {
            const res = await fetch(
                `https://api.opendota.com/api/players/${playerId}/heroes`
            );
            const data = await res.json();
            setHeroStats(data);
        };
        fetchHeroStats();
    }, []);

    return (
        <View style={styles.mainView}>
            <FlatList
                data={heroStats}
                renderItem={({ item }) => (
                    <HeroStatsCard
                        wins={item.win}
                        losses={item.games - item.win}
                        heroId={item.hero_id}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 20,
    },
    heroCardView: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 2,
        borderRadius: 15,
        height: 100,
        width: "100%",
    },
    wlView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
