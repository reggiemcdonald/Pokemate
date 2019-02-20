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
    Platform,
    SectionList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import PokemonMainList from "./src/components/PokemonMainList";
import PokeDataProcessor from "./src/library/networking/PokeDataProcessor";
import PokemonCharacterView from "./src/components/PokemonCharacterView";

//

type Props = {};
class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      processor: new PokeDataProcessor(),
    };
  }


  render() {
    console.log("rendering");
    return (
        <View style={styles.container}>
          <Text style={styles.text}>Pokemate</Text>
          <TouchableOpacity onPress={
            () => this.props.navigation.navigate('PokemonList')
          }>
              <Text>Go To PokemonList!</Text>
          </TouchableOpacity>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 25,
    fontWeight: "bold"
  }
});

const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      PokemonList: PokemonMainList
    },
    {
      initialRouteName: "Home"
    });

export default createAppContainer(AppNavigator);
