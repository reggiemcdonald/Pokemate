import React from "react";
import {
    View,
    Text,
    ScrollView,
    FlatList,
} from "react-native";
import {StatNameFormats} from "../../library/StringResources";
import InvalidValue from "../../library/errors/InvalidValue";

/**
 * **************************
 * Base Stat Modal Component
 * *************************
 * Displays base stat information
 * Consumes a prop of base stats
 */
export default class ModalBaseStat extends React.Component {

    render() {
        this._validateData();
        return(<View>
            <Text testID={"testIdName"}>{StatNameFormats[this.props.data.name]}</Text>
        </View>);
    }

    /**
     * Returns true when the component data is intact, and
     * throws InvalidValue when it is not
     * @private
     */
    _validateData()  {
        try {
            this._validateBaseStat();
            this._validateAffectingElements(this.props.data.affectingMoves);
            this._validateAffectingElements(this.props.data.affectingNatures);
            this._validateAffectingCharacteristics();
        } catch (err) {
            throw err;
        }
    }

    /**
     * Returns true if the base stat is valid
     * @private
     */
    _validateBaseStat() {
        if (this.props.data.name === undefined || !StatNameFormats.hasOwnProperty(this.props.data.name)) {
            throw new InvalidValue(this.props.data.name);
        } else {
            return true;
        }
    }

    /**
     * Returns true if the given elements is {
     *     postiive: object[],
     *     negative: object[]
     * }
     * with each object in the object[] consisting of {
     *     name: {string},
     *     change?: {number}
     * }
     * Otherwise throws InvalidValue
     * @param elements
     * @returns {boolean}
     * @private
     */
    _validateAffectingElements(elements) {
        if (elements === undefined) {
            throw new InvalidValue(elements);
        }
        for (let element of elements.positive) {
            if (!element.hasOwnProperty("name") || typeof element.name !== "string") {
                // TODO: Update error messages
                throw new InvalidValue("Bad value given in affecting elements of a base stat");
            }
            if (element.hasOwnProperty("change") && typeof element.change !== "number") {
                throw new InvalidValue("Bad value given in affecting elements of a base stat");
            }
        }
        for (let element of elements.negative) {
            if (!element.hasOwnProperty("name") || typeof element.name !== "string") {
                // TODO: Update error messages
                throw new InvalidValue("Bad value given in affecting elements of a base stat");
            }
            if (element.hasOwnProperty("change") && typeof element.change !== "number") {
                throw new InvalidValue("Bad value given in affecting elements of a base stat");
            }
        }
        return true;
    }

    /**
     * Returns true if the affecting characteristics array is defined in the props
     * and is of type {string[]}
     * @private
     */
    _validateAffectingCharacteristics() {
        if (this.props.data.characteristics === undefined) {
            throw new InvalidValue(this.props.data.characteristics);
        }
        for (let characteristic of this.props.data.characteristics) {
            if (typeof characteristic !== "string") {
                // TODO: Update error messages
                throw new InvalidValue("value given as a base stat affecting characteristic");
            }
        }
    }

}