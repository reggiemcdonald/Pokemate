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
import PromiseInterrupt from "../library/errors/PromiseInterrupt";


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
                this.props.handleSpritePress : this._defaultHandleSpritePress,
        };
    }

    render() {
        return(
           this._renderEvolutionChain(this.state.evolutionChain)
        )
    }

    /**
     * Makes the async call to get the ordered evolution chain
     * @returns {Promise<void>}
     */
    async componentDidMount(): void {
        try {
            let evolutionChain = await this.state.dataManager.buildEvolutionChain(this.state.data);
            this.setState({
                evolutionChain: evolutionChain
            });
        } catch (err) {
            if (!(err instanceof PromiseInterrupt)) {
                throw err;
            }
        }
    }

    _defaultHandleSpritePress(sprite) {
        alert("You pressed a sprite in the evolution chain");
    }

    componentWillUnmount(): void {
        this.state.dataManager.cancelPromise();
    }


    /**
     * Given an array of spriteObjects [{name: string, url: string}],
     * render them in a stack and return this stack
     * @param sprite
     * sprite: {
     *     name: string,
     *     trigger: string,
     *     triggerConditional: [
     *      {
     *         conditional: string,
     *         requirement: any
     *      }
     *     ],
     *     sprite: string,
     *     order: number
     * }
     * @private
     */
    _renderSprite(sprite) {
        let spriteName = this._formatSpriteName(sprite.name);
        if (sprite.trigger === null) {
            return (
                <View key={sprite.name} style={{alignItems: "center", justifyContent: "center", textAlign: "center",height:100}}>
                    <TouchableOpacity onPress={() => this.state.handleSpritePress(sprite.name)}>
                        <Image source={{uri: sprite.sprite}} style={{width: 80, height: 60}}/>
                    </TouchableOpacity>
                    <Text>{spriteName}</Text>
                </View>
            );
        } else {
            let trigger = this._formatTrigger(sprite.trigger);
            let requirement = this._formatTriggerReq(sprite.triggerConditional);
            return(
                <View key={sprite.name} style={styles.evolutionChainItemWithArrow}>
                    <View style={{alignItems: "center", justifyContent: "center", height: 100}}>
                        <Text style={[styles.evolutionChainArrowText, {textAlign: "center"}]}>{requirement}</Text>
                        <Ionicons name={"ios-arrow-round-forward"} size={25} tintcolor={"grey"}/>
                        <Text style={styles.evolutionChainArrowText}>{trigger}</Text>
                    </View>
                    <View style={{alignItems: "center", justifyContent: "center", textAlign: "center", height: 100}}>
                        <TouchableOpacity onPress={() => this.state.handleSpritePress(sprite.name)}>
                            <Image source={{uri: sprite.sprite}} style={{width: 80, height: 60}}/>
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
        if (triggerConditional.length === 0) {
            return "";
        } else {
            let conditionals = triggerConditional.map((value) => {
                return this._formatTriggerConditional(value.conditional) + " " +
                    this._formatTriggerConditionalRequirement(value.requirement);
            });
            return conditionals.join("\n");
        }

    }

    _formatTriggerConditional(triggerConditional) {
        if (triggerConditionalFormattingKey.hasOwnProperty(triggerConditional)) {
            return triggerConditionalFormattingKey[triggerConditional];
        } else {
            return triggerConditional.replace(/_/g, " ");
        }
    }

    _formatTriggerConditionalRequirement(triggerConditionalRequirement) {
        if (triggerConditionalRequirement === null) {return ""}
        else {
            triggerConditionalRequirement = triggerConditionalRequirement+"";
            return triggerConditionalRequirement.replace(/-/g, " ");
        }
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
                <View style={styles.evolutionChain}>
                    <View style={[styles.evolutionChainTextView, styles.defenseStatTextView]}>
                        <Text style={styles.defenseStatText}>Evolution Chain</Text>
                    </View>
                    <ActivityIndicator size={"small"}/>
                </View>
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

const triggerConditionalFormattingKey = {
    gender: "Gender",
    held_item: "Holding",
    item: "",
    known_move: "Learn Move",
    known_move_type: "Learn Move of Type",
    location: "Location",
    min_affection: "Affection",
    min_beauty: "Beauty",
    min_happiness: "Happiness",
    min_level: "Level",
    needs_overworld_rain: "Raining",
    party_species: "Species in Party",
    party_type: "Type in Party",
    relative_physical_stats: "Relative Physical Stats",
    time_of_day: "During",
    trade_species: ""
};