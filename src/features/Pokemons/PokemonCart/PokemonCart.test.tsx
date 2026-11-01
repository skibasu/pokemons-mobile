import { describe, it } from "@jest/globals"

import { render, screen, userEvent } from "@testing-library/react-native"
import { renderRouter } from "expo-router/testing-library"

import PokemonCart from "./PokemonCart"

describe("PokemonCart", () => {
    it("should display link", async () => {
        const pokemon = { name: "Pikachu", imageSrc: "pikachu.png", url: "https://pokeapi.co/api/v2/pokemon/pikachu" }
        await render(<PokemonCart pokemon={pokemon} />)
        const card = screen.getByRole("link")
        expect(card).toBeOnTheScreen()
    })
    it("should display the Pokémon name and image with the provided source", async () => {
        const pokemon = { name: "Pikachu", imageSrc: "pikachu.png", url: "https://pokeapi.co/api/v2/pokemon/pikachu" }
        await render(<PokemonCart pokemon={pokemon} />)
        const image = screen.getByLabelText("Pikachu")
        expect(screen.getByText("Pikachu")).toBeOnTheScreen()

        expect(image).toHaveProp("source", { uri: "pikachu.png" })
        expect(image).toBeOnTheScreen()
    })
    it("should not display the image if the source is not provided", async () => {
        const pokemon = { name: "Pikachu", imageSrc: null, url: "https://pokeapi.co/api/v2/pokemon/pikachu" }
        await render(<PokemonCart pokemon={pokemon} />)
        const image = screen.queryByLabelText("Pikachu")
        expect(screen.getByText("Pikachu")).toBeOnTheScreen()
        expect(image).not.toBeOnTheScreen()
    })
    it("should navigate to the Pokémon details screen when the card is pressed", async () => {
        const user = userEvent.setup()
        const pokemon = { name: "Pikachu", imageSrc: "pikachu.png", url: "https://pokeapi.co/api/v2/pokemon/pikachu" }
        await renderRouter(
            { "details/[name]": () => null, index: () => <PokemonCart pokemon={pokemon} /> },
            {
                initialUrl: "/",
            },
        )
        const link = screen.getByRole("link")
        await user.press(link)
        expect(screen).toHavePathname(`/details/${pokemon.name}`)
    })
})
