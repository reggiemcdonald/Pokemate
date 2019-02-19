import "react-native";
import React from "react";
import PokemonDataFetcher from "../src/library/networking/PokeDataFetcher";
import expectedResults from "../queryResults/ExpectedResults.js";
import Pokedex from "pokedex-promise-v2"

describe("Fetches data correctly", () => {

    it("Should be able to perform a basic fetch of a pokemen",   async function() {
        let pdf = new PokemonDataFetcher();
        let result = await pdf.getAllPokemonStats("pikachu");
        expect(result).toEqual(expectedResults.basicPikachuFetch);
    });
});
