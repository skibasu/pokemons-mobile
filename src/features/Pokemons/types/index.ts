export type PokemonDetails = { imageSrc: string }

export type Pokemon = {
    name: string
    url: string
    details: PokemonDetails
}

export interface PokemonResult {
    results: Pokemon[]
}
