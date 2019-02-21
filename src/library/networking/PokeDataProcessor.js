import Pokedex from "pokedex-promise-v2";

export default class PokeDataProcessor {

    /**
     * ****************
     * Data Processor
     * ****************
     * Use to form a structure that contains all the necessary pokemon data
     * Data to include:
     *  - Name
     *  - API Identifier
     *  - Type(s)
     *  - Sprite URL
     *  - Types the pokemon has weak defense against
     *  - Types the pokemon has strong defense against
     *  - Types that cant damage this pokemon
     *  - Evolution Chain
     */
    constructor() {
        this.pokedex = new Pokedex();
    }


    /**
     * Returns all the data needed for a pokemon component
     * @param name: name of pokemon to process
     */
    async processComponentDataByName(name) {
        let that = this;
        return new Promise(async function (resolve, reject) {
            try {
                let data = await that.pokedex.getPokemonByName(name);
                let pokemonName = that._getName(data);
                let id = that._getId(data);
                let sprite = that._getSprite(data);
                let types = that._getTypes(data);
                let damageRelations = await that._getDamageRelations(types);
                return resolve({
                    name: pokemonName,
                    id: id,
                    types: types,
                    sprite: sprite,
                    strengths: damageRelations.strengths,
                    weaknesses: damageRelations.weaknesses,
                    noEffect: damageRelations.noEffect
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Produces a list of pokemon names that can be queried
     * using processComponentDataByName
     * @returns Promise<string[]>
     */
    getListOfPokemon() {
        let that = this;
        return new Promise(async function(resolve,reject) {
            try {
                let pokeList = [];
                let pokemonList = await that.pokedex.getPokemonsList();
                pokemonList.results.forEach((value) => {
                    pokeList.push(value.name);
                });
                return resolve(pokeList);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Returns the name of the pokemon
     */
    _getName(data) {
        return data.name;
    }

    /**
     * Returns the API Identifier of the pokemon
     */
    _getId(data) {
        return data.id;
    }

    /**
     * Returns an array of the types of the pokemon
     */
    _getTypes(data) {
        let types = []
        for (let item of data.types) {
            types.push(item.type.name);
        }
        return types;
    }

    /**
     * Get the sprite url for the selected pokemon
     * Default to
     * @private
     */
    _getSprite(data) {
        return data.sprites.front_default;
    }

    /**
     * Returns the damage relations for the types given
     * @param types
     * @private
     */
    async _getDamageRelations(types) {
        let damageRelations = {
            strengths: [],
            weaknesses: [],
            noEffect: []
        };
        let strengths = [];
        let weaknesses = [];
        let noEffect = [];
        for (type of types) {
            let typeData = await this.pokedex.getTypeByName(type);
            typeData.damage_relations.double_damage_from.forEach((value) => {
                weaknesses.push(value.name);
            });
            typeData.damage_relations.half_damage_from.forEach((value) => {
                strengths.push(value.name);
            });
            typeData.damage_relations.no_damage_from.forEach((value) => {
                noEffect.push(value.name);
            });
        }
        strengths.forEach((value) => {
            if (!damageRelations.strengths.includes(value) &&
                !weaknesses.includes(value)) {
                damageRelations.strengths.push(value);
            }
        });
        weaknesses.forEach((value) => {
            if (!damageRelations.weaknesses.includes(value) &&
                    !strengths.includes(value)) {
                damageRelations.weaknesses.push(value);
            }
        });
        noEffect.forEach((value) => {
            if (!damageRelations.noEffect.includes(value) &&
                !strengths.includes(value) && !weaknesses.includes(value)) {
                damageRelations.noEffect.push(value);
            }
        });
        return damageRelations;
    }
}