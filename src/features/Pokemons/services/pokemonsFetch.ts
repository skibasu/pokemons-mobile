import { Pokemon, PokemonResult } from "../types"
import { API_BASE_LIMIT_PARAM, API_BASE_URL } from "./config"

export const fetchPokemons = async (): Promise<Pokemon[]> => {
    const response = await fetch(`${API_BASE_URL}${API_BASE_LIMIT_PARAM}`)
    if (!response.ok) {
        throw new Error("Network response was not ok")
    }
    const data: PokemonResult = await response.json()

    data.results.forEach((pokemon, i) => {
        // const id = Number(pokemon.url.split("/").filter(Boolean).pop())
        const regexID = /\/(\d+)\//
        const id = pokemon.url.match(regexID)?.[1] ?? ""
        data.results[i].details = { imageSrc: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }

        return pokemon
    })

    return data.results
}
