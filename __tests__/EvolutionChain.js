import React from "react";
import EvolutionChain from "../src/components/EvolutionChain";
import PokeDataManager from "../src/library/networking/PokeDataManager";
import ExpectedResults from "../queryResults/ExpectedResults";


describe("Evolution Chain: Build Evolution Chain", () => {

    it("Should be able to build a simple evolution chain", async function () {
        try {
            let pokeDataManager = new PokeDataManager();
            let pokeData = await pokeDataManager.getPokemonDetails("bulbasaur");
            let evolutionChain = new EvolutionChain({
                data: pokeData,
                dataManager: pokeDataManager
            });
            let evoChain = await evolutionChain._buildEvolutionChain(pokeData.evolutionChain);
            console.log(evoChain);
            expect(evoChain).toEqual(ExpectedResults.bulbasaurEvolutionChain);
        } catch (err){
            expect(err).toBe(false);
        }
    });

    it("Should be able to build a more complex evolution chain", async function () {
        try {
            let pokeDataManager = new PokeDataManager();
            let pokeData = await pokeDataManager.getPokemonDetails("oddish");
            let evolutionChain = new EvolutionChain({
                data: pokeData,
                dataManager: pokeDataManager
            });
            let evoChain = await evolutionChain._buildEvolutionChain(pokeData.evolutionChain);
            console.log(evoChain);
            expect(evoChain).toEqual(ExpectedResults.oddishEvolutionChain);
        } catch (err){
            expect(err).toBe(false);
        }
    });
});


