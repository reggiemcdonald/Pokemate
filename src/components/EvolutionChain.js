import React from "react";
import {
    View,

} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

/**
 * *************************
 * Touchable Evolution Chain
 * *************************
 * A React Component that can be used to display the evolution for a pokemon
 * as specified in the props, using ONLY the default pokemon from the species lineage
 * Components in this component should be touchable. Details on each pokemon should be
 * accessible from the component.
 */
export default class EvolutionChain extends React.Component {
    // TODO: implement
    constructor(props) {
        super(props);
        this.state = {
            data: props.evolutionData,
            processor: props.processor
        }
    }

    render() {
        return(
           <View>
               // TODO
           </View>
        )
    }

    _getEvolutionChain(data) {
       // TODO
    }
}