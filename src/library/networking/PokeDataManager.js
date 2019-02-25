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
            this.pokeData = existingData.pokeData;
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
     getPokemonDetails(name) {
        let that = this;
        return new Promise( async function(resolve, reject) {
            try {
                if (that.pokeData.hasOwnProperty(name)) {
                    resolve(that.pokeData[name]);
                } else {
                    let pokemon = await that.processor.formDefaultSpeciesData(name);
                    that.pokeData[name] = pokemon;
                    resolve(pokemon);
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Returns the list of pokemon species
     * @returns {Promise<any> | Promise<*>}
     */
    getListOfPokemon() {
         let that = this;
         return new Promise(async function (resolve, reject) {
             try {
                 let pokemonList = await that.processor.getListOfPokemon();
                 return resolve(pokemonList);
             } catch (err) {
                 return reject(err);
             }
         });
    }

    getSpriteUrl(name) {
        let that = this;
        return new Promise(async function (resolve, reject) {
            try {
                if (that.pokeData.hasOwnProperty(name)) {
                    return resolve(that.pokeData[name].sprite);
                }
                let url = await that.processor.getSpriteUrl(name);
                return resolve(url);
            } catch (err) {
                // TODO: make this return a default image instead
                throw reject(err);
            }
        })
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
        let that = this;
        return new Promise(async function (resolve, reject) {
            try {
                let evolutionChain = await that._buildEvolutionChainHelp(evolutionData, 0);
                // TODO: Add to data structure
                resolve(evolutionChain);
            } catch (err) {
                // TODO: Error Messages and Handling
                reject(new Error("There was an error completing this request"))
            }
        });
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