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
        let pokemonName = this._getName(data);
        let id = this._getId(data);
        let sprite = this._getSprite(data);
        let types = this._getTypes(data);
        let damageRelations = await this._getDamageRelations(types);
        return {
            name: name,
            id: id,
            types: types,
            sprite: sprite,
            strengths: damageRelations.strengths,
            weaknesses: damageRelations.weaknesses,
            noEffect: damageRelations.noEffect
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
        let damageRelations = {
            strengths: [],
            weaknesses: [],
            noEffect: []
        };
        for (type of types) {
            let typeData = await this.fetcher.getTypeData(type);
            let doubleDamageTo = typeData.damage_relations.double_damage_to.map((value) => {
                return value.name
            });
            let halfDamageTo = typeData.damage_relations.half_damage_to.map((value) => {
                return value.name;
            });
            let noDamageTo = typeData.damage_relations.no_damage_to.map((value) => {
                return value.name;
            });
            doubleDamageTo.forEach((value) => {
                if (!damageRelations.strengths.includes(value)) {
                    damageRelations.strengths.push(value);
                }
            });
            halfDamageTo.forEach((value) => {
                if (!damageRelations.weaknesses.includes(value)) {
                    damageRelations.weaknesses.push(value);
                }
            });
            noDamageTo.forEach((value) => {
                if (!damageRelations.noEffect.includes(value)) {
                    damageRelations.noEffect.push(value);
                }
            });
        }
        return damageRelations;
    }

}