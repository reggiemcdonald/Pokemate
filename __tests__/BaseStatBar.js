import React from "react";
import renderer from "react-test-renderer";
import BaseStatBar from "../src/components/BaseStatBar";
import ErrorBoundary from "../src/components/ErrorBoundary";

describe("Base Stat Bar Render", () => {
    it("BaseStatBar should render without error when using default style", () => {
        // Bulbasaur base HP : 45
        const statName = "HP";
        const statValue = 45;
        const tree = renderer.create(
            <BaseStatBar
                statName={statName}
                statValue={statValue}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("BaseStatBar should render ErrorBoundary with invalid value", () => {
        // No value can be greater than 255
        const statName = "HP";
        const statValue = 300;
        const tree = renderer.create(
            <ErrorBoundary>
                <BaseStatBar
                    statName={statName}
                    statValue={statValue}
                />
            </ErrorBoundary>
        );
        expect(tree).toMatchSnapshot()
    });
});