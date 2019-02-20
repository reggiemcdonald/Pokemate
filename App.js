/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, SectionList, StyleSheet, Text, View} from 'react-native';
import PokemonMainList from "./src/components/PokemonMainList";
import PokeDataProcessor from "./src/library/networking/PokeDataProcessor";
import PokemonCharacterView from "./src/components/PokemonCharacterView";
//
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
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
          {/*<PokemonMainList processor = {this.state.processor}/>*/}
          <PokemonCharacterView/>
        </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
