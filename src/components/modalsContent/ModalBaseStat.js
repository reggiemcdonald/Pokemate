import React from "react";
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import {StatNameFormats} from "../../library/StringResources";
import InvalidValue from "../../library/errors/InvalidValue";

/**
 * **************************
 * Base Stat Modal Component
 * *************************
 * Displays base stat information
 * Consumes a prop of PokeDataManager and a callback to subscribe to changes in the instantiating parent
 */
export default class ModalBaseStat extends React.Component {

    /**
     * Render the component
     **/
    render() {
        if (this.props.data === undefined) {
            return(
                <View style={modalStyleSheet}>
                    <TouchableOpacity onPress={this.props.closeFunction}>
                        <Text style={{textAlign: "center"}}>Close</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            let positivelyAffectingMovesTitle = "Moves: Positive";
            const negativelyAffectingMovesTitle = "Moves: Negative";
            const positivelyAffectingNaturesTitle = "Natures: Positive";
            const negativelyAffectingNaturesTitle = "Natures: Negative";
            return (
                <View>
                    <View style={modalStyleSheet.modalTitleBar}>
                        <Text testID={"testIdName"}
                              style={[modalStyleSheet.modalTitleText, modalStyleSheet.textGreedy]}>
                            {StatNameFormats[this.props.data.name]}
                        </Text>
                        <TouchableOpacity onPress={this.props.closeFunction}>
                            <Text style={modalStyleSheet.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={modalStyleSheet.modalViewContainer}>
                        <View style={{flexDirection: "row", alignItems: "flex-start"}}>
                            {this._renderFlatList(this.props.data.affectingMoves.positive,
                                "testIdMovesPositive,", positivelyAffectingMovesTitle)}
                            {this._renderFlatList(this.props.data.affectingMoves.negative,
                            "testIdMovesNegative", negativelyAffectingMovesTitle)}
                        </View>
                        <View style={{flexDirection: "row", alignItems: "flex-start"}}>
                            {this._renderFlatList(this.props.data.affectingNatures.positive,
                            "testIdNaturesPositive", positivelyAffectingNaturesTitle)}
                            {this._renderFlatList(this.props.data.affectingNatures.negative,
                            "testIdNaturesNegative", negativelyAffectingNaturesTitle)}
                        </View>
                        {/*TODO: Must add affecting characteristics*/}
                    </ScrollView>
                </View>
            );
        }
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

    /**
     * Renders a flat list with the given data and title
     * @param data: [{name: string, change?: string}], the data to be inserted into the flat list
     * @param testingId: string, the ID for testing purposes
     * @param title: string, The title to be given to this flat list
     * @private
     */
    _renderFlatList(data, testingId, title) {
        return (
            <View style={modalStyleSheet.flatListContainer}>
                <Text style={modalStyleSheet.flatListTitleText}>
                    {title}
                </Text>
                <FlatList
                    testId={testingId}
                    data={data}
                    renderItem={({item,index}) => this._renderFlatListItem(item,index)}
                    keyExtractor={(item,index)=>(item.name)}
                    style={modalStyleSheet.modalBaseStatFlatList}
                />
            </View>
        )
    }

    /**
     * Renders an item for the flat lists of this component
     * @param item
     * @returns {*}
     * @private
     */
    _renderFlatListItem(item, index) {
        if (item.hasOwnProperty("change")) {
            return (
                <View style={[modalStyleSheet.flatListTextContainer, {backgroundColor: flatListColors[index % 2]}]}>
                    <Text style={[modalStyleSheet.textGreedy, modalStyleSheet.flatListText]}>{item.name}</Text>
                    <Text style={modalStyleSheet.flatListText}>{item.change}</Text>
                </View>
            );
        } else {
            return (
                <View style={[
                    modalStyleSheet.flatListTextContainer,
                    {backgroundColor: flatListColors[index % 2]}
                ]}>
                    <Text style={modalStyleSheet.flatListText}>{item.name}</Text>
                </View>
            );
        }

    }
}

const modalStyleSheet = StyleSheet.create({
    modalViewContainer: {
        padding: 5,
    },
    modalTitleBar: {
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 30,
        flexDirection: "row",
        alignItems: "flex-start",
        borderStyle: "solid",
        borderBottomColor: "#929292",
        borderBottomWidth: 1,
    },
    modalTitleText: {
        fontSize: 23,
        fontWeight: "bold",
    },
    flatListContainer: {
        flex:1,
        marginLeft: 5,
        marginRight: 5,
    },
    flatListTitleText: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5
    },
    modalBaseStatFlatList: {
        maxHeight: 300,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
    },
    flatListTextContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    flatListText: {
        fontSize: 16,
        margin: 5
    },
    textGreedy: {
        flex: 1,
    },
    closeButton: {
        fontSize: 18,
        color: "#007aff"
    }
});

const flatListColors = [
    "transparent",
    "#e6f2ff",
];