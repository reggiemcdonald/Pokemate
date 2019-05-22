import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

export default class RosterIcon extends React.Component {
    render() {
        return (
            <View style = {RosterIconStyles.iconView}>
                <Image style = {RosterIconStyles.image}
                    source={{uri: this.props.uri}}
                />
                <Text style={RosterIconStyles.text}>{this.props.name}</Text>
            </View>
        )
    }
}

const RosterIconStyles = StyleSheet.create(
    {
        iconView: {
            alignContent: "center",
        },
        image : {
            width: 100,
            height: 100
        },
        text: {
            margin: 0,
            padding: 0
        }
    }
);