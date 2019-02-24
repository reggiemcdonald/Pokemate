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
import Ionicons from "react-native-vector-icons/Ionicons";

//

type Props = {};
class HomeScreen extends React.Component {
  static navigationOptions = {
      title: "Pokemate",
      headerStyle: {
          backgroundColor: "#F5FCFF"
      }
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

export default createAppContainer(createBottomTabNavigator(
    {
    Home: HomeStack,
    "All Pokemon": PokemonListStack,
    Roster: RosterStack
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === "Home") {
                    iconName = "ios-home";
                } else if (routeName === "All Pokemon") {
                    iconName = "ios-list";
                } else if (routeName === "Roster") {
                    iconName = "ios-star"
                }
                return <Ionicons name ={iconName} size={25} tintColor={tintColor}/>
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray'
        }
    },
));
