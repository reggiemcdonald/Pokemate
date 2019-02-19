import "react-native";
import React from "react";
import PokemonDataFetcher from "../src/library/networking/PokeDataFetcher";
import expectedResults from "../queryResults/ExpectedResults.js";

describe("Fetches data correctly", () => {

    it("Should be able to perform a basic fetch of a pokemen",   async function() {
        let pdf = new PokemonDataFetcher();
        let answer = await pdf.getFullPokemonStats("pikachu");
        expect(answer).toEqual(expectedResults.basicPikachuFetch);
    });


});
