import { Image, StyleSheet, Text, View } from "react-native";
import { Character } from "../services/charactersService";

export interface CharacterRowProps {
    character: Character;
}

const CharacterRow = ({ character }: CharacterRowProps) => {
    return (
        <View style={styles.row}>
            <Image source={{ uri: character.img }} style={styles.image} />
            <Text style={styles.name}>{character.name}</Text>
        </View>
    );
};

export default CharacterRow;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
    },
});