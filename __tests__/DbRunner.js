import DBRunner from "../src/library/db/DbRunner";

describe('DB Runner should insert', () => {
    let dbRunner;

    beforeAll(async () => {
        try {
            dbRunner = new DBRunner();
            await dbRunner.init();
        } catch (e) {
            console.log(e);
        }
    });

    afterEach(() => {
        dbRunner.deleteAll();
    });

    it("Should be able to insert a pokemon", async () => {
        try {
            dbRunner.insertPokemon("pikachu", 1, "URL", []);
            let pokemon = dbRunner.Realm.objects('Pokemon');
            let pikachu = pokemon.filtered('name BEGINSWITH "p"');
            expect(pikachu[0].name).toBe("pikachu");
        } catch (e) {
            expect(true).toBe(false);
        }
    },10000);

    it ("Should be able to insert a base stat", async () => {
        try {
            dbRunner.insertBaseStat('HP',1,35);
            let stats = dbRunner.Realm.objects('BaseStat');
            stats = stats.filtered('name = "HP"');
            expect(stats.length).toBe(1);
            expect(stats[0].name).toBe('HP');
        } catch (e) {
            expect(true).toBe(false);
        }
    },100000)

    it ("Should be able to insert a new variety", () => {
        const names = [
            "Shiny Pikachu",
            "Shiny Bulbasaur"
        ];
        const defaultPids = [1,2];
        for (let i = 0; i < names.length; i++) {
            console.log(names[i]);
            dbRunner.insertVariety(defaultPids[i],names[i]);
        }
        let varieties = dbRunner.Realm.objects('Variety');
        expect(varieties.length).toBe(2);
        for (let i = 0; i < names.length; i++) {
            expect(varieties[i].varietyName).toBe(names[i]);
            expect(varieties[i].defaultPid).toBe(defaultPids[i]);
        }
    });

    it ("Should be able to insert a new type", () => {
        const types = [
            "water",
            "electric"
        ];
        for (let t of types) {
            dbRunner.insertType(t);
        }
        let queriedTypes = dbRunner.Realm.objects("Type");
        expect(queriedTypes).toHaveLength(2);
        for (let i = 0; i < queriedTypes.length; i++) {
            expect(queriedTypes[i].typeName).toBe(types[i]);
        }
    })
});