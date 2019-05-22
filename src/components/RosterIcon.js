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
                <View style={RosterIconStyles.imageContainer}>
                    <Image style = {RosterIconStyles.image}
                        source={{uri: this.props.uri}}
                    />
                </View>
                <Text style={RosterIconStyles.text}>{this.props.name}</Text>
            </View>
        )
    }
}

const RosterIconStyles = StyleSheet.create(
    {
        iconView: {
            alignContent: "center",
            justifyContent: "center",
        },
        image : {
            width: 75,
            height: 75,
            transform: [
                {
                    scaleX: 1.5
                },
                {
                    scaleY: 1.5
                }
            ]
        },
        text: {
            margin: 0,
            padding: 0,
            textAlign: "center"
        },
        imageContainer: {
            borderColor: "#c6c6c6",
            borderRadius: 75/2,
            borderWidth:1,
            overflow: "hidden"
        }
    }
);