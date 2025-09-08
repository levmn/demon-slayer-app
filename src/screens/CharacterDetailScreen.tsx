import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Character, getCharacterById } from "../services/charactersService";

export default function CharacterDetailScreen() {
    const route = useRoute();
    const { id } = route.params as { id: number };

    const { data: character, isLoading, isError } = useQuery<Character>({
        queryKey: ["character", id],
        queryFn: () => getCharacterById(id),
    });

    if (isLoading) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.center}>
                    <ActivityIndicator size="large" color="#d32f2f" />
                    <Text style={styles.loadingText}>Carregando detalhes...</Text>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    if (isError || !character) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.center}>
                    <Text style={styles.errorText}>Erro ao carregar detalhes do personagem!</Text>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    const headerBg =
        character.race?.toLowerCase() === "demon"
            ? require("../../assets/background-demon.png")
            : require("../../assets/background-human.png");

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <ImageBackground source={headerBg} style={styles.headerBg}>
                        <Image source={{ uri: character.img }} style={styles.image} />
                        <LinearGradient
                            colors={["transparent", "white"]}
                            start={{ x: 0, y: 0.6 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.gradient}
                        />
                    </ImageBackground>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.name}>{character.name}</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeLabel}>Idade: </Text>
                            <Text style={styles.badgeValue}>
                                {character.age != null ? String(character.age) : "—"}
                            </Text>
                        </View>

                        <View style={styles.badge}>
                            <Text style={styles.badgeLabel}>Raça: </Text>
                            <Text style={styles.badgeValue}>{character.race}</Text>
                        </View>

                        <View style={styles.badge}>
                            <Text style={styles.badgeLabel}>Gênero: </Text>
                            <Text style={styles.badgeValue}>{character.gender}</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardText}>{character.description}</Text>
                    </View>

                    <View style={styles.quoteBox}>
                        <Text style={styles.quoteText}>{character.quote}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        height: 300,
        width: "100%"
    },
    headerBg: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    image: {
        width: 240,
        height: 240,
        flex: 1,
        resizeMode: "contain",
        marginBottom: 20,
        zIndex: 1,
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 28,
    },
    name: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 12,
        marginBottom: 20,
        color: "#000",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 20,
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "#F2F2F2",
        borderRadius: 16,
        marginHorizontal: 4,
    },
    badgeLabel: {
        fontSize: 14,
        fontWeight: "400",
        color: "#666",
    },
    badgeValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#d32f2f",
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        marginBottom: 16,
    },
    cardText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#333",
        textAlign: "justify",
    },
    quoteBox: {
        backgroundColor: "#000",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        marginTop: 8,
    },
    quoteText: {
        color: "#fff",
        fontStyle: "italic",
        fontSize: 16,
        textAlign: "center",
        lineHeight: 22,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: "#666",
    },
    errorText: {
        fontSize: 16,
        color: "#d32f2f",
        textAlign: "center",
        paddingHorizontal: 20,
    },
});