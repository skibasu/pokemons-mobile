import { Link } from "expo-router"
import { Image, Pressable, Text } from "react-native"

import { Pokemon } from "../types"
import { styles } from "./styles/pokemonCartStyles"

type PokemonCartProps = {
    pokemon: Pokemon
}
const PokemonCart = ({ pokemon: { name, details } }: PokemonCartProps) => {
    return (
        <Link
            style={styles.elem}
            href={{
                pathname: "/details/[name]",
                params: { name },
            }}
            asChild
        >
            <Pressable>
                <Image source={{ uri: details.imageSrc }} style={styles.image} resizeMode="contain" />
                <Text style={styles.title}>{name}</Text>
            </Pressable>
        </Link>
    )
}

export default PokemonCart
