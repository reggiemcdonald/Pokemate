import React from "react";
import {
    Text,
    View,
    FlatList,
} from "react-native";
import TouchableType from "./TouchableType";
import styles from "../library/styles";
/**
 * A stylized container for showing a collection of types with a message
 */
export default class DefenseStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: props.types,
            styleMain: this._generateStyle(props.styleMain),
            styleSub: this._generateSubStyle(props.styleSub)
        }
    }

    _generateStyle(style) {
        if (style) {
            return style
        } else {
            return styles.defenseDefault
        }
    }

    _generateSubStyle(style) {
        if (style) {
            return style;
        } else {
            return styles.defenseStatTextViewDefault
        }
    }


    _renderItem(item) {
        return(
            <TouchableType
                dataSource={{
                    data: {
                        type: item
                    }
                }}
            />
        );
    }

    render() {
        if (this.state.types.length > 0) {
            return (
                <View style={[styles.defenseStats, this.state.styleMain]}>
                    <View style={[this.state.styleSub, styles.defenseStatTextView]}>
                        <Text style={styles.defenseStatText}>{this.props.label}</Text>
                    </View>
                    <FlatList
                        data={this.state.types}
                        keyExtractor={(value, index) => index}
                        renderItem={({item}) => this._renderItem(item)}
                        numColumns={3}
                    />
                </View>

            )
        } else {
            return(null);
        }
    }
}