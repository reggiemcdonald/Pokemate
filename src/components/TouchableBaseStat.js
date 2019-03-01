import React from "react";
import {StatNameFormats} from "../library/StringResources";
import InvalidValue from "../library/errors/InvalidValue";
import TouchableAspect from "./TouchableAspect";
import {StatColor} from "../library/styles";

/**
 * ******************
 * TouchableBaseStat
 * ******************
 * A touchable for Base Pokemon stats
 * prop = {
 *     statName: string
 *     handleTouch {optional}
 * }
 */
export default class TouchableBaseStat extends React.Component {
    constructor(props) {
        super(props);
        this._validateProp();
        this.state = {
            handleTouch: this.props.handleTouch ? this.props.handleTouch : this.defaultHandleTouch,
            style: this._generateStyle()
        }
    }

    /**
     * Default behaviour for the touch handler
     * @param stat
     */
    defaultHandleTouch(stat) {
        // TODO: Implement
        alert("You touched "+stat);
    }

    /**
     * Returns true if the given base stat is a valid base stat
     * @returns {boolean}
     */
    _validateProp() {
        if (!StatNameFormats.hasOwnProperty(this.props.statName)) {
            throw new InvalidValue(this.props.statName+ " is not a valid Pokemon Base Stat");
        } else {
            return true;
        }
    }

    /**
     * Produces the color for the particular stat
     * @returns {*}
     * @private
     */
    _generateStyle() {
        return StatColor[this.props.statName];
    }

    render() {
        return(
            <TouchableAspect
                dataSource={{
                    data: {
                        aspectName: StatNameFormats[this.props.statName],
                        style: this.state.style
                    }
                }}
                handlePress={this.defaultHandleTouch.bind(this)}
            />
        )
    }
}