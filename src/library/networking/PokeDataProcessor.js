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
        this.pokedex = new Pokedex({
            timeout: 5 * 1000
        });
    }


    /**
     * Returns all the data needed for a pokemon component
     * @param name: name of pokemon to process
     */
    async formDefaultSpeciesData(name) {
        let that = this;
        return new Promise(async function (resolve, reject) {
            try {
                let speciesData = await that.pokedex.getPokemonSpeciesByName(name);
                let defaultVariety = that._getDefaultVariety(speciesData);
                let defaultVarietyData = await that.pokedex.getPokemonByName(defaultVariety);
                let pokemonName = that._getName(defaultVarietyData);
                let id = that._getId(defaultVarietyData);
                let sprite = that._getSprite(defaultVarietyData);
                let types = that._getTypes(defaultVarietyData);
                let damageRelations = await that._getDamageRelations(types);
                let evolutionChain = await that._getEvolutionChain(speciesData);
                let varieties = that._getNonDefaultVarieties(speciesData);

                return resolve({
                    name: pokemonName,
                    id: id,
                    types: types,
                    sprite: sprite,
                    strengths: damageRelations.strengths,
                    weaknesses: damageRelations.weaknesses,
                    noEffect: damageRelations.noEffect,
                    varieties: varieties,
                    evolutionChain: evolutionChain
                });
            } catch (err) {
                return reject(err);
            }
        });
    }

    /**
     * Produces a list of pokemon names that are accessible through the PokeAPI
     * and have been marked as default by the database
     * @returns Promise<string[]>
     */
    getListOfPokemon() {
        let that = this;
        return new Promise(async function(resolve,reject) {
            try {
                let pokeList = [];
                let pokemonList = await that.pokedex.getPokemonSpeciesList();
                pokemonList.results.forEach(async function (value) {
                    pokeList.push(value.name);
                });
                return resolve(pokeList);
            } catch (err) {
                return reject(err);
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

    /**
     * Gets non-default varieties of this pokemon
     */
    _getNonDefaultVarieties(speciesData) {
        let varieties = [];
        for (let variety of speciesData.varieties) {
            if (!variety.is_default) {
                varieties.push(variety.pokemon.name);
            }
        }
        return varieties;
    }

    /**
     * Builds an evolution chain for the given pokemon
     */
    async _getEvolutionChain(speciesData) {
        let evolutionChain = await this.pokedex.resource(speciesData.evolution_chain.url);
        return evolutionChain.chain;
    }

    /**
     * Returns the name of the default variety of this species
     * @private
     */
    _getDefaultVariety(speciesData) {
        for (variety of speciesData.varieties) {
            if (variety.is_default) {
                return variety.pokemon.name;
            }
        }
    }

    async getSpriteUrl(name) {
        let data = await this.pokedex.getPokemonByName(name);
        return this._getSprite(data);
    } catch (err) {
        throw err;
    }
}