import { useQuery } from "@tanstack/react-query"
import { ScrollView, Text, View } from "react-native"
import PokemonCart from "../PokemonCart/PokemonCart"
import { fetchPokemons } from "../services/pokemonsFetch"
import { styles } from "../styles/globalStyles"

const PokemonsList = ({ url }: { url: string }) => {
    const { data: pokemons, isLoading: loading, isError: error } = useQuery({ queryKey: ["pokemons", url], queryFn: async () => fetchPokemons(url) })

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading ... </Text>
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error fetching pokemons</Text>
            </View>
        )
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {pokemons?.map((pokemon) => (
                <PokemonCart key={pokemon.name} pokemon={pokemon} />
            ))}
        </ScrollView>
    )
}

export default PokemonsList
