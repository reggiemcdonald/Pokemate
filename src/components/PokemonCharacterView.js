import React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
/**
 * ************************
 * Detailed view of pokemon
 * ************************
 * Takes in a prop of the pokemon data processor
 */
export default class PokemonCharacterView extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
           <View style={styles.container}>
               <Text style={[styles.genericText, styles.titleText]}>Ditto</Text>
               <View style={styles.spriteContainer}>
                   <Image source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"}}
                          style={styles.sprite}/>
               </View>
               <Text style={styles.headerText}>Type</Text>
               <Text style={[styles.genericText, styles.subText]}>Ditto is a normal type!</Text>
               <Text style={styles.headerText}>Types Ditto is Strong Against</Text>
               <Text style={styles.subText}>Such empty...</Text>
               <Text style={styles.headerText}>Types Ditto is Weak Against</Text>
               <FlatList data={[
                   {key: "Fighting"}
                   ]}
                         renderItem={({item}) => <Text style={styles.subText}>{item.key}</Text>}
               />
               <Text style={styles.headerText}>Types that have no effect on Ditto</Text>
               <FlatList data={[{key: "Ghost"}]}
                         renderItem={({item}) => <Text style={styles.subText}>{item.key}</Text>}
               />
           </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5FCFF",
        paddingTop: 50,
        flex: 1,
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        paddingLeft: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 10
    },
    subText: {
        fontSize: 18,
        paddingLeft: 10
    },
    spriteContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    sprite: {
        width: 300,
        height: 300,
    },
});