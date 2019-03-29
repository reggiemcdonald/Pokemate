import React from "react";
import {
    View,
    StyleSheet
} from "react-native";
import TouchableType from "./TouchableType";


/**
 * *******************************
 * A Container Component For Types
 * *******************************
 * Passed an array of types as props
 * Used to display the types of the pokemon
 *
 */
export default class TypeContainer extends React.Component  {
    constructor (props) {
        super (props);
        this.state = {
            types: this.props ? this.props.types : []
        }
    }
    render() {
        if (this.state.types.length === 2) {
            return (
                <View style={linearBox.linear}>
                    <TouchableType dataSource={{
                        data: {
                            type: this.state.types[0]
                        }
                    }}/>
                    <TouchableType dataSource={{
                        data: {
                            type: this.state.types[1]
                        }
                    }}
                    />
                </View>
            );
        } else if (this.state.types.length === 1) {
            return (
                <View style={linearBox.linear}>
                    <TouchableType dataSource={{
                        data: {
                            type: this.state.types[0]
                        }
                    }}/>
                </View>
            )
        } else {
            return (null);
        }
    }
}

const linearBox = StyleSheet.create({
    linear: {
        flexDirection: "row",
        backgroundColor: "transparent"
    }
});