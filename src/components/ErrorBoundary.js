import React from "react";
import {
    Text
} from "react-native";

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
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    /**
     * Log the error that was caught
     * @override
     * @param error
     * @param errorInfo
     */
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // TODO: Create error reporting
    }

    render() {
        if (this.state.hasError) {
            return(
                <Text>Oops. Something went wrong.</Text>
            )
        } else {
            return this.props.children;
        }
    }


}