import { describe, expect, it, jest } from "@jest/globals"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen, waitFor } from "@testing-library/react-native"
import { fetchPokemons } from "../services/pokemonsFetch"
import type { PokemonWithDetails } from "../types"
import PokemonsList from "./PokemonsList"

jest.mock("../services/pokemonsFetch", () => ({
    fetchPokemons: jest.fn(),
}))

describe("PokemonsList", () => {
    it("should display a loading message while Pokémon are being fetched", async () => {
        const fetchPokemonsMock = jest.mocked(fetchPokemons)
        fetchPokemonsMock.mockReset()
        fetchPokemonsMock.mockReturnValue(new Promise<PokemonWithDetails[]>(() => {}))

        await render(
            <QueryClientProvider client={new QueryClient()}>
                <PokemonsList />
            </QueryClientProvider>,
        )
        expect(screen.getByText("Loading ...")).toBeOnTheScreen()
    })

    it("should display an error message when fetching Pokémon fails", async () => {
        const fetchPokemonsMock = jest.mocked(fetchPokemons)
        fetchPokemonsMock.mockReset()
        fetchPokemonsMock.mockRejectedValue(new Error("Failed to fetch Pokémon"))

        await render(
            <QueryClientProvider
                client={
                    new QueryClient({
                        defaultOptions: {
                            queries: {
                                retry: false,
                            },
                        },
                    })
                }
            >
                <PokemonsList />
            </QueryClientProvider>,
        )
        const errorMessage = await screen.findByText("Something went wrong")
        expect(errorMessage).toBeOnTheScreen()
    })
    it("should display the fetched Pokémon and hide the loading message", async () => {
        const fetchPokemonsMock = jest.mocked(fetchPokemons)
        fetchPokemonsMock.mockReset()
        fetchPokemonsMock.mockReturnValue(new Promise<PokemonWithDetails[]>((resolve) => resolve([{ name: "pokemon", url: "https://pokeapi.co/api/v2/pokemon/1/", imageSrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" }])))

        await render(
            <QueryClientProvider client={new QueryClient()}>
                <PokemonsList />
            </QueryClientProvider>,
        )

        const list = await screen.findAllByRole("link")
        expect(list).toHaveLength(1)
        expect(screen.queryByText("Loading ...")).not.toBeOnTheScreen()
    })
    it("should display no Pokémon cards when the API returns an empty list", async () => {
        const fetchPokemonsMock = jest.mocked(fetchPokemons)
        fetchPokemonsMock.mockReset()
        fetchPokemonsMock.mockResolvedValue([])

        await render(
            <QueryClientProvider client={new QueryClient()}>
                <PokemonsList />
            </QueryClientProvider>,
        )

        await waitFor(() => {
            expect(screen.queryByText("Loading ...")).not.toBeOnTheScreen()
        })

        expect(screen.queryAllByRole("link")).toHaveLength(0)
        expect(screen.queryByText("Something went wrong")).not.toBeOnTheScreen()
    })
})
