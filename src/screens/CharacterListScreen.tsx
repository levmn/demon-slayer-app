import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Character, getCharacters } from "../services/charactersService";

export default function CharacterListScreen() {
    const navigation = useNavigation<any>();

    const {
        data: characters,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["characters"],
        queryFn: getCharacters,
        select: (data) =>
            data.sort((a: Character, b: Character) => a.name.localeCompare(b.name)),
    });

    if (isLoading) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color="#d32f2f" />
                        <Text style={styles.loadingText}>Carregando personagens...</Text>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    if (isError || !characters) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <View style={styles.center}>
                        <Text style={styles.errorText}>Erro ao carregar personagens!</Text>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Image source={require("../../assets/logo.png")} style={styles.logo} />

                <Text style={styles.subtitle}>Escolha seu personagem abaixo</Text>

                <FlatList
                    data={characters}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.card}
                            onPress={() =>
                                navigation.navigate("CharacterDetailScreen", { id: item.id })
                            }
                        >
                            <Image source={{ uri: item.img }} style={styles.image} />
                            <Text style={styles.name}>{item.name}</Text>
                        </Pressable>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    style={styles.list}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
        alignItems: "center",
    },
    logo: {
        width: 160,
        height: 120,
        resizeMode: "contain",
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "400",
        marginBottom: 24,
        color: "#333",
    },
    list: {
        flex: 1,
        width: "100%",
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: "contain",
        marginRight: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
        flex: 1,
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