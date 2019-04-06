import React from "react";
import {
    View,
    SectionList,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import PokeDataManager from "../library/networking/PokeDataManager";
import styles from "../library/styles";
import ErrorMessages from "../library/ErrorMessages";
import PromiseInterrupt from "../library/errors/PromiseInterrupt";
import ErrorBoundary from "./ErrorBoundary";
import {STORAGE_KEY} from "../library/StringResources";
/**
 * ****************************************************
 * A list view of all the pokemon that can be displayed
 * ****************************************************
 */
export default class PokemonMainList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    static navigationOptions = {
        title: "All Pokemon",
        headerStyle: {
            backgroundColor: "#F5FCFF"
        }
    };

    makeListWithSectionHeaders(list) {
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
        return this.sortSubLists(this.sortListOnHeaders(listWithHeaders));
    }

    sortSubLists(sublists) {
        for (let sublist of sublists) {
            sublist.data.sort((first, second) => {
                if (first > second) {
                    return 1;
                } else if (first < second) {
                    return -1;
                } else {
                    return 0;
                }
            });
        }
        return sublists;
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

    render() {
        if (this.state.data.length === 0) {
            return (
                <View style={styles.containerCentered}>
                    <ActivityIndicator size={"large"}/>
                    <Text style={styles.placeholderText}>One Moment...</Text>
                </View>
            )
        }
        return(
            // TODO
            <ErrorBoundary>
                <View style={styles.containerLeftAligned}>
                    <SectionList sections={this.state.data}
                                 renderItem={({item}) => this.renderItem(item)}
                                 renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.header}</Text>}
                                 keyExtractor={(item, index) => index}
                                 initialNumToRender={1000}
                                 maxToRenderPerBatch={1000}
                    />
                </View>
            </ErrorBoundary>
        )
    }

    /**
     * Load a data file and
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        try {
            let manager = new PokeDataManager();
            await manager.readFromDisk();
            let pokemonList = await manager.getListOfPokemon();
            pokemonList = this.makeListWithSectionHeaders(pokemonList);
            this.setState({
                data: pokemonList,
                dataManager: manager
            });
        } catch (err) {
            if (!this.isPromiseInterrupt(err)) {
                alert(ErrorMessages.PokemonMainListFillError);
            }
        }
    }

    componentWillUnmount(): void {
        this.state.dataManager.cancelPromise();
    }

    /**
     * Move to the detailed view of the pokemon
     * @param cliked
     */
     handlePress(clicked) {
        const {navigation} = this.props;
        navigation.navigate("CharacterView", {
            name: clicked,
            data: this.state.dataManager.createHandoff()
        });
    }

    renderItem(item) {
        return (
            <TouchableOpacity onPress={() => this.handlePress(item)}>
                <Text style={styles.sectionListItem}>
                    {item.charAt(0).toUpperCase() + item.substr(1)}
                </Text>
            </TouchableOpacity>
        )
    }

    /**
     * Returns true if err is an instance of promise interrupt
     * @param err
     * @returns {boolean}
     */
    isPromiseInterrupt(err) {
         return (err instanceof PromiseInterrupt);
    }
}

