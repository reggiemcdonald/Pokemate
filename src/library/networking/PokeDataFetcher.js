import Pokedex from "pokedex-promise-v2";

export default class PokeDataFetcher {
    constructor() {
        this.p = new Pokedex();
    }
     getFullPokemonStats(name) {
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
}