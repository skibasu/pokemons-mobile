import { describe, expect, it } from "@jest/globals"
import { render, screen } from "@testing-library/react-native"
import PokemonCart from "./PokemonCart"

describe("PokemonCart", () => {
    it("should display the Pokémon name and image with the provided source", async () => {
        const pokemon = { name: "Pikachu", imageSrc: "pikachu.png", url: "https://pokeapi.co/api/v2/pokemon/pikachu" }
        await render(<PokemonCart pokemon={pokemon} />)
        const image = screen.getByLabelText("Pikachu")
        expect(screen.getByText("Pikachu")).toBeOnTheScreen()

        expect(image).toHaveProp("source", { uri: "pikachu.png" })
        expect(image).toBeOnTheScreen()
    })
})
