import React from "react";
import {
    View,
    Text
} from "react-native";
import styles from "../library/styles";
import {navigation} from "react-navigation";

export default class Roster extends React.Component {
    static navigationOptions = {
        title: "Roster"
    };
    render() {
        return(
            <View style={styles.containerCentered}>
                <Text style={styles.placeholderText}>Roster Soon To Come</Text>
            </View>
        )
    }
}