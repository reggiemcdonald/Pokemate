import React from "react";
import {
    Text,
    TouchableOpacity,
    View
} from "react-native";
import styles from "../library/styles";
/**
 * **************************
 * A Touchable Pokemon Aspect
 * **************************
 * Represents some aspect of a Pokemon that responds to a users touch
 * Visually, the component is a coloured rectangle with the specified text
 */
export default class TouchableAspect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.dataSource.data,
            style: this.getStyle(props.dataSource.data)
        }
    }

    /**
     * Respond to a change in the source of data in the
     * component
     */
    handleChange() {
        // TODO: Implement
        alert("A change has been made");
    }

    /**
     * Subscribe to changes in the data of the instantiating component
     */
    subscribeToChanges() {
        this.props.dataSource.subscribeToChanges(this.handleChange());
    }

    /**
     * Generates the name of the component
     * @returns {*}
     */
    getAspectName() {
        if (this.state.data.hasOwnProperty("aspectName")) {
            return this.state.data.aspectName;
        } else {
            return "Aspect Name"
        }
    }

    /**
     * Generates the style for the component given the data component of dataSource
     * @returns {*}
     */
    getStyle(data) {
        if (data.hasOwnProperty("style")) {
            return data.style;
        } else {
            return styles.defaultTouchableAspectColor;
        }
    }


    render() {
        return(
            <View style={[this.state.style, styles.touchableAspect]}>
                <Text style={styles.touchableAspectText} onPress={()=> this.props.handlePress(this.getAspectName())}>{this.getAspectName()}</Text>
            </View>
        )
    }
}