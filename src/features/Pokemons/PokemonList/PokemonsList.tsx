import { useQuery } from "@tanstack/react-query"
import { ScrollView, Text, View } from "react-native"
import PokemonCart from "../PokemonCart/PokemonCart"
import { fetchPokemons } from "../services/pokemonsFetch"
import { styles } from "./styles/pokemonListStyles"

const PokemonsList = () => {
    const { data: pokemons, isLoading, isError } = useQuery({ queryKey: ["pokemons"], queryFn: fetchPokemons })

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading ... </Text>
            </View>
        )
    }

    if (isError) {
        return (
            <View style={styles.container}>
                <Text>Something went wrong</Text>
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
