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
     * Returns the type data for the given type by name
     */
    getTypeData(type) {
        let that = this;
        return new Promise(async function (resolve, reject) {
            let result;
            try {
                result = await that.p.getTypeByName(type);
                return resolve(result);
            } catch (err) {
                return reject(err);
            }
        });
    }

}