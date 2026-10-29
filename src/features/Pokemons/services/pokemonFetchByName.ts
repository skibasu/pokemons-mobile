import { PokemonDetails } from "../types"
import { API_BASE_URL } from "./config"

export const fetchPokemonByName = async (name: string): Promise<PokemonDetails> => {
    const response = await fetch(`${API_BASE_URL}/${name}`)
    if (!response.ok) {
        throw new Error("Network response was not ok")
    }

    const data = await response.json()

    return { imageSrc: data?.sprites?.front_default }
}
