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
        const {navigation} = this.props;
        // TODO: make into single method
        const data = navigation.getParam('data', {});
        const name = data.name;
        const type = data.types;
        const sprite = data.sprite;
        return (
           <View style={styles.container}>
               <Text style={styles.titleText}>{name}</Text>
               <View style={styles.spriteContainer}>
                   <Image source={{uri: sprite}}
                          style={styles.sprite}/>
               </View>
               <Text style={styles.headerText}>Type</Text>
               <Text style={styles.subText}>{type}</Text>
               <Text style={styles.headerText}>Strong Against the Following Types</Text>
               <Text style={styles.subText}>List String Against Here</Text>
               <Text style={styles.headerText}>Weak Against the Following Types</Text>
               <Text style={styles.subText}>List Weak Against Here</Text>
               <Text style={styles.headerText}>Types With No Effect</Text>
               <Text style={styles.subText}>List No Effect Types Here</Text>
               {/*<FlatList data={[*/}
                   {/*{key: "Fighting"}*/}
                   {/*]}*/}
                         {/*renderItem={({item}) => <Text style={styles.subText}>{item.key}</Text>}*/}
               {/*/>*/}
               {/*<Text style={styles.headerText}>Types that have no effect on Ditto</Text>*/}
               {/*<FlatList data={[{key: "Ghost"}]}*/}
                         {/*renderItem={({item}) => <Text style={styles.subText}>{item.key}</Text>}*/}
               {/*/>*/}
           </View>
        )
    }
}

const styles = StyleSheet.create({
    containerCentered: {
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