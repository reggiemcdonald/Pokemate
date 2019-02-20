import React from 'react';
import {View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    ScrollView
} from 'react-native';
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

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title',"Pokemon View")
        }
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
               <Text style={styles.detailViewTitleText}>{name}</Text>
               <View style={styles.spriteContainer}>
                   <Image source={{uri: sprite}}
                          style={styles.sprite}/>
               </View>
               <Text style={styles.headerText}>Type</Text>
               <FlatList renderItem={({item}) => this.renderItem(item)}
                         data={type}
                         keyExtractor={(item, index) => item}
                         />
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

const styles = StyleSheet.create({
    detailViewTitleText: {
        fontSize: 30,
        fontWeight: "bold",
        paddingLeft: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 10
    },
    detailViewSubText: {
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