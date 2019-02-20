import Pokedex from "pokedex-promise-v2";

/**
 * Class that fetches pokemon data and to handle all Pokedex activity
 * Do this to take advantage of Pokedex caching behaviour
 */
export default class PokeDataFetcher {
    constructor() {
        this.p = new Pokedex();
    }

    /**
     * Returns the full set of data for the given pokemon name
     * or its api id
     * @param name
     * @returns {Promise<any> | Promise<*>}
     */
     getAllPokemonStats(name) {
        return new Promise((resolve, reject) => {
            this.p.getPokemonByName(name)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
     }

    /**
     * Returns type data for the specified type
     * @param type: type to get data for
     * @returns {Promise<any> | Promise<*>}
     */
    getTypeData(type) {
        let that = this;
        return new Promise(async function (resolve, reject) {
            try {
                let result = await that.p.getTypeByName(type);
                return resolve(result);
            } catch (err) {
                return reject(err);
            }
        });
    }

    /**
     * Returns list of pokemon
     * @returns {Promise<any> | Promise<*>}
     */
    getListOfPokemon() {
        let that = this;
        return new Promise(async function (resolve, reject) {
            try {
                let result = await that.p.getPokemonsList();
                return resolve(result);
            } catch (err) {
                return reject(err);
            }
        });
    }

    /**
     * Make call to specified api endpoint
     * @param endpoint
     * @returns {Promise<any> | Promise<*>}
     */
    getAtEnd(endpoint) {
        let that = this;
        return new Promise(async function (resolve, reject) {
            try {
                let result = await that.p.resource(endpoint);
                return resolve(result);
            } catch (err) {
                return reject(err);
            }
        })
    }

}