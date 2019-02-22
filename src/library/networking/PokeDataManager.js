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
                    return resolve(that.pokeData[name]);
                } else {
                    let pokemon = await that.processor.formDefaultSpeciesData(name);
                    that.pokeData[name] = pokemon;
                    return resolve(pokemon);
                }
            } catch (err) {
                return reject(err);
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
}