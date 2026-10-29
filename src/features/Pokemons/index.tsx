import React from "react"
import PokemonsList from "./PokemonList/PokemonsList"

const Pokemons: React.FC = () => {
    return <PokemonsList url="https://pokeapi.co/api/v2/pokemon?limit=60" />
}

export default Pokemons
