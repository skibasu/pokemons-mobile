import { Pokemon, PokemonResult } from "../types"

export const fetchPokemons = async (url: string): Promise<Pokemon[]> => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error("Network response was not ok")
    }
    const data: PokemonResult = await response.json()

    await Promise.all(
        data.results.map(async (pokemon, i) => {
            const detailsResult = await fetch(pokemon.url)
            if (!detailsResult.ok) {
                throw new Error("Network response was not ok")
            }
            const details: Pokemon = await detailsResult.json()
            // @ts-ignore
            data.results[i].details = { imageSrc: details.sprites.front_default }

            return details
        }),
    )
    return data.results
}
