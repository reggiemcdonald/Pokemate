import PokeDataFetcher from "./PokeDataFetcher";

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
     *  - Strong Against
     *  - Weak Against
     *  - Neutral Against
     *  - Evolutions
     */
    constructor() {
        this.fetcher = new PokeDataFetcher();
    }


    /**
     * Returns all the data needed for a pokemon component
     * @param name: name of pokemon to process
     */
    async processComponentData(name) {
        // TODO
        let data = await this.fetcher.getAllPokemonStats(name);
        return {
            name: this._getName(data),
            id: this._getId(data),
            types: this._getTypes(data),
            sprite: this._getSprite(data),
            strengths: this._getStrengths(data),
            weaknesses: this._getWeaknesses(data),
            noEffect: this_getNoEffect(data)
        };
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
        for (let type in data.types) {
            types.push(type.name);
        }
        return types;
    }

    /**
     * Get the sprite url for the selected pokemon
     * Default to
     * @private
     */
    _getSprite(data) {
        return ""
    }

    /**
     * Gets a list of the types that this pokemon is strong against
     */
    _getStrengths(data) {
        // TODO: Needs processing
        return [];
    }

    /**
     * Gets a list of the types that this pokemon is weak against
     */
    _getWeaknesses(data) {
        // TODO: Needs processing
        return [];
    }

    /**
     * Gets a list of the types that this pokemon type has no effect against
     */
    _getNoEffect(data) {
        // TODO: Needs processing
        return [];
    }

}