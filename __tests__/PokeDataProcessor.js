import PokeDataProcessor from "../src/library/networking/PokeDataProcessor";
import expectedResults from "../queryResults/ExpectedResults.js";

describe("Should be able to generate the data needed for a pokemon component", () => {
    let pokeData;
    beforeEach(() => {
        pokeData = new PokeDataProcessor();
    });
    it("Should be able to get the data for a single pokemon by name", async function () {
        let pikachu = await pokeData.processComponentData("pikachu");
        expect(pikachu).toEqual(expectedResults.mockPikachuDataStructure);
    });
    it("Should be able to get the data for bulbasaur", async function () {
        let bulbasaur = await pokeData.processComponentData("bulbasaur");
        expect(bulbasaur).toEqual(expectedResults.mockBulbasaurDataStructure);
    })
});