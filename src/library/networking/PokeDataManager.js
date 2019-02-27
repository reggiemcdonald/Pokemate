/**
 * ***********************
 * A data management class
 * ***********************
 */
import PokeDataProcessor from "./PokeDataProcessor";

export default class PokeDataManager {
    constructor(existingData?) {
        this.processor = new PokeDataProcessor();
        this.pokeData = {};
        this.orderedEvolutionTree = {};
        this._restoreData(existingData);
    }

    /**
     * Restore data if there is any to restore
     * Otherwise, do nothing
     * @param existingData
     * @private
     */
    _restoreData(existingData) {
        if (existingData) {
            this.pokeData = existingData.pokeData ? existingData.pokeData : {};
            this.orderedEvolutionTree = existingData.orderedEvolutionTree ? existingData.orderedEvolutionTree : {}
        }
    }

    /**
     * Creates a JSON serializable object to handoff data between instances of PokeDataManager
     * return {
     *     pokeData: this.pokeData
     * }
     */
    createHandoff() {
        return {
            pokeData: this.pokeData
        }
    }

    /**
     * Return the pokemon data if its already been generated
     * Otherwise, generate it, save it, and return it
     * @param name
     * @returns {Promise<any>}
     */
     async getPokemonDetails(name) {
        try {
            if (this.pokeData.hasOwnProperty(name)) {
                return this.pokeData[name];
            } else {
                let pokemon = await this.processor.formDefaultSpeciesData(name);
                this.pokeData[name] = pokemon;
                return pokemon;
            }
        } catch (err) {
            return err;
        }
    }

    /**
     * Returns the list of pokemon species
     * @returns {Promise<any> | Promise<*>}
     */
    async getListOfPokemon() {
         try {
             let pokemonList = await this.processor.getListOfPokemon();
             return pokemonList;
         } catch (err) {
             return err;
         }
    }

    async getSpriteUrl(name) {
        let that = this;
        try {
            if (that.pokeData.hasOwnProperty(name)) {
                return that.pokeData[name].sprite;
            }
            let url = await that.processor.getSpriteUrl(name);
            return url;
        } catch (err) {
            return err;
        }
    }

    /**
     * Generate an array of evolution objects
     * [{
     *     trigger: string,
     *     triggerConditional: string,
     *     spriteArray: {}
     * }]
     * @param data
     */
    async buildEvolutionChain(evolutionData) {
        try {
            if (this.orderedEvolutionTree[evolutionData.species.name]) {
                return this.orderedEvolutionTree[evolutionData.species.name];
            } else {
                let evolutionChain = await this._buildEvolutionChainHelp(evolutionData, 0);
                this.orderedEvolutionTree[evolutionData.species.name] = evolutionChain;
                return evolutionChain;
            }
        } catch (err) {
            return err;
        }
    }

    async _buildEvolutionChainHelp(evolution, order) {
        try {
            let evolutionChain = [];
            let evolutionObject = await this._buildSpriteObject(evolution.species.name, order, evolution.evolution_details);
            evolutionChain.push(evolutionObject);
            if (evolution.evolves_to.length === 0) {
                return evolutionChain;
            } else {
                for (let subEvolution of evolution.evolves_to) {
                    let subEvolutionArr = await this._buildEvolutionChainHelp(subEvolution, order+1);
                    evolutionChain.push(... subEvolutionArr);
                }
                return evolutionChain;
            }
        } catch (err) {
            throw err;
        }
    }



    _getEvolutionTriggerConditional(evolutionDetails) {
        let keys = Object.keys(evolutionDetails);
        let triggerConditionalArr = [];
        for (let key of keys) {
            if (key === "trigger") {
                return triggerConditionalArr;
            } else if (evolutionDetails[key] !== null && evolutionDetails[key] !== false && evolutionDetails[key] !== "") {
                triggerConditionalArr.push({
                    conditional: key,
                    requirement: (typeof evolutionDetails[key] !== "object") ? evolutionDetails[key] : evolutionDetails[key].name
                });
            }
        }
        return null;
    }

    async _buildSpriteObject(species, order, evolutionDetails) {
        let sprite = await this.getSpriteUrl(species);
        if (evolutionDetails.length === 0) {
            return ({
                name: species,
                trigger: null,
                triggerConditional: null,
                sprite: sprite,
                order: order
            });
        } else {
            let trigger = evolutionDetails[0].trigger.name;
            let triggerConditional = this._getEvolutionTriggerConditional(evolutionDetails[0]);
            return ({
                name: species,
                trigger: trigger,
                triggerConditional: triggerConditional,
                sprite: sprite,
                order: order
            });
        }
    }
}