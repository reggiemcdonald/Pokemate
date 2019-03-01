import PokeDataManager from "../src/library/networking/PokeDataManager";
import ExpectedResults from "../queryResults/ExpectedResults";
import PromiseInterrupt from "../src/library/errors/PromiseInterrupt";

describe("PokeDataManager: Build Evolution Chain", () => {

    it("Should be able to build a simple evolution chain", async function () {
        try {
            let pokeDataManager = new PokeDataManager();
            let pokeData = await pokeDataManager.getPokemonDetails("bulbasaur");
            let evoChain = await pokeDataManager.buildEvolutionChain(pokeData.evolutionChain);
            expect(evoChain).toEqual(ExpectedResults.bulbasaurEvolutionChain);
        } catch (err){
            expect(err).toBe(false);
        }
    });

    it("Should be able to build a more complex evolution chain", async function () {
        try {
            let pokeDataManager = new PokeDataManager();
            let pokeData = await pokeDataManager.getPokemonDetails("oddish");
            let evoChain = await pokeDataManager.buildEvolutionChain(pokeData.evolutionChain);
            expect(evoChain).toEqual(ExpectedResults.oddishEvolutionChain);
        } catch (err){
            expect(err).toBe(false);
        }
    },10000);
});

describe("PokeDataManager: getPokemonDetails", () => {
    let pokeData;
    beforeEach(() => {
        pokeData = new PokeDataManager();
    });
    it("Should be able to build pokemon data for bulbasaur", async function () {
        let bulbasaur;
        try {
            bulbasaur = await pokeData.getPokemonDetails("bulbasaur");
        } catch (err) {
            console.log("hitting an error");
            bulbasaur = err;
        } finally {
            expect(bulbasaur.name).toEqual(ExpectedResults.mockBulbasaurDataStructure.name);
            expect(bulbasaur.id).toEqual(ExpectedResults.mockBulbasaurDataStructure.id);
            expect(bulbasaur.types).toEqual(ExpectedResults.mockBulbasaurDataStructure.types);
            expect(bulbasaur.strengths.length).toEqual(ExpectedResults.mockBulbasaurDataStructure.strengths.length);
            expect(bulbasaur.strengths).toEqual(expect.arrayContaining(ExpectedResults.mockBulbasaurDataStructure.strengths));
            expect(bulbasaur.weaknesses.length).toEqual(ExpectedResults.mockBulbasaurDataStructure.weaknesses.length);
            expect(bulbasaur.weaknesses).toEqual(expect.arrayContaining(ExpectedResults.mockBulbasaurDataStructure.weaknesses));
            expect(bulbasaur.noEffect.length).toEqual(ExpectedResults.mockBulbasaurDataStructure.noEffect.length);
            expect(bulbasaur.noEffect).toEqual(expect.arrayContaining(ExpectedResults.mockBulbasaurDataStructure.noEffect));
            expect(bulbasaur.varieties.length).toEqual(ExpectedResults.mockBulbasaurDataStructure.varieties.length);
            expect(bulbasaur.varieties).toEqual(expect.arrayContaining(ExpectedResults.mockBulbasaurDataStructure.varieties));
            expect(bulbasaur.evolutionChain).toEqual(ExpectedResults.mockBulbasaurDataStructure.evolutionChain);
        }
    });
    test("Should be able to build pokemon data for pikachu", async function() {
        let pikachu;
        try {
            pikachu = await pokeData.getPokemonDetails("pikachu");
        } catch (err) {
            pikachu = err;
        } finally {
            expect(pikachu.name).toEqual(ExpectedResults.mockPikachuDataStructure.name);
            expect(pikachu.id).toEqual(ExpectedResults.mockPikachuDataStructure.id);
            expect(pikachu.types).toEqual(ExpectedResults.mockPikachuDataStructure.types);
            expect(pikachu.strengths.length).toEqual(ExpectedResults.mockPikachuDataStructure.strengths.length);
            expect(pikachu.strengths).toEqual(expect.arrayContaining(ExpectedResults.mockPikachuDataStructure.strengths));
            expect(pikachu.weaknesses.length).toEqual(ExpectedResults.mockPikachuDataStructure.weaknesses.length);
            expect(pikachu.weaknesses).toEqual(expect.arrayContaining(ExpectedResults.mockPikachuDataStructure.weaknesses));
            expect(pikachu.noEffect.length).toEqual(ExpectedResults.mockPikachuDataStructure.noEffect.length);
            expect(pikachu.noEffect).toEqual(expect.arrayContaining(ExpectedResults.mockPikachuDataStructure.noEffect));
            expect(pikachu.varieties.length).toEqual(ExpectedResults.mockPikachuDataStructure.varieties.length);
            expect(pikachu.varieties).toEqual(expect.arrayContaining(ExpectedResults.mockPikachuDataStructure.varieties));
            expect(pikachu.evolutionChain).toEqual(ExpectedResults.mockPikachuDataStructure.evolutionChain);
        }
    });
});

describe("Data Manager: Promise Rejection", () => {
    let dataManager;
    beforeEach(() => {
        dataManager = new PokeDataManager();
    });
    it("Should be able to cancel a promise", async () => {
        dataManager.cancelPromise();
        expect(dataManager.getPokemonDetails("pikachu")).rejects.toThrow(PromiseInterrupt);
    });
});