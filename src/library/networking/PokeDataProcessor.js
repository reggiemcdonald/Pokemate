import Pokedex from "pokedex-promise-v2";
import PromiseInterrupt from "../errors/PromiseInterrupt";

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
     *  - BaseStats
     */
    constructor() {
        this.pokedex = new Pokedex({
            timeout: 5 * 1000,
            caching: 0
        });
        this.promiseInterrupted = false;
    }


    /**
     * Returns all the data needed for a pokemon component
     * @param name: name of pokemon to process
     */
    async formDefaultSpeciesData(name) {
        // let that = this;
        try {
            this.isPromiseCanceled()
            let speciesData = await this.pokedex.getPokemonSpeciesByName(name);
            let defaultVariety = this._getDefaultVariety(speciesData);
            this.isPromiseCanceled();
            let defaultVarietyData = await this.pokedex.getPokemonByName(defaultVariety);
            let pokemonName = this._getName(defaultVarietyData);
            let id = this._getId(defaultVarietyData);
            let sprite = this._getSprite(defaultVarietyData);
            let types = this._getTypes(defaultVarietyData);
            this.isPromiseCanceled();
            let damageRelations = await this._getDamageRelations(types);
            this.isPromiseCanceled();
            let evolutionChain = await this._getEvolutionChain(speciesData);
            let varieties = this._getNonDefaultVarieties(speciesData);
            let baseStats = this._structureBaseStats(defaultVarietyData.stats);
            return {
                name: pokemonName,
                id: id,
                types: types,
                sprite: sprite,
                strengths: damageRelations.strengths,
                weaknesses: damageRelations.weaknesses,
                noEffect: damageRelations.noEffect,
                varieties: varieties,
                evolutionChain: evolutionChain,
                baseStats: baseStats
            };
        } catch (err) {
            return err;
        }
    }

    /**
     * Produces a list of pokemon names that are accessible through the PokeAPI
     * and have been marked as default by the database
     * @returns Promise<string[]>
     */
    async getListOfPokemon() {
        try {
            let pokeList = [];
            this.isPromiseCanceled();
            let pokemonList = await this.pokedex.getPokemonSpeciesList();
            pokemonList.results.forEach( function (value) {
                pokeList.push(value.name);
            });
            return pokeList;
        } catch (err) {
            return err;
        }
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
        try {
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
            noEffect.forEach((value) => {
                if (!damageRelations.noEffect.includes(value)) {
                    damageRelations.noEffect.push(value);
                }
            });
            strengths.forEach((value) => {
                if (!damageRelations.strengths.includes(value) &&
                    !weaknesses.includes(value) && !noEffect.includes(value)) {
                    damageRelations.strengths.push(value);
                }
            });
            weaknesses.forEach((value) => {
                if (!damageRelations.weaknesses.includes(value) &&
                    !strengths.includes(value) && !noEffect.includes(value)) {
                    damageRelations.weaknesses.push(value);
                }
            });
            return damageRelations;
        } catch (err) {
            return err;
        }
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
        try {
            this.isPromiseCanceled();
            let evolutionChain = await this.pokedex.resource(speciesData.evolution_chain.url);
            return evolutionChain.chain;
        } catch (err) {
            return null;
        }
    }

    /**
     * Returns the name of the default variety of this species
     * @private
     */
    _getDefaultVariety(speciesData) {
        for (let variety of speciesData.varieties) {
            if (variety.is_default) {
                return variety.pokemon.name;
            }
        }
    }

    /**
     * Put the base stats into an easily accessible structure
     * @param rawStats
     * @returns {{"special-attack": {}, defense: {}, attack: {}, hp: {}, "special-defense": {}, speed: {}}}
     * @private
     */
    _structureBaseStats(rawStats) {
        let baseStats = {
            hp: {},
            attack: {},
            defense: {},
            "special-attack": {},
            "special-defense": {},
            speed: {}
        };
        for (let stat of rawStats) {
            baseStats[stat.stat.name] = stat;
        }
        return baseStats;
    }

    async getSpriteUrl(name) {
        try {
            this.isPromiseCanceled();
            let speciesData = await this.pokedex.getPokemonSpeciesByName(name);
            let defaultSpecies = this._getDefaultVariety(speciesData);
            this.isPromiseCanceled();
            let defaultData = await this.pokedex.getPokemonByName(defaultSpecies);
            return this._getSprite(defaultData);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Returns the information for base stat statName in a useable form
     * @param statName
     * @returns {
     *    {
     *      characteristics: Array,
     *      affectingMoves: {negative: object[], positive: object[]},
     *      affectingNatures: {negative: string[], positive: string[]},
     *      isBattleOnly: boolean
     *    }
     * }
     */
    async getBaseStatData(statName) {
        try {
            this.isPromiseCanceled();
            let statData = await this.pokedex.getStatByName(statName);
            let statObject = {
                name: statName
            };
            statObject = this._composeStatDataObject(statData.affecting_moves, statObject, "affectingMoves");
            statObject = this._composeStatDataObject(statData.affecting_natures, statObject, "affectingNatures");
            statObject.characteristics = [];
            for (let element of statData.characteristics) {
                statObject.characteristics.push(element.url);
            }
            statObject.isBattleOnly = statData.is_battle_only;
            this.isPromiseCanceled();
            return statObject;
        } catch (err) {
            // TODO: error handling
            throw err;
        }
    }

    _composeStatDataObject(statData, statDataObject, name) {
        statDataObject[name] = {
            positive: [],
            negative: []
        };
        for (let element of statData.increase) {
            statDataObject[name].positive.push({
                name: element.move.name,
                change: element.change
            });
        }
        for (let element of statData.decrease) {
            statDataObject[name].negative.push({
                name: element.move.name,
                change: element.change
            });
        }
        return statDataObject;
    }

    cancelPromise() {
        this.promiseInterrupted = true;
    }

    isPromiseCanceled() {
        if (this.promiseInterrupted) {
            this.promiseInterrupted = false;
            throw new PromiseInterrupt();
        }
    }

}