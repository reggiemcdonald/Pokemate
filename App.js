/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer
} from "react-navigation";
import PokemonMainList from "./src/components/PokemonMainList";
import PokemonCharacterView from "./src/components/PokemonCharacterView";
import Roster from "./src/components/Roster";
import styles from "./src/library/styles";

//

type Props = {};
class HomeScreen extends React.Component {
  static navigationOptions = {
      title: "Pokemate"
  };
  render() {
    return (
        <View style={styles.containerCentered}>
            <Text style={styles.placeholderText}>Welcome to Pokemate!</Text>
        </View>
    );
  }

}

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
    },
    {
      initialRouteName: "Home"
    });
const PokemonListStack = createStackNavigator({
    PokemonList: PokemonMainList,
    CharacterView: PokemonCharacterView
});
const RosterStack = createStackNavigator({
    Roster: Roster
});

export default createAppContainer(createBottomTabNavigator({
    Home: HomeStack,
    "All Pokemon": PokemonListStack,
    Roster: RosterStack
}));
