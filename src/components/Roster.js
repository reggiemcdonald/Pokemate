import React from "react";
import {
    View,
    Text
} from "react-native";
import styles from "../library/styles";
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
            <View>
                <Text>Placeholder text</Text>
                <RosterIcon props = {
                    {
                        uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
                        name: "Pikachu"
                    }
                }
                />
                <RosterIcon
            </View>
        );
    }
}