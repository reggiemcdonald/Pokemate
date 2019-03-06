/**
 * ***********************
 * A data management class
 * ***********************
 */
import PokeDataProcessor from "./PokeDataProcessor";
import PromiseInterrupt from "../errors/PromiseInterrupt";

export default class PokeDataManager {
    constructor(existingData?) {
        // TODO
        this.promiseInterrupted = false;
        this.processor = new PokeDataProcessor();
        this.pokeData = {};
        this.orderedEvolutionTree = {};
        this.statData = {};
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
            this.pokeData = existingData.pokeData ? existingData.pokeData : {};
            this.orderedEvolutionTree = existingData.orderedEvolutionTree ? existingData.orderedEvolutionTree : {};
            this.statData = existingData.statData ? existingData.statData : {};
        }
    }

    /**
     * Creates a JSON serializable object to handoff data between instances of PokeDataManager
     * return {
     *     pokeData: this.pokeData
     *     orderedEvolutionTree: this.orderedEvolutionTree,
     *     statData: this.statData
     * }
     */
    createHandoff() {
        // TODO: implement the handoff
        return {
            pokeData: this.pokeData,
            orderedEvolutionTree: this.orderedEvolutionTree,
            statData: this.statData
        }
    }

    /**
     * Return the pokemon data if its already been generated
     * Otherwise, generate it, save it, and return it
     * @param name
     * @returns {Promise<any>}
     */
     async getPokemonDetails(name) {
        try {
            this.checkForCancellation();
            if (this.pokeData.hasOwnProperty(name)) {
                return this.pokeData[name];
            } else {
                this.checkForCancellation();
                let pokemon = await this.processor.formDefaultSpeciesData(name);
                this.pokeData[name] = pokemon;
                this.checkForCancellation();
                return pokemon;
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * Returns the list of pokemon species
     * @returns {Promise<any> | Promise<*>}
     */
    async getListOfPokemon() {
         try {
             this.checkForCancellation();
             let pokemonList = await this.processor.getListOfPokemon();
             return pokemonList;
         } catch (err) {
             return err;
         }
    }

    async getSpriteUrl(name) {
        try {
            this.checkForCancellation();
            if (this.pokeData.hasOwnProperty(name)) {
                return this.pokeData[name].sprite;
            }
            this.checkForCancellation();
            let url = await this.processor.getSpriteUrl(name);
            return url;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Generate an array of evolution objects
     * [{
     *     trigger: string,
     *     triggerConditional: string,
     *     spriteArray: {}
     * }]
     * @param data
     */
    async buildEvolutionChain(evolutionData) {
        try {
            this.checkForCancellation();
            if (this.orderedEvolutionTree[evolutionData.species.name]) {
                return this.orderedEvolutionTree[evolutionData.species.name];
            } else {
                this.checkForCancellation();
                let evolutionChain = await this._buildEvolutionChainHelp(evolutionData, 0);
                this.checkForCancellation();
                this.orderedEvolutionTree[evolutionData.species.name] = evolutionChain;
                return evolutionChain;
            }
        } catch (err) {
            throw err;
        }
    }

    async _buildEvolutionChainHelp(evolution, order) {
        try {
            let evolutionChain = [];
            this.checkForCancellation();
            let evolutionObject = await this._buildSpriteObject(evolution.species.name, order, evolution.evolution_details);
            evolutionChain.push(evolutionObject);
            if (evolution.evolves_to.length === 0) {
                return evolutionChain;
            } else {
                for (let subEvolution of evolution.evolves_to) {
                    this.checkForCancellation();
                    let subEvolutionArr = await this._buildEvolutionChainHelp(subEvolution, order+1);
                    evolutionChain.push(... subEvolutionArr);
                }
                return evolutionChain;
            }
        } catch (err) {
            throw err;
        }
    }



    _getEvolutionTriggerConditional(evolutionDetails) {
        let keys = Object.keys(evolutionDetails);
        let triggerConditionalArr = [];
        for (let key of keys) {
            if (key === "trigger") {
                return triggerConditionalArr;
            } else if (evolutionDetails[key] !== null && evolutionDetails[key] !== false && evolutionDetails[key] !== "") {
                triggerConditionalArr.push({
                    conditional: key,
                    requirement: (typeof evolutionDetails[key] !== "object") ? evolutionDetails[key] : evolutionDetails[key].name
                });
            }
        }
        return null;
    }

    async _buildSpriteObject(species, order, evolutionDetails) {
        try {
            this.checkForCancellation();
            let sprite = await this.getSpriteUrl(species);
            if (evolutionDetails.length === 0) {
                return ({
                    name: species,
                    trigger: null,
                    triggerConditional: null,
                    sprite: sprite,
                    order: order
                });
            } else {
                let trigger = evolutionDetails[0].trigger.name;
                let triggerConditional = this._getEvolutionTriggerConditional(evolutionDetails[0]);
                return ({
                    name: species,
                    trigger: trigger,
                    triggerConditional: triggerConditional,
                    sprite: sprite,
                    order: order
                });
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * Returns the information on the base stat statName
     * @param statName
     * @returns object
     * {
     *     affectingMoves: {moves},
     *     affectingNatures: {natures},
     *     characteristics: [characteristics],
     *     isBattleOnly: boolean
     * }
     */
    async getBaseStat(statName) {
        try {
            if (this.statData.hasOwnProperty(statName)) {
                this.checkForCancellation();
                return this.statData[statName];
            } else {
                this.checkForCancellation()
                let newStatData = await this.processor.getBaseStatData(statName);
                this.statData[statName] = newStatData;
                this.checkForCancellation();
                return newStatData;
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * returns true if no cancellation has been requested. Otherwise, triggers a cancellation with a PromiseInterrupt
     * @returns {boolean}
     */
    checkForCancellation() {
        if (this.promiseInterrupted) {
            this.promiseInterrupted = false;
            throw new PromiseInterrupt();
        }
        return true;
    }

    /**
     * Cancels the next promise execution
     */
    cancelPromise() {
        this.processor.cancelPromise();
        this.promiseInterrupted = true;
    }
}