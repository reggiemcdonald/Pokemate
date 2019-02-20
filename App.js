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
      data: []
    };
  }


  render() {
    console.log("rendering");
    return (
        <View style={styles.container}>
          <PokemonMainList processor = {this.state.processor}/>
        </View>

    );
  }

  async componentDidMount(): void {
    let pokemon = await this.state.processor.getListOfPokemon();
    pokemon = this.makeListWithSectionHeaders(pokemon);
    this.setState({
      data: pokemon
    });
  }

  makeListWithSectionHeaders(list) {
    console.log("Making");
    let objectWithHeaders = {};
    for (let item of list) {
      let header = item.substr(0,1).toUpperCase();
      if (objectWithHeaders.hasOwnProperty(header)) {
        let arr = objectWithHeaders[header];
        arr.push(item);
        objectWithHeaders[header] = arr;
      } else {
        objectWithHeaders[header] = [item];
      }
    }
    let listWithHeaders = [];
    let headers = Object.keys(objectWithHeaders);
    for (header of headers) {
      let obj = {
        header: header,
        data: objectWithHeaders[header]
      };
      listWithHeaders.push(obj);
    }
    return this.sortListOnHeaders(listWithHeaders);
  }

  sortListOnHeaders(list) {
    return list.sort((a,  b) => {
      if (a.header > b.header) {
        return 1;
      } else if (a.header < b.header) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
