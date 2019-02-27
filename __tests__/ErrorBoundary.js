import React from "react";
import renderer from "react-test-renderer";
import ErrorBoundary from "../src/components/ErrorBoundary";
import {View} from "react-native";

describe("Error Boundary: Should Render", () => {
    it("Should render without crashing", () => {
        const tree = renderer.create(
            <ErrorBoundary>
                <View></View>
            </ErrorBoundary>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});