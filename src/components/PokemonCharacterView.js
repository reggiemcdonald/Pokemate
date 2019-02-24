import React from 'react';
import {View,
    Text,
    Image,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import styles from "../library/styles";
import TypeContainer from "./TypeContainer";
import DefenseStats from "./DefenseStats";
import PokeDataProcessor from "../library/networking/PokeDataProcessor";
import EvolutionChain from "./EvolutionChain";
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
        this.state = {
            processor: new PokeDataProcessor()
        }
    }

    static navigationOptions = {
        title: "Pokemon Stats",
        headerStyle: {
            backgroundColor: "#F5FCFF"
        }
    };

    render() {
        if (this.state.name === undefined) {
            return(<View style={styles.containerCentered}><ActivityIndicator size={"large"}/></View>);
        }
        const name = this.state.data.name;
        const type = this.state.data.types;
        const sprite = this.state.data.sprite;
        const strongAgainst = this.state.data.strengths;
        const weakAgainst = this.state.data.weaknesses;
        const noEffect = this.state.data.noEffect;
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
                   <EvolutionChain data={this.state.data.evolutionChain} dataManager={this.state.processor}/>
               </ScrollView>
            </View>
        )
    }

    async componentDidMount(): void {
        const {navigation} = this.props;
        try {
            const name = navigation.getParam('name', {});
            // TODO: Transfer states of the pokedata managers
            let data = await this.state.processor.formDefaultSpeciesData(name);
            this.setState({
                name: name,
                data: data
            });
        } catch (err) {
            // TODO: Get rid of loose strings
            alert("There was an error. Please check that your wifi is enabled.");
            navigation.goBack();
        }
    }

    renderItem(item) {
        return(
            <Text style={styles.detailViewSubText}>{item}</Text>
        )
    }
}
