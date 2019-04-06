import React from "react";
import {StatNameFormats} from "../library/StringResources";
import {
    View,
    ProgressViewIOS,
    Text, StyleSheet
} from "react-native";
import styles, {
    StatColor,
    BaseStatBarLow,
    BaseStatBarMed,
    BaseStatBarHigh} from "../library/styles";
import InvalidValue from "../library/errors/InvalidValue";
import TouchableBaseStat from "./TouchableBaseStat";

const MAX_STAT_VALUE = 255;
const THRESHOLD_MED = 21;
const THRESHOLD_HIGH = 100;
/**
 * ********************
 * Base Stat Component
 * ********************
 *
 * A react component to display
 * a single base stat of a pokemon
 *
 * ************************************************************
 * As per https://bulbapedia.bulbagarden.net/wiki/Base_stats, Pokemon Base Stats can range from 1 to 255.
 * This component will express the base stat as a proportion of 255
 * props = {
 *     statName: string,
 *     statValue: number between 1 and 255,
 *     [handleChange - implement at a later date]
 * }
 */
export default class BaseStatBar extends React.Component {
    constructor(props) {
        super(props);
        this._validateProps();
        this.state = {
            statBarStyle: this._getStatBarStyle(),
            statTypeStyle: StatColor[this.props.statName]
        }
    }

    render() {
        return (
            <View style={styles.baseStatBar}>
                {/*<Text testID={"statName"} style={styles.baseStatBarText}>{StatNameFormats[this.props.statName]}</Text>*/}
                <TouchableBaseStat
                    statName={this.props.statName}
                    handleTouch = {this.props.handleTouch}
                />
                {this._renderProgressBar()}
                <Text testID={"statValue"} style={styles.baseStatBarText}>{this.props.statValue.toString()}</Text>
            </View>
        );
    }

    /**
     * Renders the progress bar for this
     * @returns {*}
     * @private
     */
    _renderProgressBar() {
        const progress = this.props.statValue / MAX_STAT_VALUE;
        return(
            <ProgressViewIOS
                progress={progress}
                progressTintColor={this.state.statBarStyle.progressTint}
                trackTintColor={this.state.statBarStyle.trackTint}
                style={styles.baseStatProgressIndicator}
            />
        )
    }

    /**
     * Returns the appropriate style according to the statValue
     * @private
     */
    _getStatBarStyle() {
        if (this.props.statValue <= THRESHOLD_MED) {
            return BaseStatBarLow;
        } else if (this.props.statValue > THRESHOLD_MED && this.props.statValue < THRESHOLD_HIGH) {
            return BaseStatBarMed;
        } else {
            return BaseStatBarHigh;
        }
    }

    /**
     * Checks to ensure that the stat name and value are valid
     * Throws an InvalidValue error if they are not
     * @returns {boolean}
     * @private
     */
    _validateProps() {
        if (!StatNameFormats.hasOwnProperty(this.props.statName)) {
            throw new InvalidValue(this.props.statName+" is not a valid Base Stat");
        }
        if (this.props.statValue < 1 || this.props.statValue > MAX_STAT_VALUE) {
            throw new InvalidValue(this.props.statValue+" is not a valid value for a Base Pokemon Stat");
        }
        return true;
    }
}


