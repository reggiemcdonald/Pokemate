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
 *
 */
export default class TypeContainer extends React.Component  {
    render() {
        if (this.props.types.length === 2) {
            return(
                <View style={linearBox.linear}>
                    <TouchableType dataSource={{
                        data: {
                            type: this.props.types[0]
                        }
                    }}/>
                    <TouchableType dataSource={{
                        data :{
                            type: this.props.types[1]
                        }
                    }}
                    />
                </View>
            );
        } else {
            return(
                <View style={linearBox.linear}>
                    <TouchableType dataSource = {{
                        data: {
                            type: this.props.types[0]
                        }
                    }}/>
                </View>
            )
        }
    }
}

const linearBox = StyleSheet.create({
    linear: {
        flexDirection: "row",
    }
})