import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import {
    View,
    ProgressViewIOS,
    Text
} from "react-native";
import styles, {BaseStatBarLow, BaseStatBarMed, BaseStatBarHigh} from "../library/styles";
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
        this.state = {
            statStyle: this._getStyle()
        }
    }

    // TODO: add the progress bar
    render() {
        return (
            <View>
                <Text>{this.props.statName}</Text>
                {this._renderProgressBar()}
            </View>
        );
    }

    _renderProgressBar() {
        if (this.props.statValue > 255) {
            throw new InvalidValue("Pokemon stat "+this.props.statValue);
        } else {
            const progress = this.props.statValue / MAX_STAT_VALUE;
            return(
                <ProgressViewIOS
                    progress={progress}
                    progressTintColor={this.state.statStyle.progressTint}
                    trackTintColor={this.state.statStyle.trackTint}
                />
            )
        }
    }

    /**
     * Returns the appropriate style according to the statValue
     * @private
     */
    _getStyle() {
        if (this.props.statValue <= 20) {
            return BaseStatBarLow;
        } else if (this.props.statValue > 20 && this.props.statValue < 40) {
            return BaseStatBarMed;
        } else {
            return BaseStatBarHigh;
        }
    }
}