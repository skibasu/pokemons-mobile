import { PokemonDetails } from "../types"
import { API_BASE_URL } from "./config"

export const fetchPokemonByName = async (name: string): Promise<PokemonDetails> => {
    const response = await fetch(`${API_BASE_URL}/pokemon/${name}`)
    if (!response.ok) {
        throw new Error("Network response was not ok")
    }
    const data: PokemonDetails = await response.json()
    return data
}
