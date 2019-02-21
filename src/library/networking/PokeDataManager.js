/**
 * ***********************
 * A data management class
 * ***********************
 */
import PokeDataProcessor from "./PokeDataProcessor";

export default class PokeDataManager {
    constructor(existingData?) {
        this.processor = new PokeDataProcessor();
        this.pokemonList = {};
        this.pokemonData = {};
        this.evolutionData = {};
        // Restore existing data if there is any
        if (existingData) {
            this.pokemonList = existingData.pokemonList;
            this.pokemonData = existingData.pokemonData;
            this.evolutionData = existingData.evolutionData;
        }
    }

    async getPokemonDetails(name) {
        if (this.pokemonData.hasOwnProperty(name)) {
            return this.pokemonData[name];
        } else {
            let pokemon = await this.processor.formDefaultSpeciesData(name);
            this.pokemonData[name] = pokemon;
            return pokemon;
        }
    }

    async getEvolutionChain(name) {
        // TODO: Implement evolution chain
        return {};
    }
}