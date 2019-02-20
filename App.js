/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
    SectionList,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer
} from "react-navigation";
import PokemonMainList from "./src/components/PokemonMainList";
import PokeDataProcessor from "./src/library/networking/PokeDataProcessor";
import PokemonCharacterView from "./src/components/PokemonCharacterView";

//

type Props = {};
class HomeScreen extends React.Component {
  static navigationOptions = {
      title: "Pokemate"
  }
  render() {
    console.log("rendering");
    return (
        <View style={styles.containerCentered}>
            <Text style={styles.text}>Welcome to Pokemate! More to come!</Text>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  containerCentered: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 30,
    fontWeight: "bold"
  },
    button:{
      backgroundColor: "#841584"
    }
});

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        PokemonList: PokemonMainList
    },
    {
      initialRouteName: "Home"
    });
const PokemonListStack = createStackNavigator({
    PokemonList: PokemonMainList,
    CharacterView: PokemonCharacterView
});

export default createAppContainer(createBottomTabNavigator({
    Home: HomeStack,
    AllPokemon: PokemonListStack
}));
