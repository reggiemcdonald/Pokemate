import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import {
    View,
    ProgressViewIOS,
    Text
} from "react-native";
import styles, {
    StatColor,
    BaseStatBarLow,
    BaseStatBarMed,
    BaseStatBarHigh} from "../library/styles";
import InvalidValue from "../library/errors/InvalidValue";

const MAX_STAT_VALUE = 255;
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
            <View>
                <Text testID={"statName"}>{StatNameFormats[this.props.statName]}</Text>
                {this._renderProgressBar()}
                <Text testID={"statValue"}>{this.props.statValue.toString()}</Text>
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
            />
        )
    }

    /**
     * Returns the appropriate style according to the statValue
     * @private
     */
    _getStatBarStyle() {
        if (this.props.statValue <= 20) {
            return BaseStatBarLow;
        } else if (this.props.statValue > 20 && this.props.statValue < 40) {
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
        if (this.props.statValue < 1 || this.props.statValue > 255) {
            throw new InvalidValue(this.props.statValue+" is not a valid value for a Base Pokemon Stat");
        }
        return true;
    }
}

const StatNameFormats = {
    speed: "Speed",
    "special-defense": "Special Defense",
    "special-attack": "Special Attack",
    defense: "Defense",
    attack: "Attack",
    hp: "HP",
};