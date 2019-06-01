/**
 * A DDL for the Pokemate realm DB
 */

/**
 * Holds the information related to the pokemon
 * @type {{name: string, properties: {types: string, name: string, sprite: string, id: string}, primaryKey: string}}
 */
export const PokemonSchema = {
    name: 'Pokemon',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        sprite: 'string',
        types: 'Type[]'
    }
};

/**
 * Holds Base Stat information
 * @type {{name: string, properties: {name: string, pid: string, value: string}, primaryKey: (function(): string)}}
 */
export const BaseStatSchema = {
    name: "BaseStat",
    properties: {
        name: 'string',
        pid: 'int',
        value: 'int',
    }
};
// BaseStatSchema.primaryKey = function() {
//     return this.properties.name + this.properties.pid;
// };

/**
 * Holds related varieties that are apart of a single species
 * @type {{name: string, properties: {defaultPid: string, varietyName: string}, primaryKey: string}}
 */
export const VarietySchema = {
    name: "Variety",
    primaryKey: 'defaultPid',
    properties: {
        varietyName: 'string',
        defaultPid: 'int'
    }
};

/**
 * Holds the pokemon types
 * @type {{name: string, properties: {typeName: string}, primaryKey: string}}
 */
export const TypeSchema = {
    name: "Type",
    primaryKey: "typeName",
    properties: {
        typeName: "string"
    }
};