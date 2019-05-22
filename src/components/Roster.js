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
            <View>
                <View style = {RosterStyleSheet.iconRibbon}>
                    <RosterIcon
                        name = {"Pikachu"}
                        uri = {"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"}
                    />
                    <RosterIcon
                        name = {"Bulbasaur"}
                        uri = {"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}
                    />
                    <RosterIcon
                        name = {"Charmander"}
                        uri = {"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"}
                    />

                </View>
                <View style={RosterStyleSheet.iconRibbon}>
                    <RosterIcon
                        name={"Squirtle"}
                        uri={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"}
                    />
                    <RosterIcon
                        name={"Pidgeot"}
                        uri={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png"}
                    />
                    <RosterIcon
                        name={"Snorlax"}
                        uri={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png"}
                    />
                </View>
            </View>
        );
    }
}

const RosterStyleSheet = StyleSheet.create({
    iconRibbon: {
        paddingTop: 5,
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
});