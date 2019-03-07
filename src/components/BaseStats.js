import React from "react";
import BaseStatBar from "./BaseStatBar";
import {
    View,
    Text,
    Modal
} from "react-native";
import styles from "../library/styles";
import ErrorBoundary from "./ErrorBoundary";
import ModalBaseStat from "./modalsContent/ModalBaseStat";
import {StatNameFormats} from "../library/StringResources";
import InvalidValue from "../library/errors/InvalidValue";
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
 *     },
 * }
 */
export default class BaseStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            baseStatData: {}
        }
        this.updateBaseStatModal = undefined;
    }
    /**
     * Renders a single stat
     * @param stat
     * @returns {*}
     * @private
     */
    _renderStat(stat) {
        return(
            <BaseStatBar handleTouch={this.handlePressOnStatName.bind(this)} statName={stat.stat.name} statValue={stat.base_stat}/>
        )
    }


    render() {
       return(
           <ErrorBoundary>
               <Modal visible={this.state.modalVisible}
                      animationType={"slide"}
               >
                   <ModalBaseStat data={this.state.baseStatData}
                                  closeFunction={this.closeModal.bind(this)}
                   />
               </Modal>
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

    handlePressOnStatName(statName) {
        let keys = Object.keys(StatNameFormats);
        let notProcessedStatName;
        for (let key of keys) {
            if (StatNameFormats[key].toLowerCase() === statName.toLowerCase()) {
                notProcessedStatName = key;
            }
        }
        if (notProcessedStatName === undefined) {
            throw new InvalidValue(statName+" is not a valid base stat");
        } else if (this.updateBaseStatModal !== undefined) {
            this.updateBaseStatModal(notProcessedStatName);
            this.setState({
                modalVisible: true,
                baseStatData: this.props.processor.getBaseStat(notProcessedStatName)
            });
        } else {
            this.setState({
                modalVisible: true,
                baseStatData: this.props.processor.getBaseStat(notProcessedStatName)
            });
        }
    }

    subscribeToChanges(modalCallback) {
        this.updateBaseStatModal = modalCallback;
        console.log("Changes subscribed to");
    }

    closeModal() {
        this.setState({
            modalVisible: false
        });
    }

}