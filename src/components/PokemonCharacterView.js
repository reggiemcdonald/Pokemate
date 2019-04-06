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
import EvolutionChain from "./EvolutionChain";
import PokeDataManager from "../library/networking/PokeDataManager";
import ErrorBoundary from "./ErrorBoundary";
import PromiseInterrupt from "../library/errors/PromiseInterrupt";
import ErrorMessages from "../library/ErrorMessages";
import BaseStats from "./BaseStats";

/**
 * Container labels
 * @type {string}
 */
const DOUBLE_DAMAGE_LABEL = "Weak Against";
const HALF_DAMAGE_LABEL = "Strong Against";
const IMMUNE_TO = "Immune To";
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
            <View style={[styles.characterViewContainer]}>
                {this._renderTitleBar(name, type)}
               <ScrollView style={{paddingLeft: 10}}>

                   {this._renderSpriteContainer(sprite)}
                   {this._renderDefenseStat(strongAgainst, HALF_DAMAGE_LABEL,
                       styles.defenseGreen, styles.defenseStatTextViewGreen)}
                   {this._renderDefenseStat(weakAgainst, DOUBLE_DAMAGE_LABEL,
                        styles.defenseRed, styles.defenseStatTextViewRed)}
                   {this._renderDefenseStat(noEffect, IMMUNE_TO)}
                   {this._renderBaseStats()}
                   {this._renderEvolutionChain()}
               </ScrollView>
            </View>
        )
    }

    handleSpritePress(clicked) {
        if (clicked.toLowerCase() === this.state.data.name) {
            return;
        }
        const { navigation } = this.props;
        navigation.push("CharacterView", {
            name: clicked
        });
    }

    async componentDidMount(): void {
        const {navigation} = this.props;
        try {
            const name = navigation.getParam('name', {});
            let loadedData = navigation.getParam('data',null);
            let manager = new PokeDataManager(loadedData);
            // TODO: Transfer states of the pokedata managers
            let data = await manager.getPokemonDetails(name);
            await manager.buildBaseStatTree();
            this.setState({
                name: name,
                data: data,
                processor: manager
            });
        } catch (err) {
            if (!this.isPromiseInterrupt(err)) {
                alert(ErrorMessages.PokemonMainViewError);
                navigation.goBack();
            }
        }
    }

    /**
     * Perform a promise cancellation on component unmount
     */
    componentWillUnmount(): void {
        this.state.processor.cancelPromise();
    }

    /**
     * Formats the name so that it starts with a capital
     * @param name
     * @returns {string}
     * @private
     */
    _formatName(name) {
        return name.charAt(0).toUpperCase()+name.substr(1)
    }

    /**
     * Renders the title bar for the main view of this pokemon
     * @param name
     * @param type
     * @returns {*}
     * @private
     */
    _renderTitleBar(name, type) {

        return (
            <View style={[{flexDirection: 'row', flexWrap:"wrap",
                alignItems: "flex-start",}, styles.titleBar]}>
                <Text style={styles.detailViewTitleText}>{this._formatName(name)}</Text>
                <ErrorBoundary>
                    <TypeContainer types={type}/>
                </ErrorBoundary>
            </View>
        )
    }

    /**
     * Renders the defense stats for a given pokemon
     * @param data
     * @param title
     * @param styleMain
     * @param styleSub
     * @returns {*}
     * @private
     */
    _renderDefenseStat(data, title, styleMain?, styleSub?) {
        if (styleMain && styleSub) {
            return (
                <ErrorBoundary>
                    <DefenseStats types={data}
                                  label={title}
                                  styleMain={styleMain}
                                  styleSub={styleSub}
                    />
                </ErrorBoundary>
            )
        } else {
            return (
                <ErrorBoundary>
                    <DefenseStats
                        types={data}
                        label={title}
                    />
                </ErrorBoundary>
            )
        }
    }

    /**
     * Renders the sprite container
     * @param sprite
     * @returns {*}
     * @private
     */
    _renderSpriteContainer(sprite) {
        return (
            <View style={styles.spriteContainer}>
                <Image source={{uri: sprite}}
                       style={styles.sprite}/>
            </View>
        );
    }

    /**
     * Renders the evolution chain
     * @returns {*}
     * @private
     */
    _renderEvolutionChain() {
        return(
            <ErrorBoundary>
                <EvolutionChain data={this.state.data.evolutionChain}
                                dataManager={this.state.processor}
                                handleSpritePress={this.handleSpritePress.bind(this)}
                />
            </ErrorBoundary>
        )
    }

    /**
     * Renders the base stats container
     * @private
     */
    _renderBaseStats() {
        return (
            <BaseStats
                data={this.state.data.baseStats}
                processor={this.state.processor}
            />
        )
    }


    /**
     * Returns true if the error is a promise interrupt
     * @param err
     * @returns {boolean}
     */
    isPromiseInterrupt(err) {
        return (err instanceof PromiseInterrupt);
    }

}
