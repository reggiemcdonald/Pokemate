import React from 'react';
import {View,
    Text,
    Image,
    FlatList,
    ScrollView
} from 'react-native';
import styles from "../library/styles";
import TypeContainer from "./TypeContainer";
/**
 * ************************
 * Detailed view of pokemon
 * ************************
 * Takes in a prop of the pokemon data dataManager
 * Each pokemon has either one or two types
 */
export default class PokemonCharacterView extends React.Component{
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: "Pokemon Stats"
    };

    render() {
        const {navigation} = this.props;
        // TODO: make into single method
        const data = navigation.getParam('data', {});
        const name = data.name;
        const type = data.types;
        const sprite = data.sprite;
        const strongAgainst = data.strengths;
        const weakAgainst = data.weaknesses;
        const noEffect = data.noEffect;
        return (
           <ScrollView style={styles.container}>
               <View style={{padding: 10, flexDirection: 'row', flex:1}}>
                   <Text style={styles.detailViewTitleText}>{name.charAt(0).toUpperCase()+name.substr(1)}</Text>
                   <TypeContainer types={type}/>
               </View>

               <View style={styles.spriteContainer}>
                   <Image source={{uri: sprite}}
                          style={styles.sprite}/>
               </View>


               <Text style={styles.headerText}>Strong Against the Following Types</Text>
               <FlatList renderItem={({item}) => this.renderItem(item)}
                         data = {strongAgainst}
                         keyExtractor={(item, index) => item}
               />
               <Text style={styles.headerText}>Weak Against the Following Types</Text>
               <FlatList renderItem={({item}) => this.renderItem(item)}
                         data={weakAgainst}
                         keyExtractor={(item, index) => item}
               />
               <Text style={styles.headerText}>Types With No Effect</Text>
               <FlatList renderItem={({item}) => this.renderItem(item)}
                         data={noEffect}
                         keyExtractor={(item, index) => item}/>
           </ScrollView>
        )
    }

    renderItem(item) {
        return(
            <Text style={styles.detailViewSubText}>{item}</Text>
        )
    }
}
