import PokeDataProcessor from "../src/library/networking/PokeDataProcessor";
import expectedResults from "../queryResults/ExpectedResults.js";

describe("Should be able to generate the data needed for a pokemon component", () => {
    let pokeData;
    beforeEach(() => {
        pokeData = new PokeDataProcessor();
    });
    it("Should be able to get the data for a single pokemon by name", async function () {
        let pikachu = await pokeData.processComponentData("pikachu");
        expect(pikachu.name).toEqual(expectedResults.mockPikachuDataStructure.name);
        expect(pikachu.id).toEqual(expectedResults.mockPikachuDataStructure.id);
        expect(pikachu.types).toEqual(expectedResults.mockPikachuDataStructure.types);
        expect(pikachu.strengths.length).toEqual(expectedResults.mockPikachuDataStructure.strengths.length);
        expect(pikachu.strengths).toEqual(expect.arrayContaining(expectedResults.mockPikachuDataStructure.strengths));
        expect(pikachu.weaknesses.length).toEqual(expectedResults.mockPikachuDataStructure.weaknesses.length);
        expect(pikachu.weaknesses).toEqual(expect.arrayContaining(expectedResults.mockPikachuDataStructure.weaknesses));
        expect(pikachu.noEffect.length).toEqual(expectedResults.mockPikachuDataStructure.noEffect.length);
        expect(pikachu.noEffect).toEqual(expect.arrayContaining(expectedResults.mockPikachuDataStructure.noEffect));
    });
    it("Should be able to get the data for bulbasaur", async function () {
        let bulbasaur = await pokeData.processComponentData("bulbasaur");
        expect(bulbasaur.name).toEqual(expectedResults.mockBulbasaurDataStructure.name);
        expect(bulbasaur.id).toEqual(expectedResults.mockBulbasaurDataStructure.id);
        expect(bulbasaur.types).toEqual(expectedResults.mockBulbasaurDataStructure.types);
        expect(bulbasaur.strengths.length).toEqual(expectedResults.mockBulbasaurDataStructure.strengths.length);
        expect(bulbasaur.strengths).toEqual(expect.arrayContaining(expectedResults.mockBulbasaurDataStructure.strengths));
        expect(bulbasaur.weaknesses.length).toEqual(expectedResults.mockBulbasaurDataStructure.weaknesses.length);
        expect(bulbasaur.weaknesses).toEqual(expect.arrayContaining(expectedResults.mockBulbasaurDataStructure.weaknesses));
        expect(bulbasaur.noEffect.length).toEqual(expectedResults.mockBulbasaurDataStructure.noEffect.length);
        expect(bulbasaur.noEffect).toEqual(expect.arrayContaining(expectedResults.mockBulbasaurDataStructure.noEffect));
    })
});