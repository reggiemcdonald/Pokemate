import React from "react";
import {
    Text,
    View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../library/styles";

/**
 * **************************
 * A Error FallBack Component
 * **************************
 * Renders when an error is caught
 *
 */
export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            displayIcon: this.props.displayIcon ? this.props.displayIcon : <Ionicons name={"ios-alert"}/>,
            message: this.props.message ? this.props.message : "Oops! Something happened :("
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error
        }
    }

    /**
     * Log the error that was caught
     * @override
     * @param error
     * @param errorInfo
     */
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return(
                <View style={styles.containerCentered}>
                    {this.state.displayIcon}
                    <Text>{this.state.message}</Text>
                </View>
            )
        } else {
            return this.props.children;
        }
    }


}