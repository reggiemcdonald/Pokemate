import PokeDataProcessor from "../src/library/networking/PokeDataProcessor";
import expectedResults from "../queryResults/ExpectedResults.js";

describe("Should be able to generate the data needed for a pokemon component", () => {
    let pokeData;
    beforeEach( () => {
        pokeData =  new PokeDataProcessor();
    });
    it("Should be able to get the data for a single pokemon by name", async function () {
        let pikachu = await pokeData.formDefaultSpeciesData("pikachu");
        expect(pikachu.name).toEqual(expectedResults.mockPikachuDataStructure.name);
        expect(pikachu.id).toEqual(expectedResults.mockPikachuDataStructure.id);
        expect(pikachu.types).toEqual(expectedResults.mockPikachuDataStructure.types);
        expect(pikachu.strengths.length).toEqual(expectedResults.mockPikachuDataStructure.strengths.length);
        expect(pikachu.strengths).toEqual(expect.arrayContaining(expectedResults.mockPikachuDataStructure.strengths));
        expect(pikachu.weaknesses.length).toEqual(expectedResults.mockPikachuDataStructure.weaknesses.length);
        expect(pikachu.weaknesses).toEqual(expect.arrayContaining(expectedResults.mockPikachuDataStructure.weaknesses));
        expect(pikachu.noEffect.length).toEqual(expectedResults.mockPikachuDataStructure.noEffect.length);
        expect(pikachu.noEffect).toEqual(expect.arrayContaining(expectedResults.mockPikachuDataStructure.noEffect));
        expect(pikachu.varieties.length).toEqual(expectedResults.mockPikachuDataStructure.varieties.length);
        expect(pikachu.varieties).toEqual(expect.arrayContaining(expectedResults.mockPikachuDataStructure.varieties));
        expect(pikachu.evolutionChain).toEqual(expectedResults.mockPikachuDataStructure.evolutionChain);

    });
    it("Should be able to get the data for bulbasaur", async function () {
        let bulbasaur = await pokeData.formDefaultSpeciesData("bulbasaur");
        expect(bulbasaur.name).toEqual(expectedResults.mockBulbasaurDataStructure.name);
        expect(bulbasaur.id).toEqual(expectedResults.mockBulbasaurDataStructure.id);
        expect(bulbasaur.types).toEqual(expectedResults.mockBulbasaurDataStructure.types);
        expect(bulbasaur.strengths.length).toEqual(expectedResults.mockBulbasaurDataStructure.strengths.length);
        expect(bulbasaur.strengths).toEqual(expect.arrayContaining(expectedResults.mockBulbasaurDataStructure.strengths));
        expect(bulbasaur.weaknesses.length).toEqual(expectedResults.mockBulbasaurDataStructure.weaknesses.length);
        expect(bulbasaur.weaknesses).toEqual(expect.arrayContaining(expectedResults.mockBulbasaurDataStructure.weaknesses));
        expect(bulbasaur.noEffect.length).toEqual(expectedResults.mockBulbasaurDataStructure.noEffect.length);
        expect(bulbasaur.noEffect).toEqual(expect.arrayContaining(expectedResults.mockBulbasaurDataStructure.noEffect));
        expect(bulbasaur.varieties.length).toEqual(expectedResults.mockBulbasaurDataStructure.varieties.length);
        expect(bulbasaur.varieties).toEqual(expect.arrayContaining(expectedResults.mockBulbasaurDataStructure.varieties));
        expect(bulbasaur.evolutionChain).toEqual(expectedResults.mockBulbasaurDataStructure.evolutionChain);
        expect(bulbasaur.baseStats).toEqual(expectedResults.mockBulbasaurDataStructure.baseStats);

    });
    it("Should be able to get the data for a pokemon that has a no effect", async function () {
        let porygon = await pokeData.formDefaultSpeciesData("porygon");
        expect(porygon.name).toEqual(expectedResults.mockPorygonDataStructure.name);
        expect(porygon.id).toEqual(expectedResults.mockPorygonDataStructure.id);
        expect(porygon.types).toEqual(expectedResults.mockPorygonDataStructure.types);
        expect(porygon.strengths.length).toEqual(expectedResults.mockPorygonDataStructure.strengths.length);
        expect(porygon.strengths).toEqual(expect.arrayContaining(expectedResults.mockPorygonDataStructure.strengths));
        expect(porygon.weaknesses.length).toEqual(expectedResults.mockPorygonDataStructure.weaknesses.length);
        expect(porygon.weaknesses).toEqual(expect.arrayContaining(expectedResults.mockPorygonDataStructure.weaknesses));
        expect(porygon.noEffect.length).toEqual(expectedResults.mockPorygonDataStructure.noEffect.length);
        expect(porygon.noEffect).toEqual(expect.arrayContaining(expectedResults.mockPorygonDataStructure.noEffect));
    });
    it("Should be able to produce a list of pokemon", async function() {
        let list = await pokeData.getListOfPokemon();
        expect(list.length).toBeGreaterThanOrEqual(expectedResults.numberInDatabase);
    });
    it("Should be able to get species data on aegislash", async function() {
        let data = await pokeData.formDefaultSpeciesData("aegislash");
        expect(data.name).toEqual("aegislash-shield");
    });
    it("Should be able to generate a complex type tree", async () => {
        let data = await pokeData.formDefaultSpeciesData("zapdos");
        expect(data.strengths.length).toEqual(expectedResults.zapdosTypeRelations.strongAgainst.length);
        expect(data.strengths).toEqual(expect.arrayContaining(expectedResults.zapdosTypeRelations.strongAgainst));
        expect(data.weaknesses.length).toEqual(expectedResults.zapdosTypeRelations.weakAgainst.length);
        expect(data.weaknesses).toEqual(expect.arrayContaining(expectedResults.zapdosTypeRelations.weakAgainst));
        expect(data.noEffect.length).toEqual(expectedResults.zapdosTypeRelations.immuneTo.length);
        expect(data.noEffect).toEqual(expect.arrayContaining(expectedResults.zapdosTypeRelations.immuneTo));
    });
    afterAll((done) => {
        return done();
    });
});

describe("PokeDataProcessor: getSpirteUrl", ()=> {
    let pokeData;
    beforeEach(() => {
        pokeData = new PokeDataProcessor();
    });
    it("Should be able to get a sprite URL", async (done) => {
        expect(pokeData.getSpriteUrl("pikachu")).resolves.toEqual(expectedResults.mockPikachuDataStructure.sprite);
        done();
    });
});

describe("PokeDataProcessor: getBaseStatData", () => {
    let pokeData;
    beforeEach(() => {
        pokeData = new PokeDataProcessor();
    });

    it("Should be able to get the base stats of HP", async () => {
        let result;
        try {
            result = await pokeData.getBaseStatData("hp");
        } catch (err) {
            result = err;
        } finally {
            expect(result).toEqual(expectedResults.baseStatsHp);
        }
    })
})