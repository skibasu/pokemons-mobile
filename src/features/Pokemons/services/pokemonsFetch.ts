import type { PokemonListResponse, PokemonWithDetails } from "../types"
import { API_BASE_LIMIT_PARAM, API_BASE_URL } from "./config"

export const fetchPokemons = async (): Promise<PokemonWithDetails[]> => {
    const response = await fetch(`${API_BASE_URL}${API_BASE_LIMIT_PARAM}`)

    if (!response.ok) {
        throw new Error("Network response was not ok")
    }
    const data: PokemonListResponse = await response.json()

    const pokemonWithDetails = data.results.map((pokemon) => {
        const regexID = /\/(\d+)\/?$/
        const id = pokemon.url.match(regexID)?.[1] ?? ""

        if (!id) {
            throw new Error(`Invalid Pokémon URL: ${pokemon.url}`)
        }

        return { ...pokemon, imageSrc: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }
    })

    return pokemonWithDetails
}
