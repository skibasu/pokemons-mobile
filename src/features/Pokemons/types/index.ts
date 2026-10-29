export type PokemonApiItem = {
    name: string
    url: string
}

export type PokemonDetails = {
    imageSrc: string | null
}

export type PokemonWithDetails = PokemonApiItem & PokemonDetails

export type PokemonListResponse = {
    results: PokemonApiItem[]
}

export type PokemonDetailsResponse = {
    sprites: {
        front_default: string | null
    }
}
