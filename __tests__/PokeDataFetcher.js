import "react-native";
import React from "react";
import PokemonDataFetcher from "../src/library/networking/PokeDataFetcher";
import expectedResults from "../queryResults/ExpectedResults.js";
import Pokedex from "pokedex-promise-v2"

describe("Fetches data correctly", () => {
    let pdf;
    beforeEach(() => {
        pdf = new PokemonDataFetcher();
    })
    it("Should be able to perform a basic fetch of a pokemen",   async function() {
        let result = await pdf.getAllPokemonStats("pikachu");
        expect(result).toEqual(expectedResults.basicPikachuFetch);
    });

    it("Should be able to get electric type data correctly", async function() {
        let result = await pdf.getTypeData("electric");
        expect(result).toEqual(expectedResults.basicElectricTypeFetch);
    });

    it("Should be able to fetch data with just the url", async function () {
        let url = "https://pokeapi.co/api/v2/pokemon/25/";
        let result = "";
        try {
            result = await pdf.getAtEnd(url);
        } catch (err) {
            result = err;
        } finally {
            expect(result).toEqual(expectedResults.basicPikachuFetch);
        }
    })
});
