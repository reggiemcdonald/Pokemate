/**
 * ***********************
 * A data management class
 * ***********************
 */
import PokeDataProcessor from "./PokeDataProcessor";

export default class PokeDataManager {
    constructor(existingData?) {
        this.processor = new PokeDataProcessor();
        this.pokemonData = {};
        this.evolutionData = {};
        // Restore existing data if there is any
        if (existingData) {
            this.pokemonData = existingData.pokemonData;
            this.evolutionData = existingData.evolutionData;
        }
    }
}