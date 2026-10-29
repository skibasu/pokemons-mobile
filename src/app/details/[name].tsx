import { useQuery } from "@tanstack/react-query"
import { Stack, useLocalSearchParams } from "expo-router"
import { Image, Text, View } from "react-native"
import { fetchPokemonByName } from "../../features/Pokemons/services/pokemonFetchByName"
import { styles } from "./styles"

const DetailsScreen = () => {
    const { name } = useLocalSearchParams()
    const pokemonName = Array.isArray(name) ? name[0] : name
    const title = pokemonName ? pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) : "Pokemon"

    const {
        data: details,
        isLoading: loading,
        isError: error,
    } = useQuery({
        queryKey: ["pokemon", pokemonName],
        queryFn: () => (pokemonName ? fetchPokemonByName(pokemonName) : Promise.reject(new Error("No pokemon name provided"))),
        enabled: Boolean(pokemonName),
    })

    if (loading) {
        return (
            <>
                <Stack.Screen options={{ title }} />
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            </>
        )
    }
    if (error) {
        return (
            <>
                <Stack.Screen options={{ title }} />
                <View style={styles.container}>
                    <Text>Something went wrong</Text>
                </View>
            </>
        )
    }
    return (
        <>
            <Stack.Screen options={{ title }} />
            <View style={styles.container}>
                <Text>{title}</Text>
                {details?.imageSrc && <Image source={{ uri: details?.imageSrc }} style={{ width: "100%", aspectRatio: 1 }} resizeMode="contain" />}
            </View>
        </>
    )
}

export default DetailsScreen
