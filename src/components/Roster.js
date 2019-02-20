import React from "react";
import {
    View,
    Text
} from "react-native";
import styles from "../library/styles";

export default class Roster extends React.Component {
    render() {
        return(
            <View style={styles.containerCentered}>
                <Text style={styles.placeholderText}>Roster Soon To Come</Text>
            </View>
        )
    }
}