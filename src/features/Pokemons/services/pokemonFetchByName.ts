import type { PokemonDetails, PokemonDetailsResponse } from "../types"
import { API_BASE_URL } from "./config"

export const fetchPokemonByName = async (name: string): Promise<PokemonDetails> => {
    const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(name)}`)
    if (!response.ok) {
        throw new Error("Network response error: " + response.statusText)
    }

    const data: PokemonDetailsResponse = await response.json()

    return { imageSrc: data?.sprites?.front_default }
}
