import { useQuery } from "@tanstack/react-query"
import { Stack, useLocalSearchParams } from "expo-router"
import { Image, Text, View } from "react-native"
import { fetchPokemonByName } from "../../features/Pokemons/services/pokemonFetchByName"

const DetailsScreen = () => {
    const { name } = useLocalSearchParams()

    const { data: details, isLoading: loading, isError: error } = useQuery({ queryKey: ["pokemons", name], queryFn: async () => fetchPokemonByName(name as string) })

    return (
        <Stack.Screen options={{ title: (typeof name === "string" ? name.charAt(0).toUpperCase() + name.slice(1) : undefined) ?? "Pokemon Details" }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                <Text>{typeof name === "string" ? name.charAt(0).toUpperCase() + name.slice(1) : "Pokemon Detail"}</Text>
                <Image source={{ uri: details?.imageSrc }} style={{ width: "100%", aspectRatio: 1 }} resizeMode="contain" />
            </View>
        </Stack.Screen>
    )
}

export default DetailsScreen
