const Realm = require('realm');
import * as Schema from './Schema';

export default class DBRunner {
    constructor() {
        this.Realm = null;
    }

    async init() {
        try {
            this.Realm = await Realm.open({
                schema: [
                    Schema.BaseStatSchema,
                    Schema.VarietySchema,
                    Schema.TypeSchema,
                    Schema.PokemonSchema
                ]
            });
        } catch (e) {
            console.log(e); // TODO : add error handling
        }
    }

    insertPokemon (name, id, sprite, types) {
        try {
            this.Realm.write(() => {
                this.Realm.create('Pokemon', {
                    id: id,
                    name: name,
                    sprite: sprite,
                    types: types
                });
            })
        } catch (e) {
            console.log(e);
        }
    }

    insertBaseStat (name, pid, value) {
        try {
            this.Realm.write(() => {
                this.Realm.create('BaseStat', {
                    name: name,
                    pid: pid,
                    value: value
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    insertVariety (defaultPid, varietyName) {
        try {
            this.Realm.write(() => {
                this.Realm.create('Variety',{
                    defaultPid: defaultPid,
                    varietyName: varietyName
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    insertType (typeName) {
        try {
            this.Realm.write(() => {
                this.Realm.create('Type',{
                    typeName: typeName
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    deleteAll() {
        try {
            this.Realm.write(() => {
                this.Realm.deleteAll();
            })
        } catch (e) {
            console.log(e);
        }
    }

}