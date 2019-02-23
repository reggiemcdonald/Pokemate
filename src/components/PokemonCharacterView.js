import React from 'react';
import {View,
    Text,
    Image,
    FlatList,
    ScrollView
} from 'react-native';
import styles from "../library/styles";
import TypeContainer from "./TypeContainer";
import DefenseStats from "./DefenseStats";
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
            <View style={styles.containerLeftAligned}>
                <View style={{flexDirection: 'row', flexWrap:"wrap",
                    alignItems: "flex-start", backgroundColor: "transparent"}}>
                    <Text style={styles.detailViewTitleText}>{name.charAt(0).toUpperCase()+name.substr(1)}</Text>
                    <TypeContainer types={type}/>
                </View>
               <ScrollView>

                   <View style={styles.spriteContainer}>
                       <Image source={{uri: sprite}}
                              style={styles.sprite}/>
                   </View>

                   <DefenseStats types={strongAgainst}
                                 label={"Half Damage From"}
                                 styleMain={styles.defenseGreen}
                                 styleSub={styles.defenseStatTextViewGreen}
                   />
                   <DefenseStats types={weakAgainst}
                                 label={"Double Damage From"}
                                 styleMain={styles.defenseRed}
                                 styleSub={styles.defenseStatTextViewRed}
                   />
                   <DefenseStats types={noEffect}
                                 label={"No Damage From"}

                   />
               </ScrollView>
            </View>
        )
    }

    renderItem(item) {
        return(
            <Text style={styles.detailViewSubText}>{item}</Text>
        )
    }
}
