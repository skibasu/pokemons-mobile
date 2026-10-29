import { Link } from "expo-router"
import { Image, Pressable, Text } from "react-native"
import type { PokemonWithDetails } from "../types"
import { styles } from "./styles/pokemonCartStyles"

type PokemonCartProps = {
    pokemon: PokemonWithDetails
}
const PokemonCart = ({ pokemon: { name, imageSrc } }: PokemonCartProps) => {
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
                <Image source={{ uri: imageSrc ?? undefined }} style={styles.image} resizeMode="contain" />
                <Text style={styles.title}>{name}</Text>
            </Pressable>
        </Link>
    )
}

export default PokemonCart
