import React from "react";
import {
    Text,
    TouchableOpacity,
    View
} from "react-native";
/**
 * **************************
 * A Touchable Pokemon Aspect
 * **************************
 * Represents some aspect of a Pokemon that responds to a users touch
 * Visually, the component is a couloured rectangle with the specified text
 */
export default class TouchableAspect extends React.Component {
    constructor(props) {
        super(props);
        this.state.data = {
            pokeData: this.props.getData()
        }
    }

    handleChange() {
        // TODO: Implement
    }


    render() {
        return(
            <View>
                <Text>{this.props.aspectText}</Text>
            </View>
        )
    }
}