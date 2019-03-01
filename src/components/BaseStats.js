import React from "react";
import BaseStatBar from "./BaseStatBar";
import {
    View,
    Text,
} from "react-native";
import styles from "../library/styles";
import ErrorBoundary from "./ErrorBoundary";
/**
 * ******************
 * Base Pokemon Stats
 * ******************
 * Displays the base stats for the pokemon
 * **Pass the baseStats object in the pokedata**
 * props = {
 *     data: {
 *         hp: {stat},
 *         attack: {stat},
 *         defense: {stat},
 *         "special-attack": {stat},
 *         "special-defense": {stat},
 *         speed: {stat}
 *     }
 * },
 * stat = {
 *     base_stat: number,
 *     effort: number,
 *     stat:{
 *         name: string,
 *         url: string
 *     }
 * }
 */
export default class BaseStats extends React.Component {

    /**
     * Renders a single stat
     * @param stat
     * @returns {*}
     * @private
     */
    _renderStat(stat) {
        return(
            <BaseStatBar statName={stat.stat.name} statValue={stat.base_stat}/>
        )
    }


    render() {
       return(
           <ErrorBoundary>
               <View style={[styles.defenseStats, styles.baseStatsColor]}>
                   <View style={[styles.defenseStatTextView, styles.baseStatsTextView]}>
                       <Text style={styles.defenseStatText}>Base Stats</Text>
                   </View>
                   <View style={styles.baseStatsView}>
                   {this._renderStat(this.props.data.hp)}
                   {this._renderStat(this.props.data.attack)}
                   {this._renderStat(this.props.data.defense)}
                   {this._renderStat(this.props.data["special-attack"])}
                   {this._renderStat(this.props.data["special-defense"])}
                   {this._renderStat(this.props.data.speed)}
                   </View>
               </View>
           </ErrorBoundary>
       )
    }
}