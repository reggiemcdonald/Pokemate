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
    ActivityIndicator,
    AsyncStorage,
    Alert,
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
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pokemonData: {}
        }
    }
  static navigationOptions = {
      title: "Pokemate",
      headerStyle: {
          backgroundColor: "#F5FCFF"
      }
  };

  render() {
      if (this.state.loading) {
          return (
              <View style={styles.containerCentered}>
                  <ActivityIndicator size={"large"}/>
                  <Text style={styles.placeholderText}>Please Wait</Text>
              </View>
          )
      }
    return (
        <View style={styles.containerCentered}>
            <Text style={styles.placeholderText}>Welcome to Pokemate!</Text>
        </View>
    );
  }

  runFirstTimeSetup() {
      // TODO: Implement
      Alert.alert(
          "Initial Setup",
          "Downloading the Pokemon data will make the app run faster and allow for offline use." +
          " Would you like to download it now?",
          [
              {text: "Yes", onPress: () => this.downloadData()},
              {
                  text: "Ask me later",
                  style: 'cancel'
              }
          ],
          {cancelable: false}
      );
  }
  downloadData() {
      // TODO: Implement
      console.log("Download data");
  }
  async componentDidMount(): void {
      try {
          let pokemonData = await AsyncStorage.getItem("pokemonData");
          if (pokemonData !== null) {
              this.setState(
                  {
                      loading: false,
                      pokemonData: pokemonData
                  }
              );
          } else {
              this.runFirstTimeSetup();
              this.setState(
                  {loading: false}
              )
          }
      } catch (err) {
          alert(err.message);
      }
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
