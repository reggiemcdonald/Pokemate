import React from "react";
import {
    View,
    SectionList,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import PokeDataProcessor from "../library/networking/PokeDataProcessor";
import styles from "../library/styles";
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
            processor: new PokeDataProcessor()
        }
    }

    static navigationOptions = {
        title: "All Pokemon"
    };

    makeListWithSectionHeaders(list) {
        console.log("Making");
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
        return(
            // TODO
            <View style={styles.containerLeftAligned}>
                <SectionList sections={this.state.data}
                             renderItem={({item}) => this.renderItem(item)}
                             renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.header}</Text>}
                             keyExtractor={(item, index) => index}
                             ListEmptyComponent = {
                                 () => <ActivityIndicator size={"large"}/>
                             }
                             initialNumToRender={1000}
                             maxToRenderPerBatch={1000}
                />
            </View>
        )
    }


    async componentDidMount() {
        let pokemonList = await this.state.processor.getListOfPokemon();
        pokemonList = this.makeListWithSectionHeaders(pokemonList);
        this.setState({
            data: pokemonList
        });
    }

    /**
     * Move to the detailed view of the pokemon
     * @param cliked
     */
    async handlePress(clicked) {
        try {
            const data = await this.state.processor.processComponentDataByName(clicked);
            const {navigation} = this.props;
            navigation.navigate('CharacterView', {
                data: data,
                title: data.name
            });
        } catch (err) {
            alert("There was an error. Check that your wifi is enabled");
        }
    }

    renderItem(item) {
        return (
            <TouchableOpacity onPress={() => this.handlePress(item)}>
                <Text style={styles.sectionListItem}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }
}

