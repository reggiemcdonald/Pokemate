import React from "react";
import { View, SectionList, Text, StyleSheet} from 'react-native';

/**
 * ****************************************************
 * A list view of all the pokemon that can be displayed
 * ****************************************************
 */
export default class PokemonMainList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

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
        return this.sortListOnHeaders(listWithHeaders);
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
        console.log("rendering");
        return(
            // TODO
            <View style={styles.container}>
                <SectionList sections={this.state.data}
                             renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                             renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.header}</Text>}
                             keyExtractor={(item, index) => index}
                />
            </View>
        )
    }

    async componentDidMount() {
        let pokemonList = await this.props.processor.getListOfPokemon();
        pokemonList = this.makeListWithSectionHeaders(pokemonList);
        this.setState({
            data: pokemonList
        });
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: "#F5FCFF"
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});