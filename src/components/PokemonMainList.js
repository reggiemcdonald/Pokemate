import React from "react";
import { View, SectionList, Text} from 'react-native';

/**
 * ****************************************************
 * A list view of all the pokemon that can be displayed
 * ****************************************************
 */
export default class PokemonMainList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: this.makeListWithSectionHeaders(this.props.list)
        }
    }

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
        return(
            // TODO
            <View>
                <SectionList sections={this.state.list}
                             renderItem={(item) => <Text>{item}</Text>}
                             renderSectionHeader={({section}) => <Text>{section.header}</Text>}
                             keyExtractor={(item, index) => index}
                />
            </View>
        )
    }


}