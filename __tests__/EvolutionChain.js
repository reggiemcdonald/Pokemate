import React from "react";
import EvolutionChain from "../src/components/EvolutionChain";
import PokeDataManager from "../src/library/networking/PokeDataManager";
import renderer from "react-test-renderer";

describe("Evolution Chain: Component", () => {
    test("Evolution Chain should render without crashing", async function () {
        try {
            let pokeDataManager = new PokeDataManager();
            let data = await pokeDataManager.getPokemonDetails("bulbasaur");
            const tree = renderer.create(<EvolutionChain data={data} dataManager={pokeDataManager}/>).toJSON();
            expect(tree).toMatchSnapshot();
        } catch (err) {
            expect(true).toBeFalse();
        }
    });
});





