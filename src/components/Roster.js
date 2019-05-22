import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import {navigation} from "react-navigation";
import RosterIcon from "./RosterIcon";

/**
 * The Roster screen
 * Currently filled with placeholder pokemon
 */

export default class Roster extends React.Component {
    static navigationOptions = {
        title: "Roster"
    };
    render() {
        return (
            <View style = {RosterStyleSheet.iconRibbon}>
                <RosterIcon
                    name = {"Pikachu"}
                    uri = {"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"}
                />
                <RosterIcon
                    name = {"Bulbasaur"}
                    uri = {"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}
                />

            </View>
        );
    }
}

const RosterStyleSheet = StyleSheet.create({
    iconRibbon: {
        flexDirection: "row"
    }
})