import React from "react";
import EvolutionChain from "../src/components/EvolutionChain";
import PokeDataManager from "../src/library/networking/PokeDataManager";
import renderer from "react-test-renderer";
import ErrorBoundary from "../src/components/ErrorBoundary";

describe("Evolution Chain: Component", () => {
    test("Evolution Chain should render without crashing", async function () {
        try {
            let pokeDataManager = new PokeDataManager();
            let data = await pokeDataManager.getPokemonDetails("bulbasaur");
            const tree = renderer.create(
                <ErrorBoundary>
                    <EvolutionChain data={data} dataManager={pokeDataManager}/>
                </ErrorBoundary>).toJSON();

            expect(tree).toMatchSnapshot();
        } catch (err) {
            expect(true).toBeFalse();
        }
    });
});





