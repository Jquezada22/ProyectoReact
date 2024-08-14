import React from "react";
import { renderWithProviders } from "../../testUtils/renderWithProviders";
import { FavoritePokemon } from "./FavoritePokemon";
import { useFavoriteStore } from "../../store/useFavoriteStore";

jest.mock("../../store/useFavoriteStore", () => ({
    useFavoriteStore: jest.fn(),
}));

describe("FavoritePokemon", () => {
    afterEach(() => jest.clearAllMocks());

    it("sholud render PokemonCards for each Favorite Pokemon", () => {
        const favoriteIds = ["1", "2", "3"];
        (useFavoriteStore as unknown as jest.Mock).mockReturnValue(favoriteIds);

        const { getAllByTestId } = renderWithProviders(<FavoritePokemon />);

        const pokemonCards = getAllByTestId("pokemon-card");
        expect(pokemonCards).toHaveLength(favoriteIds.length);
    });

    it("sholud not render PokemonCards if there are no Favorite Pokemon", () => {
        const favoriteIds: string[] = [];
        (useFavoriteStore as unknown as jest.Mock).mockReturnValue(favoriteIds);

        const { queryAllByTestId } = renderWithProviders(<FavoritePokemon />);

        const pokemonCards = queryAllByTestId("pokemon-card");
        expect(pokemonCards).toHaveLength(favoriteIds.length);
    });
})