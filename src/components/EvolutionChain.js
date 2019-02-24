import React from "react";
import {
    View,
    Image,
    Text,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity

} from "react-native"
import styles from "../library/styles"
import Ionicons from "react-native-vector-icons/Ionicons"


/**
 * *************************
 * Touchable Evolution Chain
 * *************************
 * A React Component that can be used to display the evolution for a pokemon
 * as specified in the props, using ONLY the default pokemon from the species lineage
 * Components in this component should be touchable. Details on each pokemon should be
 * accessible from the component.
 * TODO: Put styles into style sheet. Add exception handling
 */

export default class EvolutionChain extends React.Component {
    // TODO: implement
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            dataManager: props.dataManager,
            evolutionChain: [],
            handleSpritePress: this.props.handleSpritePress ?
                this.props.handleSpritePress : this._defaultHandleSpritePress
        }
    }

    render() {
        return(
           <View>
               {this._renderEvolutionChain(this.state.evolutionChain)}
           </View>
        )
    }

    async componentDidMount(): void {
        let evolutionChain = await this._buildEvolutionChain(this.state.data);
        this.setState({
            evolutionChain: evolutionChain
        });
    }

    _defaultHandleSpritePress(sprite) {
        alert("You pressed a sprite in the evolution chain");
    }

    /**
     * Generate an array of evolution objects
     * [{
     *     trigger: string,
     *     triggerConditional: string,
     *     spriteArray: {}
     * }]
     * @param data
     * @private
     */
    async _buildEvolutionChain(evolutionData) {
        try {
            let evolutionChain = await this._buildEvolutionChainHelp(evolutionData, 0);
            return evolutionChain;
        } catch (err) {
            throw err;
            // TODO tidy this up
        }
    }

    async _buildEvolutionChainHelp(evolution, order) {
        try {
            let evolutionChain = [];
            let evolutionObject = await this._buildSpriteObject(evolution.species.name, order, evolution.evolution_details);
            evolutionChain.push(evolutionObject);
            if (evolution.evolves_to.length === 0) {
                return evolutionChain;
            } else {
                for (let subEvolution of evolution.evolves_to) {
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
        for (let key of keys) {
            if (key === "trigger") {
                return null;
            } else if (evolutionDetails[key] !== null && evolutionDetails[key] !== false) {
                return {
                    conditional: key,
                    requirement: (typeof evolutionDetails[key] !== "object") ? evolutionDetails[key] : evolutionDetails[key].name
                };
            }
        }
        return null;
    }

    async _buildSpriteObject(species, order, evolutionDetails) {
        let sprite = await this.state.dataManager.getSpriteUrl(species);
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
    }


    /**
     * Given an array of spriteObjects [{name: string, url: string}],
     * render them in a stack and return this stack
     * @param sprite
     * sprite: {
     *     name: string,
     *     trigger: string,
     *     triggerConditional: {
     *         conditional: string,
     *         requirement: any
     *     },
     *     sprite: string,
     *     order: number
     * }
     * @private
     */
    _renderSprite(sprite) {
        let spriteName = this._formatSpriteName(sprite.name);
        if (sprite.trigger === null) {
            return (
                <View key={sprite.name} style={{alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                    <TouchableOpacity onPress={() => this.state.handleSpritePress(sprite.name)}>
                        <Image source={{uri: sprite.sprite}} style={{width: 80, height: 90}}/>
                    </TouchableOpacity>
                    <Text>{spriteName}</Text>
                </View>
            );
        } else {
            let trigger = this._formatTrigger(sprite.trigger);
            let requirement = this._formatTriggerReq(sprite.triggerConditional);
            return(
                <View key={sprite.name} style={{flexDirection: 'row', alignItems: "flex-start", backgroundColor: "transparent"}}>
                    <View style={{alignItems: "center", justifyContent: "center", height: 100}}>
                        <Text>{requirement}</Text>
                        <Ionicons name={"ios-arrow-round-forward"} size={25} tintcolor={"grey"}/>
                        <Text>{trigger}</Text>
                    </View>
                    <View style={{alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                        <TouchableOpacity onPress={() => this.state.handleSpritePress(sprite.name)}>
                            <Image source={{uri: sprite.sprite}} style={{width: 80, height: 90}}/>
                        </TouchableOpacity>
                        <Text>{spriteName}</Text>
                    </View>
                </View>
            )
        }
    }

    _formatSpriteName(name) {
        return name.charAt(0).toUpperCase()+name.substr(1);
    }

    _formatTrigger(trigger) {
        let i = trigger.indexOf("-");
        if (i !== -1) {
            let firstWord = trigger.substr(0,i-1).charAt(0).toUpperCase()+trigger.substr(1,i-1);
            let secondWord;
            if (trigger.length-1 > i+2) {
                secondWord = trigger.charAt(i + 1).toUpperCase() + trigger.substr(i + 2);
            } else {
                secondWord = trigger.substr(i+1);
            }
            return firstWord+" "+secondWord;
        } else {
            return trigger.charAt(0).toUpperCase()+trigger.substr(1);
        }
    }

    _formatTriggerReq(triggerConditional) {
        return triggerConditional.requirement;
    }

    _renderOrderOfEvolutionChain(evolutionChain, order) {
        let includedInRender = evolutionChain.filter((value) => {
            return value.order === order;
        });
        if (includedInRender.length === 0) {
            return(
                null
            );
        } else {
            return (
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    {includedInRender.map((value) => {
                        return this._renderSprite(value)
                    })}
                </View>
            )
        }
    }

    _renderEvolutionChain(evolutionChain) {
        if (evolutionChain.length === 0) {
            return(
                <ActivityIndicator size={"large"}/>
            )
        }
        const range = [];
        evolutionChain.forEach((value) => {
            if (!range.includes(value.order)) {
                range.push(value.order);
            }
        });
        return (
            <View style={styles.evolutionChain}>
                <View style={[styles.evolutionChainTextView, styles.defenseStatTextView]}>
                    <Text style={styles.defenseStatText}>Evolution Chain</Text>
                </View>
                <ScrollView horizontal={true} style={styles.evolutionChainScrollView}>
                    {this._renderOrderOfEvolutionChain(evolutionChain,0)}
                    {this._renderOrderOfEvolutionChain(evolutionChain, 1)}
                    {this._renderOrderOfEvolutionChain(evolutionChain, 2)}
                    {this._renderOrderOfEvolutionChain(evolutionChain, 3)}
                </ScrollView>
            </View>
        );
    }
}